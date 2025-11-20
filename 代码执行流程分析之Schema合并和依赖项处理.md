# Schema 合并和依赖项处理逻辑详解

## 问题场景

当一个 Schema 同时包含：

1. **自身的 `dependencies`** 依赖项
2. **`anyOf` 项**，且 anyOf 内部也包含 `dependencies` 依赖项

处理顺序和合并逻辑是什么？

---

## 核心处理流程

### 阶段 1: expandSchema 处理顺序

在 `schemaloader.js` 的 `expandSchema()` 方法中（第 121-137 行），处理顺序如下：

```javascript
expandSchema(schema, fileBase) {
    // 第一步：处理 _subSchema1（包括 anyOf 和 dependencies）
    Object.entries(this._subSchema1).forEach(([key, func]) => {
        if (schema[key]) {
            func.call(this, schema);
        }
    });

    // 第二步：处理 _subSchema2（allOf, extends, oneOf）
    let extended = extend({}, schema);
    Object.entries(this._subSchema2).forEach(([key, func]) => {
        if (schema[key]) {
            extended = func.call(this, schema, extended);
        }
    });

    // 第三步：展开引用
    return this.expandRefs(extended);
}
```

### 关键点：anyOf 和 dependencies 的处理

#### 1. anyOf 的处理（第 25-29 行）

```javascript
anyOf(schema) {
    Object.entries(schema.anyOf).forEach(([key, value]) => {
        schema.anyOf[key] = this.expandSchema(value);  // 递归展开每个 anyOf 项
    });
}
```

**处理逻辑：**

- 对每个 `anyOf` 项**递归调用 `expandSchema`**
- 这意味着 anyOf 项内部的 `dependencies` 会**先被展开**
- **anyOf 本身不会合并到父 Schema**，它保持独立结构

#### 2. dependencies 的处理（第 32-40 行）

```javascript
dependencies(schema) {
    Object.entries(schema.dependencies).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
            schema.dependencies[key] = this.expandSchema(value);  // 展开 schema dependency
        }
        // 如果是数组（property dependency），保持不变
    });
}
```

**处理逻辑：**

- 如果 `dependencies` 的值是**对象**（schema dependency），则展开
- 如果是**数组**（property dependency），保持不变
- 父 Schema 的 `dependencies` 和 anyOf 项的 `dependencies` **分别独立处理**

---

## 实际处理顺序

### 示例 Schema

```javascript
{
    type: 'object',
    properties: {
        field1: { type: 'string' },
        field2: {
            type: 'string',
            // 父 Schema 的 dependencies
            dependencies: {
                field1: {
                    type: 'object',
                    properties: {
                        extra: { type: 'string' }
                    }
                }
            },
            // anyOf 项
            anyOf: [
                {
                    type: 'string',
                    // anyOf[0] 的 dependencies
                    options: {
                        dependencies: {
                            field1: 'value1'
                        }
                    }
                },
                {
                    type: 'string',
                    minLength: 1,
                    // anyOf[1] 的 dependencies
                    options: {
                        dependencies: {
                            field1: 'value2'
                        }
                    }
                }
            ]
        }
    }
}
```

### 处理步骤

#### 步骤 1: 处理 anyOf（\_subSchema1）

```javascript
// 1.1 展开 anyOf[0]
anyOf[0] = expandSchema({
    type: 'string',
    options: {
        dependencies: {field1: 'value1'}
    }
});
// 结果：anyOf[0] 内部的 dependencies 被展开（如果有 schema dependency）

// 1.2 展开 anyOf[1]
anyOf[1] = expandSchema({
    type: 'string',
    minLength: 1,
    options: {
        dependencies: {field1: 'value2'}
    }
});
// 结果：anyOf[1] 内部的 dependencies 被展开
```

**此时状态：**

- anyOf 项内部的 `dependencies` 已经展开
- anyOf 结构保持独立，**不会合并到父 Schema**

#### 步骤 2: 处理父 Schema 的 dependencies（\_subSchema1）

```javascript
// 展开父 Schema 的 dependencies
dependencies: {
    field1: expandSchema({
        type: 'object',
        properties: {
            extra: {type: 'string'}
        }
    });
}
// 结果：父 Schema 的 dependencies 被展开
```

**此时状态：**

- 父 Schema 的 `dependencies` 已展开
- anyOf 项的 `dependencies` 已展开
- **两者保持独立，互不影响**

#### 步骤 3: 处理 \_subSchema2（如果有 allOf/extends/oneOf）

