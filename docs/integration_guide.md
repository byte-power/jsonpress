# JSON Press 集成指南

该指南面向把 JSON Press 集成到 Web 产品、后台配置平台或内部工具中的开发者。

## 1. 安装与引入

推荐通过 npm 安装：

```bash
npm install @byte-power/json-press
```

ES Module：

```javascript
import {JSONEditor} from '@byte-power/json-press';
```

CommonJS：

```javascript
const {JSONEditor} = require('@byte-power/json-press');
```

基础实例化：

```javascript
const element = document.getElementById('editor');

const editor = new JSONEditor(element, {
    schema,
    startval: initialValue,
    theme: 'html',
    show_errors: 'interaction'
});

editor.on('ready', () => {
    console.log(editor.getValue());
});
```

> `getValue()`、`setValue()`、`validate()` 需要在 `ready` 之后调用。

## 2. 配置方式

JSON Press 的配置分为两层：

- 全局/实例配置：通过 `new JSONEditor(element, options)` 传入，推荐用于项目级默认行为。
- 局部配置：通过 schema 节点的 `options` 字段传入，推荐用于单个字段、对象、数组的展示和交互控制。

也可以修改默认值：

```javascript
JSONEditor.defaults.options.disable_edit_json = true;
```

但项目中更推荐集中使用实例配置，避免整体覆盖 `JSONEditor.defaults.options` 时丢失内置默认值。

## 3. 常用实例配置

| 选项                              | 描述                                                       | 默认值          | 作用范围  |
| --------------------------------- | ---------------------------------------------------------- | --------------- | --------- |
| `schema`                          | 表单结构定义，支持 JSON Schema v3/v4 常用能力              | `{}`            | 实例      |
| `startval`                        | 初始值                                                     | `null`          | 实例      |
| `theme`                           | 主题，当前内置 `html`、`bootstrap3`、`tailwind`            | `'html'`        | 实例      |
| `iconlib`                         | 图标库，当前内置 `bootstrap3`、`fontawesome5`              | `null`          | 实例      |
| `template`                        | 模板引擎，当前内置 `default`、`lodash`、`nunjucks`、`swig` | `'default'`     | 实例      |
| `form_name_root`                  | 根表单名称                                                 | `'root'`        | 实例      |
| `ajax`                            | 是否允许通过 ajax 加载 `$ref` 外部 schema                  | `false`         | 实例      |
| `refs`                            | 预加载的外部 schema 映射                                   | `{}`            | 实例      |
| `ajaxCredentials`                 | 外部 schema ajax 请求是否带凭证                            | -               | 实例      |
| `urn_resolver`                    | 自定义 URN 解析函数                                        | -               | 实例      |
| `max_depth`                       | 最大渲染深度，`0` 表示不限制                               | `0`             | 实例      |
| `use_default_values`              | 是否按类型生成默认初始值                                   | `true`          | 实例/局部 |
| `show_errors`                     | 错误展示时机：`interaction`、`change`、`always`、`never`   | `'interaction'` | 实例/局部 |
| `required_by_default`             | 字段是否默认 required                                      | `false`         | 实例/局部 |
| `no_additional_properties`        | 是否禁止额外属性                                           | `false`         | 实例/局部 |
| `display_required_only`           | object 是否只显示 required 字段                            | `false`         | 实例/局部 |
| `show_opt_in`                     | 非 required 字段是否使用 opt-in 勾选后才进入值             | `false`         | 实例/局部 |
| `keep_oneof_values`               | 切换 `oneOf` / `anyOf` 时是否保留当前值                    | `true`          | 实例/局部 |
| `enum_source_value_auto_select`   | `enumSource` 刷新后是否尽量保留原选中值                    | `true`          | 实例/局部 |
| `prompt_before_delete`            | 删除数组项前是否确认                                       | `true`          | 实例/局部 |
| `remove_button_labels`            | 使用 iconlib 时是否隐藏按钮文字                            | `false`         | 实例      |
| `control_size`                    | Press 扩展：统一输入控件尺寸，支持 `small`、`middle`       | -               | 实例      |
| `inline`                          | Press 扩展：输入控件和 label 行内展示                      | `false`         | 实例      |
| `disable_theme_rules`             | 是否禁用内置主题样式注入                                   | `false`         | 实例      |
| `custom_validators`               | 实例级自定义校验器                                         | -               | 实例      |
| `translate` / `translateProperty` | 自定义翻译函数                                             | -               | 实例      |
| `show_save_btn`                   | Edit JSON 对话框是否显示保存按钮                           | -               | 实例      |
| `transform_json`                  | Press 扩展：Edit JSON 保存前转换 JSON 数据                 | -               | 实例      |

