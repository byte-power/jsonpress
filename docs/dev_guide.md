# JSON Press 开发指南

该指南面向需要阅读、定制、修复或继续增强 JSON Press 的开发者。

JSON Press 是 [json-editor/json-editor](https://github.com/json-editor/json-editor) 的 fork。仓库当前重点是在上游能力之上补齐 Press 自身业务增强、样式体系和兼容性修复。

## 1. 仓库结构

```text
├── build
│   └── CssToJson.js              把 css/less 转换为可由 JS 引入的样式模块
├── config                        webpack、karma、codeceptjs 等工程配置
├── docs                          集成与开发文档
├── examples                      独立 HTML 使用示例
├── playground                    演练场和示例 schema
├── src
│   ├── editors                   各类型/format 编辑器实现
│   │   └── array                 array select2/selectize/choices 子编辑器
│   ├── iconlibs                  图标库适配：bootstrap3、fontawesome5
│   ├── templates                 模板引擎：default、lodash、nunjucks、swig
│   ├── themes                    主题：html、bootstrap3、tailwind
│   ├── validators                format 级校验器：date、ip 等
│   ├── core.js                   JSONEditor 入口，负责初始化、schema 加载、根编辑器创建、事件和 API
│   ├── defaults.js               默认配置、语言、注册表和默认回调
│   ├── editor.js                 AbstractEditor 基类，处理路径、依赖、启停、通用生命周期
│   ├── resolvers.js              schema 到 editor 类型的解析链
│   ├── schemaloader.js           $ref、definitions、外部 schema 加载与展开
│   ├── theme.js                  AbstractTheme 基类
│   ├── iconlib.js                AbstractIconLib 基类
│   ├── utilities.js              路径、模板、DOM、类型等工具方法
│   ├── validator.js              JSON Schema 校验主逻辑
│   └── style.less                基础样式源文件
├── tests
│   ├── codeceptjs                浏览器端集成测试
│   ├── fixtures                  测试 schema 和数据
│   ├── pages                     CodeceptJS 测试页面
│   └── unit                      Karma/Jasmine 单元测试
├── CHANGELOG.md                  版本说明
├── package.json                  npm 包配置和脚本
└── README.md                     面向 schema 编写者的完整使用说明
```

> 当前仓库没有把 `dist` 列入源码文件清单；本地构建会生成发布产物。

## 2. 核心执行流程

一次 `new JSONEditor(element, options)` 的主要流程在 `src/core.js`：

1. 合并 `JSONEditor.defaults.options` 与实例 `options`。
2. 初始化 theme、iconlib，并注入基础样式与主题样式。
3. 使用 `SchemaLoader` 展开 schema、加载 `$ref`、处理 `definitions`。
4. 创建 `Validator`。
5. 通过 `getEditorClass(schema)` 调用 `src/resolvers.js` 中的解析链，选择根 editor。
6. 执行根 editor 生命周期：`preBuild()`、`build()`、`postBuild()`。
7. 如存在 `startval`，调用根 editor 的 `setValue()`。
8. 初始校验，异步触发 `ready` 和 `change`。

编辑器节点都继承自 `AbstractEditor`，核心职责包括：

- 维护 `path`，例如 `root.user.name`。
- 合并 schema 局部 `options`。
- 注册/注销当前 editor。
- 处理 `watch` 通知和父子级 `onChange` 冒泡。
- 根据 `options.dependencies` 判断字段显示状态。
- 提供 `activate()` / `deactivate()`、`enable()` / `disable()` 等通用行为。

## 3. editor 解析链

`src/resolvers.js` 的顺序很关键：前面的 resolver 优先命中。

当前主要解析关系：

| schema 特征                                                                     | editor                                                            |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `type: 'string'` + `format: 'signature'`                                        | `signature`                                                       |
| `type: 'string'` + `media.binaryEncoding: 'base64'`                             | `base64`                                                          |
| `type: 'string'` + `format: 'url'` / `format: 'fileContent'` + `options.upload` | `upload`                                                          |
| `type: 'array'` + `format: 'table'`                                             | `table`                                                           |
| `enumSource`                                                                    | `select` / `radio` / `select2` / `selectize` / `choices`          |
| `enum`                                                                          | `select` / `radio` / `select2` / `selectize` / `choices` / `enum` |
| `type: 'array'` + `items.enum` + `uniqueItems`                                  | `multiselect`，但 `format: 'table'` 会保留 `table`                |
| `oneOf` / `anyOf` / `type: 'any'` / `type` 为数组                               | `multiple`                                                        |
| `format: 'date'` / `format: 'time'` / `format: 'datetime-local'`                | `datetime`                                                        |
| `format: 'starrating'` / `format: 'rating'`                                     | `starrating`                                                      |
| `links[].rel: 'describedby'`                                                    | `describedBy`                                                     |
| `format: 'stepper'`                                                             | `stepper`                                                         |
| `format: 'button'`                                                              | `button`                                                          |
| `format: 'info'`                                                                | `info`                                                            |
| `format: 'uuid'`                                                                | `uuid`                                                            |
| `format: 'autocomplete'`                                                        | `autocomplete`                                                    |
| `format: 'jodit'`                                                               | `jodit`                                                           |
| `format: 'markdown'`                                                            | `simplemde`                                                       |
| `format: 'xhtml'` / `format: 'bbcode'`                                          | `sceditor`                                                        |
| Ace mode 名称，如 `json`、`javascript`、`css`                                   | `ace`                                                             |
| `format: 'ip'` / `format: 'ipv4'` / `format: 'ipv6'` / `format: 'hostname'`     | `ip`                                                              |
| `format: 'color'`                                                               | `colorpicker`                                                     |
| `format: 'multiline'`                                                           | `multiline`                                                       |
| `type: 'boolean'`                                                               | `checkbox` / `select` / `select2` / `selectize` / `choices`       |
| 基础 `type`                                                                     | 对应 primitive editor                                             |

新增 editor 或修改命中条件时，要特别注意 resolver 顺序。例如当前版本修复了 `array + format: table + items.enum` 被后续 `arraysOfStrings` 误判为 `multiselect` 的问题。

## 4. Press 近期特性与代码位置

### anyOf / oneOf 联动增强

主要文件：

- `src/editors/multiple.js`
- `src/editor.js`
- `src/validator.js`

当前行为：

- `multiple` 统一处理 `oneOf`、`anyOf` 和 union type。
- anyOf 子项如果都有 `options.dependencies`，会隐藏原生 switcher，依赖字段变化时自动切换子编辑器。
- `options.showHeader` 可让 anyOf 子项保留标题区，解决 `infoText` 等标题区内容被隐藏的问题。
- anyOf 校验在依赖联动场景下优先校验当前激活项。

### dependencies 增强

主要文件：

- `src/editor.js`
- `src/validator.js`

当前行为：

- 多个依赖条件按 `and` 逻辑判断。
- 支持常量、数组候选、对象匹配、布尔条件。
- Press 扩展支持 `{has: value}`，用于数组字段包含某值。
- Press 扩展支持 `{not: value}` 和 `{not: [value1, value2]}`。
- 依赖未满足时隐藏字段，并避免隐藏 required 字段继续触发必填校验。

### infoText 增强

主要文件：

- `src/theme.js`
- `src/themes/bootstrap3.js`
- `src/themes/tailwind.js`
- 各 editor 的 `build()` / `postBuild()`

当前行为：

- 多数编辑器支持 `options.infoText`。
- 支持 `\n` 换行。
- 支持对象形式传入 url，用于点击提示入口打开指定网页。
- toggle checkbox 已支持 `options.infoText`。
- object、array、table、select、radio、multiselect 等复杂编辑器已有对应布局处理。

### enumSource 增强

主要文件：

- `src/editors/select.js`
- `src/validator.js`

当前行为：

- `enumSource` 可是字符串、数组或复杂对象。
- `source` 支持 watch 来源或静态数组。
- `title`、`value`、`filter` 支持模板表达式或回调函数。
- `sourceFormat` 可先加工 source 数据。
- `sort` 支持 `asc` / `desc`。
- `options.auto_refresh` 用于动态刷新候选项并参与保存校验。
- `options.clear_value` 用于候选项变化且当前值失效时清空。
- `isCustomEnum` 可跳过 enum 校验，适配 select2/selectize 自定义候选项。

### relativeTo 联动校验

主要文件：

- `src/validator.js`
- `src/utilities.js`

当前行为：

- date、number 等字段可通过 `relativeTo` 与其他字段做大小关系校验。
- 当前版本增强了健壮性：`relativeTo` 配置错误或目标 editor 不存在时，不会影响整体渲染。

### array / tabs 增强

主要文件：

- `src/editors/array.js`
- `src/editors/table.js`
- `src/themes/bootstrap3.js`
- `src/themes/bootstrap3.less`

当前行为：

- `options.tabCollapsed`：tabs 导航可折叠。
- `options.tabWide`：tabs 导航宽屏模式。
- `options.reversed`：倒序渲染和操作数组项。注意源码读取的是 `reversed`，不是 `reverse`。
- copy/move 时会以完整值读取，避免 `options.exclude` 字段被提前剔除导致复制/移动值不完整。
- `empty(hard)` 会清理超出长度的 `row_cache`，减少反复增删行时的内存残留。

### upload / fileContent

主要文件：

- `src/editors/upload.js`
- `src/resolvers.js`
- `src/validator.js`

当前行为：

- `format: 'url'` 或 `format: 'fileContent'` 且配置 `options.upload` 时启用 upload editor。
- `fileContent` 会读取上传文件文本内容作为字段值。
- 空字符串的 `fileContent` 会按未定义值处理，便于必填校验。

### 其他组件级增强（来自 CHANGELOG）

这些能力分散在较早版本中，但当前代码仍有保留，维护时也需要一起考虑：

| 能力                                        | 主要文件                                                                | 说明                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `format: 'multiline'`                       | `src/editors/multiline.js`、`src/validator.js`、`src/utilities.js`      | textarea 多行录入数组，`options.multiType` 支持 string/number/boolean          |
| `items.readOnly`                            | `src/editors/array.js`、`src/editors/table.js`、`src/editors/object.js` | array/table 子项只读，支持布尔或函数；`options.ignore = 'readOnly'` 可跳过禁用 |
| `compareThanPrev`                           | `src/validator.js`                                                      | array 子项与前一项按指定字段比较大小                                           |
| `exclusive`                                 | `src/validator.js`                                                      | array 子项互斥选择校验                                                         |
| `uniqueItems` 增强                          | `src/validator.js`、`src/utilities.js`                                  | 支持按嵌套属性和数组内字段展开去重                                             |
| `patternValidate`                           | `src/validator.js`                                                      | 条件化启用 string `pattern` 校验                                               |
| `newOnly`                                   | `src/editors/string.js`                                                 | string 字段有值后只读，只允许新建时编辑                                        |
| `description` 换行 / `options.warning`      | `src/theme.js`、`src/themes/bootstrap3.js`                              | description 支持 `\n` 和警示样式                                               |
| `table.options.className`                   | `src/editors/table.js`                                                  | 为 table 添加业务样式类                                                        |
| `array.options.nocache`                     | `src/editors/array.js`                                                  | 禁用行编辑器缓存，避免旧实例状态复用                                           |
| `select.format: 'tabs'`                     | `src/editors/select.js`                                                 | 枚举选择以标签形式展示                                                         |
| `select2.relativeToParent`                  | `src/editors/array/select2.js`                                          | 修正业务弹窗内 select2 下拉层级/挂载问题                                       |
| `options.hideOneOfValidate`                 | `src/validator.js`                                                      | oneOf 校验失败时不展示笼统总提示                                               |
| `options.transform_json`                    | `src/editors/object.js`                                                 | Edit JSON 保存前转换 JSON                                                      |
| `options.show_save_btn`                     | `src/editors/object.js`                                                 | 控制 Edit JSON 对话框保存按钮                                                  |
| range `step`                                | `src/editors/number.js`、`src/editors/integer.js`                       | number/integer 写入原生 `step`、`min`、`max`                                   |
| `format: 'rating'` / `format: 'starrating'` | `src/editors/starrating.js`                                             | 打星组件，支持 `exclusiveMaximum` 影响最大可选值                               |
| `format: 'signature'`                       | `src/editors/signature.js`                                              | 签名画布，维护时关注 clear、onEnd、readOnly 和 dataURL 同步                    |
| date/time/datetime-local                    | `src/editors/datetime.js`、`src/validators/date-validator.js`           | 支持 string/integer 与 flatpickr 配置                                          |

## 5. 近期同步上游修复

`1.2.2-beta.7` 的主要修复点：

- array：修复 `empty(hard)` 未清理多余 `row_cache` 导致旧行 editor 残留的问题。
- object：修复属性面板外部点击关闭时，事件监听器 bind 引用不一致导致 `removeEventListener` 不生效的问题。
- string：修复 template 联动计算值时额外冒泡触发 `onChange`，可能造成死循环或多余渲染的问题。
- radio：强制同步 DOM `checked` 状态，避免多个选项同时显示为选中。
- array/table：修复 `items.enum` + `format: 'table'` 被误判为 multiselect 的问题。

这些修复大多不改变 schema 写法，但会改变一些边缘场景的事件触发次数、DOM 状态和内存表现。涉及回归测试时优先覆盖对应 editor。

## 6. 本地开发

安装依赖：

```bash
npm install
```

开发构建：

```bash
npm run build:dev
```

生产构建：

```bash
npm run build
```

监听 JS：

```bash
npm run watch
```

监听样式：

```bash
npm run watch:css
```

启动 webpack dev server：

```bash
npm run debug
```

格式化：

```bash
npm run format
```

ESLint：

```bash
npm run eslint
npm run eslint.fix
```

## 7. 测试

单元测试：

```bash
npm run test-headless
```

调试模式：

```bash
npm run test
```

CodeceptJS 页面测试需要先提供测试页面服务：

```bash
npm run serve-test
npm run cp:test
```

完整 CodeceptJS：

```bash
npm run cp:fulltest
```

Docker 测试：

```bash
npm run docker-test
```

建议按修改类型选择测试：

- resolver 或 editor 命中逻辑：补 `tests/unit`，并增加对应 `tests/pages`/`tests/codeceptjs` 场景。
- DOM 交互、按钮、折叠、排序、弹层：优先补 CodeceptJS。
- validator、SchemaLoader、工具函数：优先补 unit。
- 样式和主题：至少覆盖 html/bootstrap3/tailwind 中受影响主题，必要时补 `tests/pages/themes.html`。

## 8. 添加或修改 editor 的建议流程

1. 在 `src/editors` 中新增或修改 editor。
2. 如是新 editor，在 `src/editors/index.js` 注册。
3. 在 `src/resolvers.js` 增加命中规则，并确认顺序不会抢占已有类型。
4. 如果有局部 options，补充默认处理和文档说明。
5. 如果有校验规则，更新 `src/validator.js` 或 `src/validators`。
6. 如果依赖主题 DOM，检查 `src/theme.js` 和各主题实现。
7. 添加 playground/example 或 tests page，便于人工验证。
8. 添加 unit 或 CodeceptJS 测试。
9. 更新 `README.md`、`docs/integration_guide.md` 或 `CHANGELOG.md`。

## 9. 修改依赖联动时的注意事项

依赖联动会同时影响：

- 字段显示/隐藏：`AbstractEditor.evaluateDependencies()`。
- 值变化通知：`notify()`、`watch()`、`onChange()`。
- required 校验：隐藏字段不应继续报必填错误。
- anyOf 激活项切换：`MultipleEditor.switchEditor()`。
- enumSource 候选刷新：`SelectEditor.onWatchedFieldChange()`。

这类修改最容易出现“界面看起来对，但保存值或校验不对”的问题。建议至少验证：

- 依赖字段从满足变为不满足。
- 依赖字段从不满足变为满足。
- 被隐藏字段是否还进入 `getValue()`。
- required 字段隐藏后是否还报错。
- anyOf 子项切换后当前值和错误提示是否对应当前激活项。

## 10. 发布流程

当前 `package.json` 中的发布脚本：

```bash
npm run push
```

用于 beta 版本，执行 `npm version prerelease --preid beta --no-git-tag-version`。

```bash
npm run pub
```

用于正式版本，执行 `npm version minor`。

`postversion` 当前会执行：

```bash
git push && git push --tags && npm publish ./ --tag beta --access public
```

正式发布前需要确认是否仍应使用 `--tag beta`。仓库脚本里已经有提醒：正式版本发布时要移除或调整 beta tag。

## 11. 文档维护约定

- `README.md`：面向 schema 编写者，保留完整使用示例。
- `docs/integration_guide.md`：面向接入方，强调初始化、配置、API、集成注意事项。
- `docs/dev_guide.md`：面向维护者，强调代码结构、执行流程、测试与发布。
- `CHANGELOG.md`：按版本记录对外可感知变化，尤其是 schema 写法、事件行为、校验行为和兼容性修复。

如果发现变更说明和源码不一致，以源码为准，并在文档中明确提醒。例如 array 倒序配置当前实现使用 `options.reversed`。
