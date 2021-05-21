# 使用说明

## 简介

JSON Press 是一款能将描述数据结构的 JSON Schema 转换为相应的 HTML 表单的前端工具库。

它能快速生成以 JSON 文件作为产出物的可交互、有约束、易校验的 HTML 表单，可以对应用、游戏提供简洁快速的配置支持，避免使用原始表单组件进行大量重复的页面布局和功能开发，提高生产效率。

它是 [json-editor/json-editor](https://github.com/json-editor/json-editor) 的 fork 版本，在其基础上进行了美化、增强和修正（下文用 Press 代指来注明修改之处）。

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

编辑器的配置分为全局配置和局部配置。

### 全局配置

全局配置可以通过默认值形式或者实例初始化时传入参数来对编辑器的默认配置进行设置和修改

#### 全局默认值形式

`JSONEditor.defaults.options.disable_edit_json = 1`

#### 实例化传参形式

实例化编辑器对象时，支持以参数的方式传入配置。

```javascript
const editor = new JSONEditor(element, {
    //...
    disable_edit_json: 1
});
```

> 推荐使用实例化传参方式进行配置：因为在需传入多条配置的情景下，使用默认值形式逐条设置会比较繁琐；而使用单个对象进行整体赋值又容易覆盖 default 配置，造成其他值丢失

### 配置项列表

| 选项                          | 描述                                                                              | 默认值        | 全局 | 局部 |
| ----------------------------- | --------------------------------------------------------------------------------- | ------------- | ---- | ---- |
| schema                        | 设置编辑器的 schema 值，支持规范的 v3、v4 版本                                    | {}            | √    |      |
| startval                      | 设置编辑器的初始值，该 JSON 值应该符合 schema 规则设定                            | null          | √    |      |
| theme                         | 设置编辑器的 CSS 主题引擎                                                         | 'html'        | √    |      |
| iconlib                       | 设置编辑器的图标库                                                                | null          | √    |      |
| template                      | 设置编辑器的 JS 模板引擎                                                          | 'default'     | √    |      |
| form_name_root                | 设置表单的根名称                                                                  | 'root'        | √    |      |
| object_layout                 | 设置 object 类型的布局展示方式，有效值包括 'table'                                | 'normal'      | √    |      |
| ajax                          | 是否允许编辑器通过 ajax 加载 schema 内 $ref 关键字所设置的外部 schema 文件        | false         | √    |      |
| refs                          | 一个包含 schema 定义的 url 地址，用于预加载外部 schema                            | {}            | √    |      |
| max_depth                     | 设置 schema 的渲染层级，0 表示渲染所有                                            | 0             | √    |      |
| use_default_values            | 是否按字段的 type 属性设置来预设其初始值，否则该字段为 undefined                  | true          | √    |      |
| show_errors                   | 界面显示校验错误信息的时机，有效值包括 'interaction', 'change', 'always', 'never' | 'interaction' | √    |      |
| disable_array_add             | 是否禁用 array 类型的 `add row` 按钮                                              | false         | √    | √    |
| disable_array_delete          | 是否禁用 array 类型的 `delete row` 按钮                                           | false         | √    | √    |
| disable_array_delete_all_rows | 是否禁用 array 类型的 `delete all rows` 按钮                                      | false         | √    | √    |
| disable_array_delete_last_row | 是否禁用 array 类型的 `delete last row` 按钮                                      | false         | √    | √    |
| disable_array_reorder         | 是否禁用 array 类型每个元素下的 `move up` 和 `move down` 按钮                     | false         | √    | √    |
| enable_array_copy             | 是否显示 array 类型每个元素下的 `copy` 按钮                                       | false         | √    |      |
| array_controls_top            | 是否把 array 类型的控制按钮（add/delete）显示在列表上方                           | false         | √    | √    |
| prompt_before_delete          | 是否在删除 array 类型元素之前显示确认提示                                         | true          | √    |      |
| disable_collapse              | 是否禁用 object 和 array 类型的 `collapse` 按钮                                   | false         | √    | √    |
| disable_edit_json             | 是否禁用 object 类型的 `Edit JSON` 按钮                                           | false         | √    | √    |
| disable_properties            | 是否禁用 object 类型的 `Edit Properties` 按钮                                     | false         | √    | √    |
| remove_button_labels          | 是否移除控制按钮内的文本，在 iconlib 设置时有效                                   | false         | √    |      |
| no_additional_properties      | object 是否能显示 properties 关键字定义外的其他属性                               | false         | √    |      |
| required_by_default           | schema 字段是否默认为 required (不用显式设定 required 属性)                       | false         | √    |      |
| display_required_only         | 是否仅显示 required 的字段                                                        | false         | √    |      |
| show_opt_in                   | 是否将非 required 的字段设置为可选项（其标题旁会加入切换开关）                    | false         | √    |      |
| keep_oneof_values             | 切换 oneOf 时是否保留其内部值                                                     | true          | √    |      |
| enum_source_value_auto_select | 是否在枚举类型上下移动待选项时，保留选中值                                        | true          | √    |      |
| compact                       | 是否显示当前项的 label                                                            | false         |      | √    |
| collapsed                     | 是否默认折叠 object 和 array 类型的数据                                           | false         |      | √    |
| enum_titles                   | 设置枚举类型的选项标题，用于定义 enum 属性列表中每项值的对应显示标题              | []            |      | √    |
| hidden                        | 是否在界面隐藏当前项（getValue 获取值不受影响）                                   | false         |      | √    |
| remove_empty_properties       | 是否移除空属性值，即 getValue 时不会获取为 falsy 值的相关属性，用于 object 类型   | false         |      | √    |
| grid_columns                  | 设置当前项占据的栅格数（1 至 12），用于 object 类型的 grid 布局                   |               |      | √    |
| expand_height                 | 是否自动扩展当前输入框的高度以适应内容，用于 textarea                             | false         |      | √    |
| input_height                  | 设置当前输入框的高度，支持有效 css 值，用于 textarea                              |               |      | √    |
| input_width                   | 设置当前输入框的宽度，支持有效 css 值，用于 string、number、integer               |               |      | √    |

### 局部配置

局部配置是通过当前项 options 属性来添加。

```javascript
let schema = {
    compact: {
        type: 'string',
        options: {
            // option
            compact: true
        }
    },
    hidden: {
        type: 'string',
        options: {
            // option
            hidden: true
        }
    },
    multi: {
        type: 'object',
        format: 'grid',
        properties: {
            color: {
                type: 'integer',
                enum: [1, 2, 3, 4, 5],
                options: {
                    // option
                    grid_columns: 6,
                    // option
                    enum_titles: ['Black', 'Red', 'Green', 'Blue', 'White']
                }
            },
            intro: {
                type: 'string',
                format: 'textarea',
                options: {
                    // option
                    grid_columns: 6,
                    // option
                    expand_height: true
                }
            },
            empty: {
                type: 'string'
            }
        },
        options: {
            // option
            collapsed: true,
            // option
            remove_empty_properties: true
        }
    },
    list: {
        type: 'array',
        format: 'table',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    options: {
                        // option
                        input_width: '150px'
                    }
                },
                id: {
                    type: 'string',
                    format: 'textarea',
                    options: {
                        // option
                        input_height: '60px'
                    }
                }
            }
        }
    }
};
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

## 原生 JSON Schema 支持

编辑器支持原生的 JSON Schema 规范（v4 版），包括核心定义和校验规则。

### $ref 和 definitions

编辑器支持使用 `$ref` 关键字来索引外部 URL 或本地自定义类型。

```javascript
let schema = {
    type: 'object',
    properties: {
        name: {
            title: 'Full Name',
            $ref: '#/definitions/name'
        },
        location: {
            $ref: 'http://mydomain.com/geo.json'
        }
    },
    definitions: {
        name: {
            type: 'string',
            minLength: 5
        }
    }
};
```

本地自定义类型主要是通过定义在根节点的 `definitions` 关键字来生成。

### hyper-schema

编辑器支持使用 `links` 关键字来支持 schema 的扩展集合（hyper-schema），它通常用于链接外部文档或媒体资源。

`links.mediaType` 属性可以让编辑器以恰当的方式显示媒体文件，而不是仅是文本方式。

#### 简单文本链接

```javascript
let schema = {
    title: 'Blog Post Id',
    type: 'integer',
    links: [
        {
            rel: 'comments',
            href: '/posts/{{self}}/comments/',
            // 定义链接的样式
            class: 'comment-link'
        }
    ]
};
```

#### 创建可下载的链接

```javascript
let schema = {
    title: 'Document filename',
    type: 'string',
    links: [
        {
            rel: 'Download File',
            href: '/documents/{{self}}',
            // 下列属性也可以设置为字符串形式
            download: true
        }
    ]
};
```

#### 显示媒体预览（按 HTML5 方式）

```javascript
let schema = {
    title: 'Video filename',
    type: 'string',
    links: [
        {
            href: '/videos/{{self}}.mp4',
            mediaType: 'video/mp4'
        }
    ]
};
```

> self 表示当前字段的值

### 属性排序

原生的 schema 规范是不支持对属性进行排序的。编辑器提供了一个关键字 `propertyOrder` 用于实现这个目的。默认值为 _1000_，假如遇到相同的值，按标准 JSON 键值进行排序。

```javascript
let schema = {
    type: 'object',
    properties: {
        prop1: {
            type: 'string'
        },
        prop2: {
            type: 'string',
            propertyOrder: 10
        },
        prop3: {
            type: 'string',
            propertyOrder: 1001
        },
        prop4: {
            type: 'string',
            propertyOrder: 1
        }
    }
};
```

最终排序结果为： prop4、prop2、prop1、prop3

### 默认属性

编辑器默认行为是对象所有定义在 `properties` 关键字的属性都会包括在内，可以使用 `defaultProperties` 关键字来指定若干属性来覆盖默认行为，此时除了指定属性，其他属性都不会在界面显示和包含在最终 JSON 值内。

```javascript
let schema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        age: {type: 'integer'}
    },
    defaultProperties: ['name']
};
```

### 字段提示

通过 `option.infoText` 属性，可以在字段标题旁边显示一个带 hover 效果的提示图标。

```javascript
let schema = {
    type: 'string',
    title: 'Name',
    options: {
        infoText: 'Your full name'
    }
};
```

## 数据类型

目前 schema 支持的数据包括基础类型 `type` 和扩展格式 `format`，通过这两种关键字的结合设置和使用，从而满足更丰富更个性化的数据格式及交互需求。

### 基础类型

-   string
-   boolean
-   number
-   integer
-   array
-   object
-   info
-   null

### 扩展格式

-   textarea (基于 string 扩展)
-   date (基于 string 扩展)
-   time (基于 string 扩展)
-   datetime-local (基于 string 扩展)
-   color (基于 string 扩展)
-   starrating (基于 string 扩展)
-   hidden (基于 string 扩展)
-   uuid (基于 string 扩展)
-   signature (基于 string 扩展)
-   range (基于 number 扩展)
-   rating (基于 integer 扩展)
-   checkbox (基于 boolean 扩展)
-   grid (基于 object 扩展)
-   table (基于 array 扩展)
-   tabs (基于 array 扩展)
-   radio (基于 string/number/integer + enum 扩展，即单选)
-   checkbox (基于 array + enum 扩展，即多选)
-   select2 (基于 enum 扩展，单选多选都支持)

### 汇总

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
            <td rowspan="5">string</td>
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
            <td>通过 vanilla-picker 支持</td>
        </tr>
         <tr>
            <td>signature</td>
            <td>无</td>
            <td>通过 signature_pad 支持</td>
        </tr>
        <tr>
            <td>radio</td>
            <td>有</td>
            <td></td>
        </tr>
        <tr>
            <td>boolean</td>
            <td>checkbox</td>
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
            <td>任意类型均可</td>
            <td>select2</td>
            <td>有</td>
            <td>通过 select2 支持</td>
        </tr>
        <tr>
            <td>info</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>null</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

### string

最基础的数据类型，通过指定 `format` 还能支持更多的交互和数据子类型。

#### 基础用法

```javascript
let schema = {
    name: {
        type: 'string',
        title: 'User Name', // 输入框对应的 label，不提供的话默认使用 key 值
        description: 'input text for user name', // 该字段的描述，显示在输入框下方
        default: 'bob', // 该字段的默认值
        options: {
            // 可以通过 options 关键字传入一些定制化的设定
            inputAttributes: {
                placeholder: 'your name here...',
                class: 'form-control'
            }
        }
    }
};
```

string 提供了一个关键字 `minLength` 用于限制字符串的最小长度。

```javascript
let schema = {
    type: 'string',
    // 相当于限制该字符串不能为空
    minLength: 1
};
```

#### textarea

当 `format` 为 _textarea_ 时，渲染为文本域形式，可以支持输入大段文字。

```javascript
let schema = {
    type: 'string',
    format: 'textarea'
};
```

#### colorpicker

当 `format` 为 _color_ 时，渲染为颜色选择器形式，可以支持输入色值。通过 `options.colorpicker` 设置相关属性即可启用[vanilla-picker](https://github.com/Sphinxxxx/vanilla-picker) 第三方控件，并支持传入其原生配置。

```javascript
let schema = {
    type: 'string',
    format: 'color',
    options: {
        colorpicker: {
            popup: 'bottom', // 弹出位置，支持 top、left、right，默认是 bottom
            editorFormat: 'hex', // 颜色格式，支持 rgb、hsl，默认是 hex
            alpha: true // 是否支持透明度
        }
    }
};
```

#### datetime

当需要输入日期或时间类的字符串值时，可以使用 `format` 来指定相应的格式。
编辑器共提供了 3 种类型：

-   date，渲染为日期选择框，返回值为 ‘YYYY-MM-DD’ 格式
-   time，渲染为时间选择框，返回值为 ‘HH:MM’ 格式
-   datetime-local，渲染为日期+时间选择框，返回值为 ‘YYYY-MM-DD HH:MM’ 格式

通过 `options.flatpickr` 中设置相关属性，可以启用第三方控件 [flatpickr](https://github.com/flatpickr/flatpickr)，并支持传入其原生配置。

```javascript
let schema = {
    type: 'string',
    format: 'datetime-local',
    options: {
        flatpickr: {
            inline: true, // 是否启用行内模式，即日期选择框直接显示，和 wrap 互斥
            inlineHideInput: false, // 当启用 inline 模式时，是否隐藏原生的输入框
            wrap: true, // 是否启用按钮群组模式，可以显示切换和清除按钮，和 inline 互斥
            showToggleButton: false, // 当启用 wrap 模式时，是否显示切换按钮
            showClearButton: false, // 当启用 wrap 模式时，是否显示清除按钮
            defaultHour: 7, // 默认小时数
            defaultMinute: 19, // 默认分钟数
            hourIncrement: 2, // 每次点击按钮小时增量
            minuteIncrement: 3, // 每次点击按钮分钟增量
            enableSeconds: true, // 是否启用秒数
            time_24hr: true, // 是否启用 24 小时制
            allowInput: true // 是否允许手动输入
        }
    }
};
```

#### uuid

当 `format` 为 _uuid_ 时，渲染为一个只读的输入框，自动生成 uuid 格式字符串。

```javascript
let schema = {
    type: 'string',
    format: 'uuid',
    description: 'uuid field with value'
};
```

#### signature

编辑器引入了 [signature pad](https://github.com/szimek/signature_pad) 第三方控件来支持签名输入。当 `format` 为 _signature_ 时，渲染为一个手写板，可以进行签名，最后图片保存为 base64 格式。通过 `options.canvas_height` 属性可以定义手写板的高度.

```javascript
let schema = {
    type: 'string',
    format: 'signature',
    options: {
        canvas_height: 200
    }
};
```

#### ip

可以使用 `format` 关键字指定该字段为 ip 格式（包括 _ipv4、ipv6、hostname_ 三个有效值），这时编辑器会调用相关的格式校验，以避免用户输入非法 ip 格式。

```javascript
let schema = {
    ipAddress: {
        title: 'IPv4 Address',
        type: 'string',
        format: 'ipv4'
    },
    ipv6Address: {
        title: 'IPv6 Address',
        type: 'string',
        format: 'ipv6'
    },
    hostname: {
        title: 'hostname',
        type: 'string',
        format: 'hostname'
    }
};
```

#### upload

编辑器内置了一个上传控件，可以支持相关文件的上传。

启用方法：

-   首先设置 `format` 为 _url_，同时通过 `options.upload` 中设置相关属性，即可启用一个带文件预览和上传进度的上传控件。
-   在相关属性内，使用 `upload_handler` 关键字可以指定一个上传的处理函数名。
-   同时要通过 `JSONEditor.defaults.callbacks.upload` 属性定义该上传处理函数。该函数有四个回调参数 _jseditor, type, file, callback_。
    -   jseditor：当前编辑器实例
    -   type：上传控件对应的路径字段
    -   file：上传控件选中的文件
    -   callback：回调对象（提供了 success、failure、updateProgress 方法）
        -   success：成功的回调方法，用于给控件对应的字段赋值
        -   failure：失败的回调方法，用于控件显示错误提示信息
        -   updateProgress：上传进度的回调方法，用于控件实时渲染进度提示
-   可以通过 `links` 关键字设置上传成功后的回显：默认是显示文件完整路径，可以用 `rel` 为 _view_ 来仅显示 view 字样的链接

```javascript
let schema = {
    type: 'string',
    format: 'url',
    options: {
        upload: {
            upload_handler: 'uploadHandler'
        }
    },
    links: [
        {
            href: '{{self}}',
            rel: 'view'
        }
    ]
};