## 4. 常用局部 options

局部配置写在对应 schema 节点的 `options` 内：

```javascript
const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            title: '名称',
            options: {
                infoText: '展示在标题旁的提示说明',
                input_width: '240px'
            }
        }
    }
};
```

| 选项                                          | 适用类型                                                  | 描述                                                          |
| --------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| `compact`                                     | 多数编辑器                                                | 隐藏当前字段 label 或使用紧凑展示                             |
| `collapsed`                                   | object、array、table                                      | 默认折叠                                                      |
| `hidden`                                      | 多数编辑器                                                | 界面隐藏，但不影响已有值读取                                  |
| `infoText`                                    | string、number、object、array、select、checkbox、radio 等 | Press 扩展：字段说明按钮，支持文本、换行和 url                |
| `exclude`                                     | object 子字段                                             | Press 扩展：从最终 `getValue()` 结果中排除该字段              |
| `remove_empty_properties`                     | object                                                    | 从 object 的输出值中移除空属性                                |
| `grid_columns` / `grid_offset` / `grid_break` | object 子字段                                             | grid 布局控制                                                 |
| `input_width`                                 | string、number、integer、select、object 子字段            | 输入宽度                                                      |
| `input_height`                                | textarea                                                  | 输入高度                                                      |
| `expand_height`                               | textarea                                                  | 随内容自动扩展高度                                            |
| `disable_array_add`                           | array、table                                              | 禁止新增项                                                    |
| `disable_array_delete`                        | array、table                                              | 禁止删除单项                                                  |
| `disable_array_delete_all_rows`               | array                                                     | 禁止删除全部                                                  |
| `disable_array_delete_last_row`               | array                                                     | 禁止删除最后一项                                              |
| `disable_array_reorder`                       | array                                                     | 禁止排序                                                      |
| `enable_array_copy`                           | array                                                     | 显示复制按钮                                                  |
| `array_controls_top`                          | array、table                                              | 控制按钮显示在顶部                                            |
| `reversed`                                    | array                                                     | Press 扩展：倒序渲染数组项；当前代码读取的是 `reversed`       |
| `tabCollapsed`                                | array `format: "tabs"`                                    | Press 扩展：启用 tab 导航列表折叠                             |
| `tabWide`                                     | array `format: "tabs"`                                    | Press 扩展：tab 导航使用宽屏模式                              |
| `showHeader`                                  | anyOf/oneOf 子 schema                                     | Press 扩展：强制显示子元素标题区，常用于展示 `infoText`       |
| `auto_refresh`                                | select / enumSource                                       | Press 扩展：依赖项变化后动态刷新候选项并参与校验              |
| `clear_value`                                 | select / enumSource                                       | Press 扩展：候选项变化且当前值无效时自动清空                  |
| `relativeToParent`                            | array select2                                             | Press 扩展：select2 下拉层挂到相对父级，避免弹层遮挡          |
| `warning`                                     | description                                               | Press 扩展：说明文字使用警示样式                              |
| `className`                                   | table                                                     | Press 扩展：为 table 添加自定义样式类                         |
| `nocache`                                     | array                                                     | Press 扩展：禁用 array 行缓存，避免删除再新增时复用旧实例状态 |
| `hideOneOfValidate`                           | oneOf                                                     | Press 扩展：隐藏 oneOf 总体校验提示，优先展示具体子项错误     |
| `ignore: "readOnly"`                          | object 子字段                                             | Press 扩展：父级只读/禁用时，该字段忽略 readOnly 禁用         |

## 5. Press 重点增强能力

### 5.1 infoText 字段说明

`options.infoText` 会在字段标题附近展示提示按钮。当前代码中 string、number、integer、select、multiselect、radio、checkbox、toggle、object、array、table、upload、button、rating 等编辑器均有支持或主题适配。

普通文本：

```javascript
{
    type: 'string',
    title: '用户名',
    options: {
        infoText: '支持中英文、数字和下划线\n长度 3-20'
    }
}
```

打开链接：

```javascript
{
    type: 'string',
    title: '配置说明',
    options: {
        infoText: {
            text: '查看规则',
            url: 'https://example.com/help'
        }
    }
}
```

### 5.2 字段依赖 dependencies

`options.dependencies` 用于根据同级字段值控制当前字段显示，并且多个依赖按 `and` 逻辑判断。

```javascript
{
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: ['text', 'image']
        },
        imageUrl: {
            type: 'string',
            title: '图片地址',
            options: {
                dependencies: {
                    type: 'image'
                }
            }
        }
    }
}
```

Press 扩展支持：

