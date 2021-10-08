# 版本说明

## [1.0.21] - 2021-10-x

### Added

- required 属性的增强修正功能（使用 dependencies 设置的字段，当隐藏时，不校验其 required 属性）
- exclusive 属性用于指定互斥项（表明 exclusive 内的值只能选择其一）

### Fixed

- 修复 toggle 类型在 table 单元格内显示异常的 bug

## [1.0.20] - 2021-08-31

### Added

- array 类型的增强功能（支持用 compareThanPrev 属性来定义指定值和同级相邻节点的关系限制）

## [1.0.19] - 2021-08-27

### Added

- array 类型的 uniqueItems 增强功能（支持用 a.b 的形式来检测嵌套属性的重复项）
- date 自定义校验增强功能（path 字段支持通过数组元素 id 定义的相对路径）

### Changed

- UUID 变为大写

### Fixed

- 修复实现“当 anyOf 是联动关系时，仅校验当前激活项，而非所有”功能时因为 $ref 引用导致判断失误的 bug

## [1.0.18] - 2021-08-25

### Added

- 普通 number 类型也支持 relativeTo 联动校验功能（原始只支持 date ）

### Changed

- 当 anyOf 内元素有联动关系时，仅按当前激活项的规则进行校验，而非按 anyOf 的规则校验所有

### Fixed

- 修复 date 自定义校验功能功能中因为其他类型也使用了 relativeTo 字段造成误判的 bug

## [1.0.17] - 2021-08-23

### Fixed

- 修复当没有非必填项的数据时，该项不会渲染的 bug
- anyOf 下的元素为 array 类型时，不隐藏其标题区，避免误隐藏操作按钮

## [1.0.16] - 2021-07-20

### Added

- 增强 dependencies 和 anyOf 的联动功能:
  - 针对 anyOf 下所有元素都有依赖项的情况下，初始化时不修改 type 为 the best match schema，避免联动的输入控件不能正确渲染为对应的项和值

## [1.0.15] - 2021-07-16

### Added

- 增强 dependencies 和 anyOf 的联动功能:
  - 针对 anyOf 下所有元素都有依赖项的情况下，隐藏原生切换控件，通过切换 dependencies 项来实现切换（同时隐藏 anyOf 标题）
  - 实现切换 dependencies 项时，同时重置联动项的值
  - 统一初始化 anyOf 的项，避免切换时无初始项无法渲染
- 对于没有内容的 label 标签，改变其 display 属性，变相隐藏(避免空白区域)

### Fixed

- 修复 uniqueItems 设置为 false 时还执行校验的 bug

## [1.0.14] - 2021-06-18

### Added

- description 说明支持用 \n 来换行
- 当根元素为字符串时，label 也渲染为大标题
- ace 编辑器样式调整

### Fixed

- 修复 array_controls_top 选项打开时，某些按钮找不到 this.title 报错的情况
- 修复 array_controls_top 选项打开时，折叠时会把新增按钮也隐藏的 bug
- 修复 description 说明的样式名赋值错误的 bug

## [1.0.13] - 2021-05-25

### Added

- description 说明支持传入 options.warning 来开启警示颜色

### Fixed

- 修复 signature 类型的 bug（onEnd 事件定义的 function 内 this 指向错误;clear 时没有清除 data 值）
- 修复 dependencies 属性设置为数组时，不生效的 bug
- 修复 nunjucks 模板引擎渲染方法

## [1.0.12] - 2021-05-14

### Added

- 添加 date 自定义校验功能（可以约定起、始时间必须前者小于后者）

## [1.0.11] - 2021-05-13

### Fixed

- 修复 safari 下不能对日期字符串进行正确构造造成 date 控件校验失败的 bug

## [1.0.10] - 2021-05-10

### Fixed

- 修复 SimpleMDE 不能正确初始化空字符串值的 bug

## [1.0.9] - 2021-05-08

### Fixed

- 修复日期控件图标因为有前后相邻元素造成错位的 bug
- 修复日期控件使用数值类型时设置为 0 以清空显示时无效的 bug
- 修复同步主仓库后带来的一些冗余代码和 bug
- 修复文档迁移后图片路径的问题

## [1.0.8] - 2021-04-27

### Changed

- 撤销 1.0.5 的一处修改（string 类型为必填项时，不能为空），单独开分支进行校验优化开发，保证整体体验

## [1.0.7] - 2021-04-26

### Changed

- schema 组件的部分样式定义放入库文件内部（优化样式规则，适配根类型为非 object 情况）

## [1.0.6] - 2021-04-23

### Changed

- schema 组件的部分样式定义放入库文件内部

## [1.0.5] - 2021-04-23

### Added

- 添加 checkbox 的变异类型 toggle

### Changed

- schema 组件的部分样式定义放入库文件内部
- string 类型为必填项时，不能为空
- number 类型为空时，不强制校验是否为正确类型

### Fixed

- array 子项修复延时造成的禁用 readOnly 未生效的 bug

## [1.0.4] - 2021-04-19

### Added

- input 元素支持通过 options 指定宽度
- 调试 readOnly 功能（添加 log 代码）

### Changed

- 修改打包和开发调试的配置（build 打包，watch + watch.css 可以同时监控 js、css 文件的改动进行开发）
- 表格单元添加最小宽度限制
- 调整 label 行高，以容纳右侧的 btn 按钮区；btn 定位调整；
- form group 沿用原始的下间隔，以区分相邻 group

## [1.0.3] - 2021-04-14

### Changed

- 样式调整（移除调试样式）

## [1.0.2] - 2021-04-13

### Added

- style 样式由 css 变为 less 以增加 css 选择器的权重
- css2json 函数支持 less 格式

### Changed

- 假如 object 作为 table 的 td 单元格渲染时，隐藏标题区，同时整体不添加缩进
- 样式调整，减小各个区块的间隙

## [1.0.1] - 2021-04-08

### Changed

- 为正式发版调整项目名称和关键字，同时设置打包忽略文件

## [1.0.0] - 2021-04-08

### Added

- array 类型的 uniqueItems 允许设置为字符串（对象的任一属性名），这时表示数组内对象的对应属性为不可重复值
- 自定义样式使用 theme 方式注入，而非用封装组件实现，避免依赖链外露

### Changed

- 常见基础表单控件添加缩进，和可展开的 object 类元素进行文本对齐
- array 控件按钮图标重布局
- anyOf 组件标题样式调整