如果 Schema 中有 `allOf`、`extends` 或 `oneOf`，会进行合并操作。

**注意：** `anyOf` **不在 \_subSchema2 中**，所以 anyOf 不会被合并到父 Schema。

#### 步骤 4: 展开引用（expandRefs）

最后展开所有的 `$ref` 引用。

---

## dependencies 的合并规则

### 在 extendSchemas 中的处理（第 374-440 行）

如果两个 Schema 都有 `dependencies`，在合并时会：

```javascript
extendSchemas(obj1, obj2) {
    // ...
    const merge = (prop, val) => {
        // ...
        if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
            /* Objects should be recursively merged */
            extended[prop] = this.extendSchemas(val, obj2[prop]);
        }
        // ...
    };
}
```

**合并规则：**

- `dependencies` 是对象，会**递归合并**
- 如果两个 Schema 都有相同的 dependency key，会合并其值
- 如果值也是对象（schema dependency），会递归合并

### 重要区别

1. **anyOf 不会合并到父 Schema**
    - anyOf 保持独立结构
    - anyOf 项的 `dependencies` 只在 anyOf 项内部生效

2. **父 Schema 的 dependencies 独立存在**
    - 父 Schema 的 `dependencies` 在父 Schema 层面生效
    - 不会影响 anyOf 项的选择

3. **运行时依赖评估**
    - 在编辑器构建时，每个编辑器会注册自己的 `dependencies`
    - anyOf 项的 `dependencies` 用于控制 anyOf 项的显示/隐藏
    - 父 Schema 的 `dependencies` 用于控制父字段的显示/隐藏

---

## 运行时行为

### 编辑器构建时的处理（editor.js）

1. **父 Schema 编辑器构建**
    - 注册父 Schema 的 `dependencies`（如果有）
    - 创建 anyOf 编辑器（MultipleEditor）

2. **anyOf 编辑器构建**（multiple.js）
    - 为每个 anyOf 项创建子编辑器
    - 每个子编辑器注册自己的 `dependencies`
    - 当依赖项满足时，切换显示对应的 anyOf 项

3. **依赖评估**（editor.js evaluateDependencies）
    - 父 Schema 的 `dependencies` 控制父字段的显示
    - anyOf 项的 `dependencies` 控制 anyOf 项的切换
    - 两者**独立评估，互不干扰**

### 特殊优化（validator.js 第 61-87 行）

```javascript
anyOf(schema, value, path) {
    // 当 anyOf 是联动关系时，仅校验当前激活项，而非所有
    let current = this.jsoneditor.getEditor(path);
    let realSchema = this.jsoneditor.expandSchema(schema);
    let currentSchema = current && schema.anyOf[current.type];
    let hasDependency = realSchema.anyOf.some(item => {
        return item.options && item.options.dependencies;
    });
    if (hasDependency && current) {
        // 如果 anyOf 项有 dependencies，只验证当前激活项
        let result = this._validateSchema(currentSchema, value, path);
        return result;
    }
    // 否则验证所有 anyOf 项
}
```

**优化逻辑：**

- 如果 anyOf 项有 `dependencies`，只验证**当前激活的项**
- 避免验证所有 anyOf 项导致的性能问题

---

## 总结

### 处理顺序

1. **先处理 anyOf 项**（包括其内部的 dependencies）
2. **再处理父 Schema 的 dependencies**
3. **两者保持独立，不会合并**

### 关键结论

✅ **anyOf 的 dependencies 先处理**

- anyOf 项在 `_subSchema1` 阶段被递归展开
- anyOf 项内部的 `dependencies` 在展开时被处理

✅ **父 Schema 的 dependencies 后处理**

- 父 Schema 的 `dependencies` 也在 `_subSchema1` 阶段处理
- 但由于 anyOf 是数组项，两者互不影响

✅ **不会统一合并**

- anyOf **不会合并到父 Schema**
- 父 Schema 的 `dependencies` 和 anyOf 项的 `dependencies` **保持独立**
- 只有在 `extendSchemas` 合并两个 Schema 时，才会合并 `dependencies`

### 实际应用

这种设计允许：

- 父字段根据依赖项显示/隐藏
- anyOf 项根据依赖项动态切换
- 两者可以**同时工作，互不干扰**

例如：

- 父字段的 `dependencies` 控制整个字段是否显示
- anyOf 项的 `dependencies` 控制显示哪个 anyOf 选项
- 两者可以组合使用，实现复杂的联动逻辑
