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

| 选项                          | 描述                                                          | 默认值 | 全局 |
| ----------------------------- | ------------------------------------------------------------- | ------ | ---- |
| ajax                          | Press 是否通过 ajax 加载 $ref 字段所设置的外部 Schema 文件    | false  | 是   |
| compact                       | 是否显示当前项的 label                                        | false  | 否   |
| disable_array_add             | 是否禁用 array 类型的 `add row` 按钮                          | false  | 是   |
| disable_array_delete          | 是否禁用 array 类型的 `delete row` 按钮                       | false  | 是   |
| disable_array_delete_all_rows | 是否禁用 array 类型的 `delete all rows` 按钮                  | false  | 是   |
| disable_array_delete_last_row | 是否禁用 array 类型的 `delete last row` 按钮                  | false  | 是   |
| disable_array_reorder         | 是否禁用 array 类型每个子项下的 `move up` 和 `move down` 按钮 | false  | 是   |
| enable_array_copy             | 是否显示 array 类型每个子项下的 `copy` 按钮                   | false  | 是   |
| disable_collapse              | 是否禁用 object 和 array 类型的 `collapse` 按钮               | false  | 是   |
| disable_edit_json             | 是否禁用 object 类型的 `Edit JSON` 按钮                       | false  | 是   |

> 注：非全局配置是通过当前项来添加，如下例：

```javascript
options: {
    compact: true;
}
```