```javascript
// 数组字段包含指定值时显示
dependencies: {
    tags: {
        has: 'vip';
    }
}

// 字段不是指定值时显示；not 也支持数组
dependencies: {
    status: {
        not: ['disabled', 'archived'];
    }
}
```

隐藏字段不会校验其 required 规则，适合做条件表单。

### 5.3 enumSource 动态枚举

`watch` + `enumSource` 可让下拉候选项依赖其他字段。

```javascript
{
    type: 'object',
    properties: {
        source: {
            type: 'array',
            format: 'table',
            items: {
                type: 'object',
                properties: {
                    label: {type: 'string'},
                    value: {type: 'string'}
                }
            }
        },
        target: {
            type: 'string',
            watch: {
                list: 'source'
            },
            enumSource: [
                {
                    source: 'list',
                    title: item => item.item.label,
                    value: item => item.item.value,
                    sort: 'asc'
                }
            ],
            options: {
                auto_refresh: true,
                clear_value: true
            }
        }
    }
}
```

Press 扩展点：

- `sourceFormat(sourceValue)`：先加工 watch 来源数据，再生成候选项。
- `title`、`value`、`filter` 支持模板字符串，也支持回调函数。
- `sort: 'asc' | 'desc'` 支持候选项排序。
- `auto_refresh` 用于依赖项变化后刷新并校验。
- `clear_value` 用于候选项变化且当前值不在新列表中时清空。

如果需要手动输入不在枚举中的值，可在 schema 上设置 `isCustomEnum: true`，跳过 enum 有效性校验，通常配合 select2/selectize 的 tags/create 能力使用。

### 5.4 relativeTo 联动校验

`relativeTo` 用于当前字段和另一个字段之间的大小关系校验，当前版本对错误配置做了健壮性保护：找不到目标字段时不会阻断渲染。

```javascript
{
    type: 'object',
    properties: {
        minLevel: {
            type: 'number'
        },
        maxLevel: {
            type: 'number',
            relativeTo: {
                path: 'root.minLevel',
                limit: 'greater'
            }
        }
    }
}
```

`limit` 常用值：

- `greater`：当前字段值应大于等于目标字段值。
- `less`：当前字段值应小于等于目标字段值。

### 5.5 anyOf / oneOf 条件切换

JSON Press 使用 `multiple` 编辑器处理 `oneOf`、`anyOf`。近期增强点：

- anyOf 子项如果都带 `options.dependencies`，会隐藏原生切换控件，改由依赖字段激活对应子项。
- 激活依赖项时会同步切换当前子编辑器并重置联动值。
- `options.showHeader: true` 可强制显示 anyOf 子项标题区，避免标题上的 `infoText` 被隐藏。
- anyOf 校验会优先返回当前激活项的校验信息。

```javascript
{
    type: 'object',
    properties: {
        mode: {
            type: 'string',
            enum: ['a', 'b']
        },
        config: {
            anyOf: [
                {
                    title: 'A 配置',
                    type: 'object',
                    options: {
                        showHeader: true,
                        dependencies: {
                            mode: 'a'
                        },
                        infoText: 'A 模式说明'
                    },
                    properties: {
                        aValue: {type: 'string'}
                    }
                },
                {
                    title: 'B 配置',
                    type: 'object',
                    options: {
                        dependencies: {
                            mode: 'b'
                        }
                    },
                    properties: {
                        bValue: {type: 'number'}
                    }
                }
            ]
        }
    }
}
```

### 5.6 array/tabs/table 增强

数组常用展示：

- 默认列表：`type: 'array'`
- 表格：`format: 'table'`
- 页签：`format: 'tabs'` / `format: 'tabs-top'`
- 多选：`items.enum` + `uniqueItems: true`

Press 扩展：

```javascript
{
    type: 'array',
    format: 'tabs',
    options: {
        tabCollapsed: true,
        tabWide: true,
        reversed: true,
        array_controls_top: true,
        enable_array_copy: true
    },
    items: {
        type: 'object',
        title: '配置项',
        properties: {
            name: {type: 'string'}
        }
    }
}
```

当前版本同步了上游修复：当 `type: 'array'`、`format: 'table'` 且 `items.enum` 存在时，会保持 table 编辑器，不再被误判为 multiselect。

### 5.7 array 校验与只读增强

CHANGELOG 中长期维护的 array/table 增强主要集中在“批量配置、只读内置项、相邻项约束、唯一性校验”几个方向。

`items.readOnly` 可设置数组项只读，支持布尔值或函数。函数形式适合固定内置项，只允许编辑新增项。

