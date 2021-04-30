# 使用说明

## 简介

JSON Press（以下简称 Press）是一款能将描述数据结构的 JSON Schema 转换为相应的 HTML 表单的前端工具库。

它能快速生成以 JSON 文件作为产出物的可交互、有约束、易校验的 HTML 表单，可以对应用、游戏提供简洁快速的配置支持，避免使用原始表单组件进行大量重复的页面布局和功能开发，提高生产效率。

它是 [json-editor/json-editor](https://github.com/json-editor/json-editor) 的 fork 版本，在其基础上进行了美化、增强和修正。

## 安装

推荐以 npm 方式安装

`$ npm install @byte-power/json-press`

## 引入

以 ES6 模块形式

`import {JSONEditor} from '@byte-power/json-press';`

以 CommonJS 形式

`let {JSONEditor} = require('@byte-power/json-press');`

## 使用

```javascript
let element = document.getElementById('editor');
let editor = new JSONEditor(element, options);
```

## 配置

可以通过全局配置或者通过每个实例初始化时传入参数来对 Press 的默认配置进行设置和修改

全局形式

`JSONEditor.defaults.options.disable_edit_json = 1`

实例化传参形式

```javascript
const editor = new JSONEditor(element, {
    //...
    disable_edit_json: 1
});
```

> 推荐使用实例化传参方式进行配置：因为在传入多条配置的情况下，使用全局形式逐条设置会比较繁琐；而使用单个对象进行整体赋值又容易丢失 default 配置内的其他值

### 常见配置

| 选项                          | 描述                                                                              | 默认值        | 全局 |
| ----------------------------- | --------------------------------------------------------------------------------- | ------------- | ---- |
| schema                        | 设置编辑器的 schema 值，支持规范的 v3、v4 版本                                    | {}            | √    |
| startval                      | 设置编辑器的初始值，该 JSON 值应该符合 schema 规则设定                            | null          | √    |
| theme                         | 设置编辑器的 CSS 主题引擎                                                         | 'html'        | √    |
| iconlib                       | 设置编辑器的图标库                                                                | null          | √    |
| template                      | 设置编辑器的 JS 模板引擎                                                          | 'default'     | √    |
| form_name_root                | 设置表单的根名称                                                                  | 'root'        | √    |
| object_layout                 | 设置 object 类型的布局展示方式，有效值包括 'table'                                | 'normal'      | √    |
| ajax                          | 是否允许编辑器通过 ajax 加载 schema 内 $ref 字段所设置的外部 schema 文件          | false         | √    |
| refs                          | 一个包含 schema 定义的 url 地址，用于预加载外部 schema                            | {}            | √    |
| max_depth                     | 设置 schema 的渲染层级，0 表示渲染所有                                            | 0             | √    |
| use_default_values            | 是否按字段的 type 属性设置来预设其初始值，否则该字段为 undefined                  | true          | √    |
| show_errors                   | 界面显示校验错误信息的时机，有效值包括 'interaction', 'change', 'always', 'never' | 'interaction' | √    |
| compact                       | 是否显示当前项的 label                                                            | false         | ×    |
| disable_array_add             | 是否禁用 array 类型的 `add row` 按钮                                              | false         | √    |
| disable_array_delete          | 是否禁用 array 类型的 `delete row` 按钮                                           | false         | √    |
| disable_array_delete_all_rows | 是否禁用 array 类型的 `delete all rows` 按钮                                      | false         | √    |
| disable_array_delete_last_row | 是否禁用 array 类型的 `delete last row` 按钮                                      | false         | √    |
| disable_array_reorder         | 是否禁用 array 类型每个子项下的 `move up` 和 `move down` 按钮                     | false         | √    |
| enable_array_copy             | 是否显示 array 类型每个子项下的 `copy` 按钮                                       | false         | √    |
| array_controls_top            | 是否把 array 类型的控制按钮（add/delete）显示在列表上方                           | false         | √    |
| prompt_before_delete          | 是否在删除 array 类型子项之前显示确认提示                                         | true          | √    |
| disable_collapse              | 是否禁用 object 和 array 类型的 `collapse` 按钮                                   | false         | √    |
| disable_edit_json             | 是否禁用 object 类型的 `Edit JSON` 按钮                                           | false         | √    |
| disable_properties            | 是否禁用 object 类型的 `Edit Properties` 按钮                                     | false         | √    |
| remove_button_labels          | 是否移除控制按钮内的文本，在 iconlib 设置时有效                                   | false         | √    |
| no_additional_properties      | object 是否能显示 properties 字段定义外的其他属性                                 | false         | √    |
| required_by_default           | schema 字段是否默认为 required (不用显式设定 required 属性)                       | false         | √    |
| display_required_only         | 是否仅显示 required 的字段                                                        | false         | √    |
| show_opt_in                   | 是否将非 required 的字段设置为可选项（其标题旁会加入切换开关）                    | false         | √    |
| keep_oneof_values             | 切换 oneOf 时是否保留其内部值                                                     | true          | √    |
| enum_source_value_auto_select | 是否在枚举类型上下移动待选项时，保留选中值                                        | true          | √    |

> 注：非全局配置是通过当前项来添加，如下例：

```javascript
options: {
    compact: true;
}
```

## 读写数据

### 整体操作

编辑器提供了 `setValue` 和 `getValue` 方法对整个实例进行存值（一般用于编辑器初始化时）和取值（一般用于保存最终输入结果）

```javascript
editor.setValue({name: 'John Smith'});

const value = editor.getValue();
console.log(value.name);
```

> 注：也可以使用编辑器的 startval 选项，在初始化时，进行默认值的设定。

### 局部操作

除了针对整个编辑器进行值的存取外，还能指定 schema 的单个节点进行相应操作。

```javascript
// 首先按路径获取编辑器的子节点
const name = editor.getEditor('root.name');

// 路径无效时，getEditor 会返回 null，避免报错
if (name) {
    name.setValue('John Smith');
    console.log(name.getValue());
}
```

## 校验数据

编辑器会对用户输入进行校验和限制，避免输入无效内容。校验的方式包括：输入状态提示、控制按钮的启用和禁用等。

在某些情况下，输入数据可能还是会和 schema 规则有冲突，但是没有得到显式提醒，这时候就可以使用编辑器提供的 `validate` 方法，进行自定义的校验和相应处理

```javascript
const errors = editor.validate();

if (errors.length) {
    // errors 是一个对象组成的数组，对象属性包括`path`、`property`、`message`
    console.log(errors);
}
```

validate 方法默认使用编辑器的当前值进行校验，可以传入自定义的值进行验证。

```javascript
const errors = editor.validate({...});
```

## 监听数据

编辑器提供了 `change` 事件，可以在数据变动时触发。

```javascript
let handle = () => {
    // 相应处理
};
editor.on('change', handle);

editor.off('change', handle); // 第二参数不传的话，默认停止监听所有事件
```

除了监听整个编辑器，也可以通过指定路径，进行子节点的监听。

```javascript
editor.watch('root.name', () => {
    // 相应处理
});

editor.unwatch('root.name', handle); // 第二参数不传的话，默认停止监听该节点上所有事件
```

## 启用、停用编辑器

编辑器提供了一系列的方法来进行整体和单独节点的启用和停用操作。

```javascript
// 禁止编辑整个表单
editor.disable();

// 禁止编辑指定路径的表单项
editor.getEditor('root.name').disable();

// 允许编辑整个表单
editor.enable();

// 允许编辑指定路径的表单项
editor.getEditor('root.name').enable();

// 检查整个表单的可编辑状态
if (editor.isEnabled()) {
    alert('ok');
}

// 停用指定路径的表单项(即整体数据不再包含该字段值，相当于 show_opt_in 选项打开，并且未勾选当前项)
// 仅支持非 required 项
editor.getEditor('root.name').deactivate();

// 启用指定路径的表单项
editor.getEditor('root.name').activate();

// 从 DOM 树移除当前编辑器节点
editor.destroy();
```

## 数据类型使用详解

目前 schema 支持的数据包括基础类型 `type` 和扩展格式 `format`，通过这两种属性的结合设置和使用，从而满足更丰富更个性化的数据格式及交互需求。

### 基础类型

-   string
-   number
-   integer
-   boolean
-   object
-   array
-   null
-   info
-   signature

### 扩展格式

-   textarea (基于 string 扩展)
-   date (基于 string 扩展)
-   time (基于 string 扩展)
-   datetime-local (基于 string 扩展)
-   color (基于 string 扩展)
-   starrating (基于 string 扩展)
-   hidden (基于 string 扩展)
-   uuid (基于 string 扩展)
-   range (基于 number 扩展)
-   rating (基于 integer 扩展)
-   checkbox (基于 boolean 扩展)
-   grid (基于 object 扩展)
-   table (基于 array 扩展)
-   tabs (基于 array 扩展)
-   radio (基于 string/number/integer + enum 扩展，即单选)
-   checkbox (基于 array + enum 扩展，即多选)
-   select2 (基于 enum 扩展，单选多选都支持)

### 最终汇总

<table>
    <thead>
        <tr>
            <th>type</th>
            <th>format</th>
            <th>enum</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">string</td>
            <td>
                textarea
                <br />
                starrating
                <br />
                hidden
                <br />
                uuid
            </td>
            <td>无</td>
            <td></td>
        </tr>
        <tr>
            <td>
                date
                <br />
                time
                <br />
                datetime-local
            </td>
            <td>无</td>
            <td>通过 flatpickr 支持</td>
        </tr>
        <tr>
            <td>color</td>
            <td>无</td>
            <td>通过 colorpicker 支持</td>
        </tr>
        <tr>
            <td>radio</td>
            <td>有</td>
            <td></td>
        </tr>
        <tr>
            <td rowspan="2">array</td>
            <td>checkbox</td>
            <td>有</td>
            <td></td>
        </tr>
        <tr>
            <td>
                table
                <br />
                tabs
            </td>
            <td>无</td>
            <td></td>
        </tr>
        <tr>
            <td>object</td>
            <td>grid</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>number</td>
            <td>range</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>integer</td>
            <td>rating</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>boolean</td>
            <td>checkbox</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>任意类型均可</td>
            <td>select2</td>
            <td>有</td>
            <td>通过 select2 支持</td>
        </tr>
        <tr>
            <td>null</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>info</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>signature</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

| type         | format                                   | enum | 备注                  |
| ------------ | ---------------------------------------- | ---- | --------------------- |
| string       | textarea<br>starrating<br>hidden<br>uuid | 无   |                       |
| string       | date<br>time<br>datetime-local           | 无   | 通过 flatpickr 支持   |
| string       | color                                    | 无   | 通过 colorpicker 支持 |
| string       | radio                                    | 有   |                       |
| array        | checkbox                                 | 有   |                       |
| array        | table<br>tabs                            | 无   |                       |
| object       | grid                                     |      |                       |
| number       | range                                    |      |                       |
| integer      | rating                                   |      |                       |
| 任意类型均可 | select2                                  | 有   | 通过 select2 支持     |
| boolean      | checkbox                                 |      |                       |
| null         |                                          |      |                       |
| info         |                                          |      |                       |
| signature    |                                          |      |                       |

### string

最基础的数据类型，通过指定 format 还能支持更多的交互和数据子类型。

#### 基础用法

```javascript
let schema = {
    name: {
        type: 'string',
        title: 'User Name', // 输入框对应的 label，不提供的话默认使用 key 值
        description: 'input text for user name', // 该字段的描述，显示在输入框下方
        default: 'bob', // 该字段的默认值
        options: {
            // 可以通过 options 字段传入一些定制化的设定
            inputAttributes: {
                placeholder: 'your name here...',
                class: 'form-control'
            }
        }
    }
};
```

#### textarea

当 format 为 _textarea_ 时，渲染为文本域形式，可以支持输入大段文字

```javascript
let schema = {
    type: 'string',
    format: 'textarea'
};
```

#### SCEditor

**SCEditor** 提供基于 HTML 和 BBCode 格式的所见即所得（WYSIWYG）的编辑体验。启用它也很简单：format 设置为 _xhtml_ 或 _bbcode_ ，然后 options 中设置 _wysiwyg_ 为 true 即可。

```javascript
let schema = {
    type: 'string',
    format: 'xhtml',
    options: {
        wysiwyg: true
    }
};
```

#### SimpleMDE

**SimpleMDE** 是一个提供动态预览的简单 Markdown 编辑器。format 设置为 _markdown_ 即可启用。

```javascript
let schema = {
    type: 'string',
    format: 'markdown'
};
```

#### Ace Editor

**Ace Editor** 是一个支持语法高亮的源代码编辑器，支持如下格式，format 设置为对应值即可启用相应语法高亮和检查。

-   c
-   cpp (alias for c++)
-   csharp
-   css
-   less
-   sass
-   scss
-   dart
-   golang
-   html
-   ini
-   java
-   javascript
-   json
-   lua
-   makefile
-   php
-   python
-   ruby
-   sql
-   pgsql
-   mysql
-   xml
-   yaml

同时 还能通过 `options.ace` 传入 Ace Editor 的原生支持选项

```javascript
let schema = {
    type: 'string',
    format: 'sql',
    options: {
        ace: {
            theme: 'ace/theme/vibrant_ink',
            tabSize: 2,
            wrap: true
        }
    }
};
```

#### 结合 enum 属性

当通过 enum 属性提供了可选枚举值后，string 字段会被渲染为下拉选择框。假如设置 format 为 _radio_，就可以切换为单选框形式（推荐在可选项少于 5 个时使用）。

```javascript
let schema = {
    type: 'string',
    format: 'radio',
    enum: ['get', 'post', 'put', 'delete']
};
```

> 注：当为 radio 时，该字段默认为 required

另外 Press 也引入了 select2 第三方库用于优化选择效果，同样的，设置 format 为 _select2_，就可以启用。

```javascript
let schema = {
    type: 'string',
    format: 'select2',
    enum: ['get', 'post', 'put', 'delete']
};
```

### boolean

boolean 类型默认是下拉选择框形式，内置选项 true 和 false。假如设置 format 为 _checkbox_，就可以切换为复选框形式。

```javascript
let schema = {
    type: 'boolean',
    format: 'checkbox',
    title: '是否启用',
    default: true
};
```

另外我们还新增了一个开关切换形式用于布尔类型。

```javascript
let schema = {
    type: 'boolean',
    format: 'toggle'
};
```

### array

array 作为 JSON 数据的重要组成类型，相应的，数组编辑器也占据了 Press 编辑器的大量篇幅（包括界面、代码等等）。
除了默认形式，另外还提供了 table 和 tabs 两种 format 形式来编辑数组。

默认: 数组元素从上到下，垂直排列分布，适合元素数量少时。
table: 用表格的形式展示数组元素，适合元素数量多且元素为对象且属性少的情况。
tab: 用左边的页签来切换数据元素，永远只显示一个元素，适合元素为对象且属性多的情况。
tab-top: 同上，只是页签的位置在上方。

```javascript
let schema = {
    type: 'array',
    items: {
        type: 'string'
    }
};
let schema2 = {
    type: 'array',
    format: 'table',
    items: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            id: {
                type: 'string'
            }
        }
    }
};
```

array 类型提供了一个 uniqueItems 属性，当为 true 时，可以避免添加重复项。我们针对该属性做了优化，可以通过传入字符串来指定数组元素的某个属性不能重复。

```javascript
let schema = {
    type: 'array',
    format: 'table',
    uniqueItems: 'name',
    items: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            id: {
                type: 'string'
            }
        }
    }
};
```

#### 结合 enum 属性

同样的，通过 enum 属性提供了可选枚举值后，array 字段会被渲染为多选框。假如设置 format 为 _checkbox_，就可以切换为复选框形式（同时要设置 uniqueItems 属性，推荐在可选项少于 8 个时使用）。

```javascript
let schema = {
    type: 'array',
    format: 'checkbox',
    uniqueItems: true,
    items: {
        type: 'string',
        enum: ['A-Yes', 'A-Unknown', 'B-Yes', 'B-Unknown', 'C-Yes', 'C-Unknown', 'D-Yes', 'D-Unknown', 'E-Yes', 'E-Unknown']
    }
};
```

上文提及的 select2 也支持多选，设置 format 为 _select2_，就可以启用。

```javascript
let schema = {
    type: 'array',
    format: 'select2',
    items: {
        type: 'string',
        enum: ['A-Yes', 'A-Unknown', 'B-Yes', 'B-Unknown', 'C-Yes', 'C-Unknown', 'D-Yes', 'D-Unknown', 'E-Yes', 'E-Unknown']
    }
};
```

### button

默认为 required
