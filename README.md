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

更多关于集成方面的说明，请查看 [集成指南](./docs/integration.guide.md)

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

本地自定义类型主要是通过定义在根节点的 `definitions` 关键字来生成。它的描述路径格式为 `#/definitions/xxx`，xxx 为定义的名字。其定义的内容除了被 `$ref` 索引，也可以被后文提到的 `anyOf`、`oneOf` 和 `allOf` 来使用。

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
-   button

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
            <td>button</td>
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

> description 说明支持用 \n 来实现换行；支持传入 options.warning 来开启警示颜色。这是 Press 新增特性。

```javascript
description: 'the first line \n the second line',
options: {
    warning：true
}
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

Press 引入了一项自定义校验功能，可以支持指定某项时间必须大于或小于另外一项时间，在设置起始时间的场景下比较有用。通过 `relativeTo.path` 可以指定当前项的对比目标对象的路径，通过 `relativeTo.limit` 设置当前项相对于对比目标的规则，'less' 表明小于目标对象，'greater' 表明大于目标对象。

```javascript
let schema = {
    valid_date_start: {
        type: 'integer',
        format: 'datetime-local',
        relativeTo: {
            path: 'root.valid_date_end',
            limit: 'less'
        }
    },
    valid_date_end: {
        type: 'integer',
        format: 'datetime-local',
        relativeTo: {
            path: 'root.valid_date_start',
            limit: 'greater'
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
        let url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + encodeURI(input);

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

另外 Press 还新增了一个开关切换形式用于布尔类型，设置 `format` 为 _toggle_ 即可。

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

#### 结合 enum 属性

当通过 `enum` 属性提供了可选枚举值后，number 类型会被渲染为下拉选择框。假如设置 `format` 为 _radio_，就可以切换为单选框形式（推荐在可选项小于 5 个时使用）。

```javascript
let schema = {
    type: 'integer',
    enum: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012]
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
        enum: ['A-Yes', 'A-Unknown', 'B-Yes', 'B-Unknown', 'C-Yes', 'C-Unknown']
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
        enum: ['A-Yes', 'A-Unknown', 'B-Yes', 'B-Unknown', 'C-Yes', 'C-Unknown']
    }
};
```

#### array 事件

编辑器针对 array 的元素常见操作（增加、删除、移动）都提供了对应的钩子函数便于做相应的处理。

```javascript
editor.on('moveRow', editor => {
    console.log('moveRow', editor);
});
editor.on('addRow', editor => {
    console.log('addRow', editor);
});
editor.on('deleteRow', editor => {
    console.log('deleteRow', editor);
});
editor.on('deleteAllRows', editor => {
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
    description: 'It shows the available standard elements with all displayable options enabled'
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

## anyOf、oneOf、allOf 和 not

编辑器支持使用 anyOf、oneOf 和 allOf 关键字来描述复杂的 schema 校验规则和机制。

-   anyOf: 满足任意一个子 schema
-   oneOf: 满足且仅满足一个子 schema
-   allOf: 满足所有子 schema
-   not: 不满足 schema

```javascript
let schema = {
    any: {
        anyOf: [
            {
                type: 'string',
                maxLength: 5
            },
            {
                type: 'number',
                minimum: 10
            }
        ]
    },
    all: {
        allOf: [
            {
                type: 'string'
            },
            {
                maxLength: 5
            }
        ]
    },
    one: {
        // 可以为 5 或 3，不能为 15
        oneOf: [
            {
                type: 'number',
                multipleOf: 5
            },
            {
                type: 'number',
                multipleOf: 3
            }
        ]
    },
    // 不能为数字
    not: {
        type: 'number'
    },
    // 不能为枚举项任意一个值
    not: {
        enum: ['default', 'origin']
    }
};
```

any 字段可以选择任一条件进行满足，没有通过即报错；all 字段必须满足所有条件，没有选择界面；one 字段只能优先选择一个条件，无论有没有通过，继续以当前值来验证后续条件，假如最后满足的条件项不等于 1，则报错。

`anyOf` 可以支持更复杂应用场景，比如一个字段支持多种格式的输入，可以使用它结合 `definitions` 属性来实现。

```javascript
let schema = {
    definitions: {
        base64: {
            type: 'object',
            title: 'base64 decode',
            properties: {
                base64: {
                    type: 'string',
                    default: 'standard',
                    readOnly: true
                }
            }
        },
        encrypt_var: {
            type: 'object',
            title: 'defined encrypt variable',
            properties: {
                encrypt_name: {
                    type: 'string',
                    enum: ['aes', 'tkip', 'psk']
                }
            },
            required: ['encrypt_name']
        },
        encrypt: {
            type: 'object',
            title: 'encrypt method',
            properties: {
                type: {
                    type: 'string',
                    enum: ['aes', 'tkip', 'psk']
                },
                key: {
                    type: 'string'
                }
            },
            required: ['type', 'key']
        }
    },
    type: 'object',
    properties: {
        any: {
            anyOf: [
                {
                    $ref: '#/definitions/base64'
                },
                {
                    $ref: '#/definitions/encrypt_var'
                },
                {
                    $ref: '#/definitions/encrypt'
                }
            ]
        }
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

第三方模板可以自定义其实现方法：

```javascript
const myEngine = {
    // 渲染引擎必须包含 compile 方法，并返回一个渲染函数
    compile(template) {
        return view => {
            // 实现 render 方法来渲染模板，需要结合传入的数据 view
            let render = function () {};
            const result = render(template, view);
            return result;
        };
    }
};
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

另外一个常见的依赖场景就是下拉选择框的枚举值依赖于其他字段。这种需求也需要 `watch` 关键字并配合 `enumSource` 关键字来实现。它支持定义为字符串值或数组。

#### 基础用法

定义为字符串时，表明为枚举数据的来源，该值来自于 `watch` 中的监听字段的化名。

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

#### 高级用法

`enumSource` 关键字也支持定义为更加复杂的数组形式以支持筛选、多个来源、内置常量等等需求。下面为示例，它使用了 `nunjucks` 作为模板引擎以支持高级语法表达式。

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
                // 过滤特殊值，返回常量表示不渲染（需要引入第三方模板引擎支持）
                // 也可以直接定义回调函数以避免引入模板引擎，见 [回调函数] 部分
                filter: "{% if item !== 'black' %}1{% endif %}"
            },
            // 后置常量
            ['transparent']
        ]
    }
};
```

`enumSource.source` 也可以定义为静态列表，使用的语法稍有不同。

```javascript
let schema = {
    enumSource: [
        {
            source: [
                {
                    value: 1,
                    title: 'One'
                },
                {
                    value: 2,
                    title: 'Two'
                }
            ],
            title: '{{item.title}}',
            value: '{{item.value}}'
        }
    ]
};
```

除了监听简单的字符串数组外，也可以监听对象数组，只是解析值的时候表达式有所不同。

```javascript
let schema = {
    possible_colors: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                text: {
                    type: 'string'
                }
            }
        }
    },
    primary_color: {
        type: 'string',
        watch: {
            colors: 'possible_colors'
        },
        enumSource: [
            {
                source: 'colors',
                title: '{{item.text}}',
                value: '{{item.id}}'
            }
        ]
    }
};
```

所有支持使用自定义表达式的地方，都会包括两个属性 `item` 和 `i`，表示数组的元素和它们的索引（以 0 开始）。

#### 回调函数

对于 `enumSource` 的 _title、value、filter_ 等属性，也支持使用回调函数来处理渲染数据，以代替模板表达式。

```javascript
let schema = {
    possible_colors: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                text: {
                    type: 'string'
                }
            }
        }
    },
    primary_color: {
        type: 'string',
        watch: {
            colors: 'possible_colors'
        },
        enumSource: [
            {
                source: 'colors',
                title: 'enumTitleCB',
                value: 'enumValueCB',
                filter: 'enumFilterCB'
            }
        ]
    }
};

JSONEditor.defaults.callbacks.template = {
    enumTitleCB: (jseditor, evt) => evt.item.text.toUpperCase(),
    enumValueCB: (jseditor, evt) => evt.item.text.toLowerCase(),
    enumFilterCB: (jseditor, evt) => {
        if (evt.item.text.toLowerCase() == 'red') {
            return '';
        }
        return evt.item.text;
    }
};
```

#### 排序

候选项支持按排序，只要设置 `enumSource.sort` 属性设置为 _asc_ 或 _desc_ 即可。

### 动态标题

schema 的 `title` 关键字用于在编辑界面向用户展示友好易于理解的标题。有时候，实现标题依赖其他字段而动态改变，对用户很有用。

对于常见的数组元素，默认其标题是 `item 1` 等等以此类推，即使定义了 `title = child` 的情况下，也仅仅是 `child 1` 等等。而使用了动态标题后，就可以向用户展示该元素下的一些复合信息，方便用户理解。

编辑器提供了 `headerTemplate` 关键字来实现，它提供了三个属性用于模板表达式：`self` 表示数组元素自身、`i0` 表示以 0 起始索引、 `i1` 表示以 1 起始索引。

```javascript
let schema = {
    type: 'array',
    title: 'Children',
    items: {
        type: 'object',
        title: 'Child',
        headerTemplate: '{{ i1 }} - {{ self.name }} (age {{ self.age }})',
        properties: {
            name: {type: 'string'},
            age: {type: 'integer'}
        }
    }
};
```

## 自定义校验

编辑器对于校验引擎提供了一个钩子函数，可以方便进行自定义规则的即校验。

例如，可以对所有 `format` 为 _date_ 的数据都要求符合 `YYYY-MM-DD` 格式。

```javascript
JSONEditor.defaults.custom_validators.push((schema, value, path) => {
    const errors = [];
    if (schema.format === 'date') {
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
            // 错误对象必须包含 path、property、message 三种属性
            errors.push({
                path: path,
                property: 'format',
                message: 'Dates must be in the format "YYYY-MM-DD"'
            });
        }
    }
    return errors;
});
```

## 覆盖默认方法

编辑器提供了两种方式可以覆盖原有的方法。

### 通过构造类原型

```javascript
JSONEditor.defaults.editors.integer.prototype.sanitize = function (value) {
    return value;
};
```

### 通过路径获取的节点

```javascript
var path = 'root.integerfield';
editor.getEditor(path).sanitize = function (value) {
    return value;
};
```