```javascript
{
    type: 'array',
    format: 'table',
    items: {
        type: 'object',
        readOnly: item => item && item.builtin === true,
        properties: {
            name: {type: 'string'},
            builtin: {
                type: 'boolean',
                options: {
                    ignore: 'readOnly'
                }
            }
        }
    }
}
```

数组校验扩展：

```javascript
{
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {type: 'string'},
            level: {type: 'number'}
        }
    },
    uniqueItems: 'id',
    compareThanPrev: {
        path: 'level',
        limit: 'greater'
    }
}
```

- `uniqueItems: 'a.b'`：按嵌套属性去重。
- `uniqueItems: 'items@'`：按数组项内的数组字段展开后去重。
- `compareThanPrev`：约束当前项指定字段与上一个相邻项的大小关系。
- `exclusive`：约束数组项中若干互斥属性只能选择一个。

### 5.8 multiline 快速录入数组

`format: 'multiline'` 是 Press 新增编辑器，用一个 textarea 快速输入数组，每行对应一个元素。

```javascript
{
    type: 'string',
    format: 'multiline',
    title: '白名单 ID',
    options: {
        multiType: 'number'
    }
}
```

`multiType` 支持：

- `string`
- `number`
- `boolean`

空值处理规则：必填字段返回空数组，非必填字段返回 `undefined`。这点对保存值结构有影响，集成时要留意。

### 5.9 字符串、描述和正则增强

Press 对 string/description 也有一些常用扩展：

```javascript
{
    type: 'string',
    title: '编码',
    description: '必须符合业务编码规则\n可在配置中心查询',
    pattern: '^[A-Z0-9_]+$',
    patternValidate: value => value !== 'AUTO',
    newOnly: true,
    options: {
        warning: true
    }
}
```

- `description` 支持 `\n` 换行。
- `options.warning` 可让 description 使用警示样式。
- `patternValidate(value)` 可按条件决定 `pattern` 是否生效。
- `newOnly` 用于“只能新建不能编辑”：字段没有旧值时可编辑，已有值后禁用。
- string 保存时会默认去除前后空格。

### 5.10 数值、日期、签名与评分组件

CHANGELOG 中涉及的输入组件增强还包括：

- number/integer 的 `format: 'range'` 可作为滑块使用，`step` 会写入原生 input 的步进属性。
- number/integer 的 `format: 'stepper'` 使用 stepper 编辑器。
- number/integer/string 的 `format: 'rating'` 或 `format: 'starrating'` 使用打星组件，并支持 `exclusiveMaximum` 调整最大星级。
- datetime 支持 string 与 integer 类型，integer 类型返回时间戳；date/time/datetime-local 可配合 flatpickr。
- signature 修复过清除和 `onEnd` 数据同步问题，适合需要手写签名图片 base64 的场景。

```javascript
{
    type: 'integer',
    format: 'range',
    minimum: 1,
    maximum: 10,
    step: 1
}
```

### 5.11 select/select2 与 tabs 展示

select 相关能力除了 `enumSource` 外，还包括：

- `format: 'tabs'`：select 可展示为标签切换形式。
- select2 创建自定义选项时已修复回车提交后值未正确更新的问题。
- array select2 支持 `options.relativeToParent`，用于解决下拉层与业务弹窗层级互相遮挡。

```javascript
{
    type: 'string',
    enum: ['dev', 'test', 'prod'],
    format: 'tabs'
}
```

### 5.12 Edit JSON 增强

object 的 Edit JSON 能力支持通过实例配置调整：

```javascript
const editor = new JSONEditor(element, {
    schema,
    show_save_btn: false,
    transform_json: json => {
        json.updatedAt = Date.now();
        return json;
    }
});
```

- `show_save_btn` 可控制 Edit JSON 对话框内保存按钮展示。
- `transform_json(json)` 可在 Edit JSON 保存前转换数据。
- 编辑器整体 disabled 时，Edit JSON 入口仍可打开，但内部保存会被禁用。

### 5.13 upload 与 fileContent

当字段为 `type: 'string'` 且 `format: 'url'` 或 `format: 'fileContent'`，并配置 `options.upload` 时，会使用 upload 编辑器。

`fileContent` 会把上传文件文本内容作为字段值，并支持下载导出类场景。

```javascript
{
    type: 'string',
    format: 'fileContent',
    title: '上传配置文件',
    options: {
        upload: {
            max_upload_size: 1024 * 1024,
            mime_type: 'application/json',
            upload_handler: (type, file, callbacks) => {
                // callbacks.success(value)
                // callbacks.failure(message)
                // callbacks.updateProgress(percent)
            }
        }
    }
}
```

## 6. 读写与事件 API

