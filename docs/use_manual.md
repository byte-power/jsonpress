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