JSONEditor.defaults.callbacks.upload = {
    uploadHandler: function (jseditor, type, file, callback) {
        if (type === 'root.uploadfail') {
            callback.failure('Upload failed');
        } else {
            let step = 0;

            let tickFunction = function () {
                step += 1;
                console.log('progress: ' + step);

                if (step < 100) {
                    callback.updateProgress(step);
                    window.setTimeout(tickFunction, 50);
                } else if (step == 100) {
                    callback.updateProgress();
                    window.setTimeout(tickFunction, 500);
                } else {
                    callback.success('http://www.example.com/images/' + file.name);
                }
            };

            window.setTimeout(tickFunction);
        }
    }
};
```

#### base64

针对小型文件的内容录入，可以不使用 upload 控件上传并返回路径，而用 base64 的方式，直接将文件嵌入字段中。
我们只需要设置 `media.binaryEncoding` 为 _base64_ 即可。这时字段会渲染为文件控件，但是不带上传功能，所选中的文件内容会编码为 base64 格式，并随着整体 JSON 数据一起提交。

```javascript
let schema = {
    type: 'string',
    media: {
        binaryEncoding: 'base64',
        type: 'img/png'
    }
};
```

#### hidden

对于不需要在界面显示和编辑的隐藏值，可以使用 hidden 类型来解决。

hidden 控件实现有两种方法：

-   通过 `format` 关键字设置为 _hidden_ 实现，字段输入控件不在界面显示，但是字段标题 label 还会渲染
-   通过 `options.hidden` 属性设置为 _true_ 实现，整个字段不在界面显示，但是最终 JSON 值包含该字段值

```javascript
let schema = {
    hidden: {
        type: 'string',
        options: {
            hidden: true
        }
    },
    hiddenAnother: {
        type: 'string',
        format: 'hidden'
    }
};
```

#### autocomplete

编辑器引入了 [autocomplete](https://github.com/trevoreyre/autocomplete) 第三方控件用于实现输入时自动完成效果，优化交互和体验。设置 format 为 _autocomplete_，就可以启用。

启用方法：

-   首先设置 `format` 为 _autocomplete_，同时通过 `options.autocomplete` 设置相关属性，即可启用一个带自动完成的输入控件。
-   在相关属性内，使用 `search` 关键字指定一个搜索函数并异步返回结果；使用 `renderResult` 关键字指定一个函数处理上述返回结果并渲染到输入框；使用 `getResultValue` 关键字指定一个函数返回选中项对应文本；使用 `autoSelect` 关键字设置是否自动选择列表第一个项。
-   同时要通过 `JSONEditor.defaults.callbacks.autocomplete` 属性定义上述各个函数。

```javascript
let schema = {
    type: 'string',
    format: 'autocomplete',
    options: {
        autocomplete: {
            search: 'search_wikipedia',
            renderResult: 'renderResult_wikipedia',
            getResultValue: 'getResultValue_wikipedia',
            autoSelect: true
        }
    }
};