整体读写：

```javascript
editor.on('ready', () => {
    editor.setValue({name: 'John Smith'});
    const value = editor.getValue();
});
```

局部读写：

```javascript
const nameEditor = editor.getEditor('root.name');

if (nameEditor) {
    nameEditor.setValue('John Smith');
    console.log(nameEditor.getValue());
}
```

校验：

```javascript
const errors = editor.validate();

if (errors.length) {
    console.log(errors); // [{path, property, message}]
}

// 保存前触发界面错误展示
const saveErrors = editor.validate(editor.getValue(), true);
```

事件：

```javascript
const handleChange = currentEditor => {
    console.log('changed', currentEditor && currentEditor.path);
};

editor.on('change', handleChange);
editor.off('change', handleChange);

editor.watch('root.name', () => {
    console.log('name changed');
});

editor.unwatch('root.name');
```

启停与销毁：

```javascript
editor.disable();
editor.enable();

const field = editor.getEditor('root.optionalField');
field.deactivate(); // 非 required 字段可停用，停用后不进入最终值
field.activate();

editor.destroy();
```

## 7. 全局回调

部分编辑器支持把 schema 中的函数配置写成字符串，再通过 `JSONEditor.defaults.callbacks` 注册全局回调，便于 schema 可序列化或由后端下发。

### upload

```javascript
const schema = {
    type: 'string',
    format: 'url',
    options: {
        upload: {
            upload_handler: 'uploadHandler'
        }
    }
};

JSONEditor.defaults.callbacks.upload = {
    uploadHandler(jseditor, path, file, callback) {
        callback.success('https://example.com/' + file.name);
    }
};
```

### autocomplete

```javascript
const schema = {
    type: 'string',
    format: 'autocomplete',
    options: {
        autocomplete: {
            search: 'search',
            renderResult: 'renderResult',
            getResultValue: 'getResultValue'
        }
    }
};

JSONEditor.defaults.callbacks.autocomplete = {
    search(jseditor, input) {
        return Promise.resolve([{title: input}]);
    },
    renderResult(jseditor, result, props) {
        return `<li ${props}>${result.title}</li>`;
    },
    getResultValue(jseditor, result) {
        return result.title;
    }
};
```

### button

```javascript
const schema = {
    type: 'button',
    title: '保存',
    options: {
        button: {
            validated: true,
            action: 'save'
        }
    }
};

JSONEditor.defaults.callbacks.button = {
    save(jseditor, event) {
        console.log(jseditor.jsoneditor.getValue());
    }
};
```

### template

```javascript
const schema = {
    type: 'object',
    properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        fullName: {
            type: 'string',
            template: 'formatName',
            watch: {
                first: 'firstName',
                last: 'lastName'
            }
        }
    }
};

JSONEditor.defaults.callbacks.template = {
    formatName(jseditor, data) {
        return `${data.first} ${data.last}`.trim();
    }
};
```

当前版本同步了上游修复：string template 联动计算时不再继续冒泡触发额外 `onChange`，可降低依赖联动中的死循环或重复渲染风险。

## 8. 自定义校验

可通过全局或实例配置增加校验器。校验器返回错误数组，错误对象包含 `path`、`property`、`message`。

```javascript
JSONEditor.defaults.custom_validators.push((schema, value, path) => {
    const errors = [];

    if (schema.format === 'date' && value && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
        errors.push({
            path,
            property: 'format',
            message: '日期必须是 YYYY-MM-DD 格式'
        });
    }

    return errors;
});
```

## 9. 覆盖默认行为

通过原型覆盖某类编辑器行为：

```javascript
JSONEditor.defaults.editors.integer.prototype.sanitize = function (value) {
    return value;
};
```

通过路径覆盖单个节点行为：

```javascript
editor.on('ready', () => {
    const field = editor.getEditor('root.integerfield');
    field.sanitize = function (value) {
        return value;
    };
});
```

## 10. 近期修复对集成方的影响

`1.2.2-beta.7` 同步了多项上游 json-editor 修复，集成时可关注这些行为变化：

- array：`empty(hard)` 会清理超出长度的 `row_cache`，反复增删行时内存残留更少。
- object：属性面板外部点击关闭的事件监听器可正确移除，避免监听器残留。
- string template：联动计算值不再冒泡触发额外 `onChange`。
- radio：强制同步 DOM `checked` 状态，避免多个选项同时呈现选中态。
- array/table：`items.enum` + `format: 'table'` 不再被误判为 multiselect。
- relativeTo：错误配置不会影响表单渲染。
- checkbox/toggle：`format: 'toggle'` 同样支持 `options.infoText`。
