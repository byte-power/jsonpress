# 集成指南

该指南面向打算把 JSON Press 集成到自身 Web 产品并在此基础上进行封装，并预设配置和样式的开发者。

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
| show_opt_in                   | 是否将非 required 的字段设置为可选项（加入切换开关来决定该值是否包含到编辑器的值内）                    | false         | √    |      |
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
| \*control_size                | 设置编辑器输入框宽度为预设尺寸，支持 'small'、'middle'                            |               | √    |      |
| \*inline                      | 设置输入框和其关联 label 为行内模式                                               | false         | √    |      |

> \*号为 Press 新增属性

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
    // errors 是一个对象组成的数组，对象包含 path、property、message 三种属性
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

// 从 DOM 树移除当前编辑器
editor.destroy();
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

## 基础数据类型的全局函数定义

### upload

对于 upload 的 `upload_handler` 属性可以设置为字符串值，表示函数名称，然后通过 `JSONEditor.defaults.callbacks.upload` 属性进行全局函数定义，不过要注意的时，全局函数的参数比直接定义函数在最前面多一个参数 jseditor，指向当前节点

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
    uploadHandler: function (jseditor, path, file, callback) {
        if (path === 'root.uploadfail') {
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

### autocomplete

对于 autocomplete 的 `search、renderResult、getResultValue` 属性可以设置为字符串值，表示函数名称，然后通过 `JSONEditor.defaults.callbacks.autocomplete` 属性进行全局函数定义，不过要注意的时，全局函数的参数比直接定义函数在最前面多一个参数 jseditor，指向当前节点

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
    getResultValue_wikipedia: function (jseditor, result) {
        return result.title;
    }
};
```

### button

对于 button 的 `action` 属性可以设置为字符串值，表示函数名称，然后通过 `JSONEditor.defaults.callbacks.button` 属性进行全局函数定义，不过要注意的时，全局函数的参数比直接定义函数在最前面多一个参数 jseditor，指向当前节点。

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

### 自定义依赖

#### template

在使用 `template` 实现自定义渲染时，它可以设置为字符串值，表示函数名称，然后通过 `JSONEditor.defaults.callbacks.template` 属性进行全局函数定义，不过要注意的时，全局函数的参数比直接定义函数在最前面多一个参数 jseditor，指向当前节点。

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
    watchCallback: function (jseditor, target) {
        return target.fname + ':' + target.lname;
    }
};
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