JSONEditor.defaults.callbacks.autocomplete = {
    // Setup for Wikipedia lookup
    search_wikipedia: function search(jseditor, input) {
        let url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=' + encodeURI(input);

        return new Promise(function (resolve) {
            if (input.length < 3) {
                return resolve([]);
            }

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    resolve(data.query.search);
                });
        });
    },
    renderResult_wikipedia: function (jseditor, result, props) {
        return [
            '<li ' + props + '>',
            '<div class="wiki-title">' + result.title + '</div>',
            '<div class="wiki-snippet"><small>' + result.snippet + '<small></div>',
            '</li>'
        ].join('');
    },
    getResultValue_wikipedia: function getResultValue(jseditor, result) {
        return result.title;
    }
};
```

#### SCEditor

[**SCEditor**](https://github.com/samclarke/SCEditor) 是一个提供基于 HTML 和 BBCode 格式的所见即所得（WYSIWYG）编辑器。它作为第三方控件被引入，启用也很简单：`format` 设置为 _xhtml_ 或 _bbcode_ ，然后设置 `options.wysiwyg` 为 true 即可。

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

[**SimpleMDE**](https://github.com/sparksuite/simplemde-markdown-editor) 是一个提供动态预览的简单 Markdown 编辑器。它作为第三方控件被引入，`format` 设置为 _markdown_ 即可启用。

```javascript
let schema = {
    type: 'string',
    format: 'markdown'
};
```

#### Ace Editor

[**Ace Editor**](https://github.com/ajaxorg/ace) 是一个支持语法高亮的源代码编辑器，它作为第三方控件被引入，`format` 设置为对应值即可启用相应语法高亮和检查。

支持格式如下：

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

当通过 enum 属性提供了可选枚举值后，string 类型会被渲染为下拉选择框。假如设置 `format` 为 _radio_，就可以切换为单选框形式（推荐在可选项小于 5 个时使用）。

假如当前字段为非必填项的话，下拉选择框会在顶部增加一个空项，如果不想显示此项，可以将该字段加入 `required` 属性列表内。

```javascript
let schema = {
    type: 'string',
    format: 'radio',
    enum: ['get', 'post', 'put', 'delete']
};
```

> 注：当为 radio 时，该字段默认为 required

另外设置 `format` 为 _select2_，就可以启用第三方控件[select2](https://github.com/select2/select2)，可以提升选择交互体验。

```javascript
let schema = {
    type: 'string',
    format: 'select2',
    enum: ['get', 'post', 'put', 'delete']
};
```

### boolean

boolean 类型默认是下拉选择框形式，内置选项 _true_ 和 _false_。假如设置 `format` 为 _checkbox_，就可以切换为复选框形式。

```javascript
let schema = {
    type: 'boolean',
    format: 'checkbox',
    title: '是否启用',
    default: true
};
```

另外 Press 还新增了一个切换开关形式用于布尔类型，设置 `format` 为 _toggle_ 即可。

```javascript
let schema = {
    type: 'boolean',
    format: 'toggle'
};
```

### number 和 integer

number、integer 类型都是用于输入数字值，它们的唯一区别就是一个接受数字，一个接受整数，默认控件是输入框。

另外可以通过 `maximum` 和 `minimum` 关键字限定最大最小值。

其中，integer 类型可设置 `format` 为 _range_ ，切换为滑块形式；_rating_ ，切换为打星评分形式（默认 `minimum: 1`，另外可以设置属性 exclusiveMaximum，表示可取值范围不包括最大值）。

```javascript
let schema = {
    type: 'integer',
    default: 1,
    minimum: 1,
    maximum: 1000
};
```

#### datetime

datetime 控件也支持数值类型，同 string 下同类控件相似，只是返回值为对应的时间戳。

```javascript
let schema = {
    type: 'number',
    format: 'datetime-local',
    options: {
        flatpickr: {
            ...
        }
    }
};
```

#### 结合 enum 属性

当通过 `enum` 属性提供了可选枚举值后，number 类型会被渲染为下拉选择框。假如设置 `format` 为 _radio_，就可以切换为单选框形式（推荐在可选项小于 5 个时使用）。

```javascript
let schema = {
    type: 'integer',
    enum: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
};
```

### array

array 作为 JSON 数据的重要组成类型，相应的，数组编辑区也占据了编辑器的大量篇幅（包括界面、代码等等）。
除了默认形式，另外还提供了 _table_ 和 _tabs_ 两种 format 形式来编辑数组。

-   默认: 数组元素从上到下，垂直排列分布，适合元素数量少时。
-   table: 用表格的形式展示数组元素，适合元素数量多且元素为对象且属性少的情况。
-   tabs: 用左页签来切换数据元素，永远只显示一个元素，适合元素为对象且属性多的情况。
-   tabs-top: 同上，只是改为顶页签。

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
                type: 'string',
                options: {
                    // 通过 input_width 变相实现自定义 td 的宽度
                    input_width: '60px'
                }
            },
            id: {
                type: 'string'
            }
        }
    }
};
```

array 类型提供了一个 `uniqueItems` 关键字，当为 true 时，可以避免添加重复项。Press 针对该特性做了优化，可以通过传入字符串来指定数组元素的某个属性不能重复。

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

array 类型提供了两个关键字用于限制数组的长度 `minItems` 和 `maxItems`

```javascript
let schema = {
    type: 'array',
    format: 'table',
    uniqueItems: true,
    minItems: 1,
    maxItems: 10,
    items: {
        type: 'string'
    }
};
```

#### 结合 enum 属性

同样的，通过 `enum` 属性提供了可选枚举值并同时设置 `uniqueItems` 属性后，array 类型会被渲染为多选形式。假如可选项小于 8 个时会被渲染为复选框样式，否则渲染为下拉多选样式。可以通过设置 `format` 为 _select_ 或 _checkbox_，进行显式定义。

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

上文提及的 select2 也支持多选，设置 `format` 为 _select2_，就可以启用。

```javascript
let schema = {
    type: 'array',
    format: 'select2',
    uniqueItems: true,
    items: {
        type: 'string',
        enum: ['A-Yes', 'A-Unknown', 'B-Yes', 'B-Unknown', 'C-Yes', 'C-Unknown', 'D-Yes', 'D-Unknown', 'E-Yes', 'E-Unknown']
    }
};
```

#### array 事件

编辑器针对 array 的元素常见操作（增加、删除、移动）都提供了对应的钩子函数便于做相应的处理。

```javascript
editor.on('moveRow', (editor) => {
    console.log('moveRow', editor);
});
editor.on('addRow', (editor) => {
    console.log('addRow', editor);
});
editor.on('deleteRow', (editor) => {
    console.log('deleteRow', editor);
});
editor.on('deleteAllRows', (editor) => {
    console.log('deleteAllRows', editor);
});
```

### object

object 编辑区也是编辑器的重要组成部分之一。该编辑区除了默认布局也提供了其他布局用于精简界面。它通过 `format` 关键字来设定。

-   默认: 每个子属性单独占据一行。
-   grid: 多个子属性并排在一行显示，每个子属性可以通过 _grid_columns_ 选项来设置宽度，然后 每行会尽可能占满 12 格后换行，所以该布局不能保证子属性的显示顺序和代码一致。
-   grid-strict: 同上，但是每个子属性会严格按照 _grid_columns_ 显示，不会自动扩展。同时支持通过 _grid_break_ 选项来设置手动换行。
-   categories: 通过顶页签形式对子属性进行分组，每个对象或数组属性对应一个页签（页签标题来自对象或数组的标题），剩余的其他属性为一个页签（标题默认为 Basic，可以通过 `basicCategoryTitle` 属性进行自定义）。

```javascript
let schema = {
    type: 'object',
    properties: {
        name: {type: 'string'}
    }
};
```

```javascript
let schema = {
    type: 'object',
    format: 'grid-strict',
    properties: {
        a: {
            title: 'a',
            type: 'string',
            options: {
                grid_columns: 4
            }
        },
        b: {
            title: 'b',
            type: 'string',
            options: {
                grid_columns: 4,
                grid_break: true
            }
        },
        c: {
            title: 'c',
            type: 'string',
            options: {
                grid_columns: 6
            }
        },
        d: {
            title: 'd',
            type: 'string',
            options: {
                grid_columns: 6
            }
        }
    }
};
```

```javascript
let schema = {
    type: 'object',
    format: 'categories',
    basicCategoryTitle: 'ab',
    properties: {
        a: {
            title: 'a',
            type: 'string'
        },
        b: {
            title: 'b',
            type: 'string'
        },
        location: {
            type: 'object',
            title: 'Location',
            properties: {
                city: {
                    type: 'string'
                },
                state: {
                    type: 'string'
                }
            }
        },
        people: {
            type: 'array',
            format: 'table',
            title: 'People',
            uniqueItems: true,
            items: {
                type: 'string'
            }
        }
    }
};
```

### info

info 类型提供了静态文本的展示方式，一般用于信息提示和说明。

```javascript
let schema = {
    type: 'info',
    title: 'Tips',
    description: 'It shows the available standard elements with all displayable options enabled, such as description and infoText.'
};
```

### button

button 类型提供了按钮控件形式，一般用于获取当前编辑器的值及额外操作。

启用方法：

-   首先设置 `type` 为 _button_，同时通过 `options.button` 中设置相关属性，即可启用一个按钮控件。
-   在相关属性内，使用 `action` 关键字指定一个函数用于按钮点击调用；使用 `validated` 关键字设置是否校验数据有效后才让按钮生效。
-   同时要通过 `JSONEditor.defaults.callbacks.button` 属性定义上述函数。

> 注：当为 button 时，该字段默认为 required

```javascript
let schema = {
    type: 'button',
    title: 'Click this',
    options: {
        button: {
            validated: true,
            action: 'show'
        }
    }
};

JSONEditor.defaults.callbacks.button = {
    show: function (jseditor, evt) {
        console.log('value = ', jseditor.jsoneditor.getValue());
    }
};
```

## 依赖项

在编辑 JSON 时，一个字段依赖于另外一个字段的值是很常见的情况。编辑器提供了 `dependencies` 关键字来满足这方面的需求。

`dependencies` 的值是 map 形式的键值对，用来描述要监控的字段和期望值。它的值支持三种形式：

-   单个键值对：表明依赖项的值为期望值即生效。
-   单个键值对，但是值为数组：表明依赖项的值为数组元素之一即生效。
-   多个键值对，但是值只能为基础类型，不能为数组：表明当多个依赖项都分别满足期望值时才生效。

```javascript
let schema = {
    fieldOne: {
        type: 'string',
        enum: ['foo', 'bar', 'cool'],
        default: 'foo'
    },
    fieldTwo: {
        type: 'string',
        enum: ['a', 'b', 'c'],
        default: 'a'
    },
    depender1: {
        type: 'string',
        description: 'show when fieldOne is bar',
        options: {
            dependencies: {
                fieldOne: 'bar'
            }
        }
    },
    depender2: {
        type: 'string',
        description: 'show when fieldOne is bar or cool',
        options: {
            dependencies: {
                fieldOne: ['bar', 'cool']
            }
        }
    },
    depender3: {
        type: 'string',
        description: 'show when fieldOne is bar and fieldTwo is b',
        options: {
            dependencies: {
                fieldTwo: 'b',
                fieldOne: 'bar'
            }
        }
    }
};
```

### 自定义依赖

上述规则可以满足大部分常见场景的需求，但是还不够灵活。所以编辑器还提供了一系列关键字的组合来提供更多可能。

#### 使用 watch 定义监听项

首先，使用 `watch` 关键字来定义需要监听的字段路径

```javascript
let schema = {
    first_name: {
        type: 'string'
    },
    last_name: {
        type: 'string'
    },
    full_name: {
        type: 'string',
        watch: {
            fname: 'first_name',
            lname: 'last_name'
        }
    }
};
```

上述例子中的 `fname` 是待监听字段的化名，`first_name` 是字段的路径，使用 `.` 号分割嵌套属性，默认从根路径算起。可以使用 `id` 关键字指定相对节点，然后就可以使用相对路径了。这个在数组内描述路径时十分有用。

```javascript
let schema = {
    type: 'array',
    items: {
        type: 'object',
        id: 'arr_item',
        properties: {
            first_name: {
                type: 'string'
            },
            last_name: {
                type: 'string'
            },
            full_name: {
                type: 'string',
                watch: {
                    fname: 'arr_item.first_name',
                    lname: 'arr_item.last_name'
                }
            }
        }
    }
};
```

上述例子中的 `arr_item` 是定义的相对节点，然后数组每个项下的 `full_name` 都能观测到同级的 `first_name` 和 `last_name` 属性值。

#### 使用 template 实现渲染

其次，使用 `template` 关键字定义用于渲染变量和结果的模板字符串。Press 除了支持默认引擎外，还引入了第三方支持（nunjucks）。

引入第三方模板配置支持两种方式：

-   全局默认值形式

`JSONEditor.defaults.options.template = "nunjucks"`

-   实例化传参形式

```javascript
const editor = new JSONEditor(element, {
    //...
    template: 'nunjucks'
});
```

上个例子使用默认模板渲染如下：

```javascript
let schema = {
    first_name: {
        type: 'string'
    },
    last_name: {
        type: 'string'
    },
    full_name: {
        type: 'string',
        template: '{{fname}} {{lname}}',
        watch: {
            fname: 'first_name',
            lname: 'last_name'
        }
    }
};
```

`template` 关键字除了定义为模板字符串，也支持指定为一个回调函数。然后通过 `JSONEditor.defaults.callbacks.template` 属性定义该回调函数，可访问参数就是 `watch` 定义的监听项。

```javascript
let schema = {
    first_name: {
        type: 'string'
    },
    last_name: {
        type: 'string'
    },
    full_name: {
        type: 'string',
        template: 'watchCallback',
        watch: {
            fname: 'first_name',
            lname: 'last_name'
        }
    }
};

JSONEditor.defaults.callbacks.template = {
    watchCallback: function (jseditor, evt) {
        return evt.fname + ':' + evt.lname;
    }
};
```

### enum 依赖

另外一个常见的依赖场景就是下拉选择框的枚举值依赖于其他字段。这种需求也需要 `watch` 关键字并配合 `enumSource` 关键字来实现。

```javascript
let schema = {
    possible_colors: {
        type: 'array',
        items: {
            type: 'string'
        }
    },
    primary_color: {
        type: 'string',
        watch: {
            colors: 'possible_colors'
        },
        enumSource: 'colors'
    }
};
```

上述 `enumSource` 仅仅简单定义了枚举数据的来源，是最基础的用法。它也支持定义为更加复杂的形式以支持筛选、多个来源、内置常量等等需求。

```javascript
let schema = {
    possible_colors: {
        type: 'array',
        items: {
            type: 'string'
        }
    },
    primary_color: {
        type: 'string',
        watch: {
            colors: 'possible_colors'
        },
        enumSource: [
            // 前置常量
            ['none'],
            {
                // 监听来源
                source: 'colors',
                // 定义枚举项的显示文本
                title: '{{item|title}}',
                // 定义枚举项的值
                value: '{{item|trim}}',
                // 可以定义数组子集，相当于 arr.slice
                slice: [2, 5],
                // 过滤特殊值，返回常量表示不渲染
                filter: "{% if item !== 'black' %}1{% endif %}"
            },
            // 后置常量
            ['transparent']
        ]
    }
};
```

上述是个更复杂的例子，它使用了 `nunjucks` 作为模板引擎以支持高级语法表达式。
