# 版本说明

## [1.1.6-beta.15] - 2024-11-18

### Fixed

-   修复支持 array 类型的 tabs 相关增强功能时造成上下排序报错的 bug

## [1.1.6-beta.14] - 2024-11-15

### Added

-   object 类型支持使用 options.infoText 字段来设置信息提示

## [1.1.6-beta.13] - 2024-09-04

### Changed

-   调整 tab 导航列表的折叠功能的交互和样式

## [1.1.6-beta.12] - 2024-08-08

### Changed

-   针对 array 类型，支持使用 options.tabCollapsed 字段来设置是否启用 tab 导航列表的折叠功能和按钮显示

## [1.1.6-beta.11] - 2024-07-26

### Changed

-   针对 array 类型，支持使用 options.reverse 字段来设置整个列表的倒序排序和渲染

## [1.1.6-beta.10] - 2024-05-13

### Changed

-   针对 array 类型，添加项时仅生成校验信息但不显示

## [1.1.6-beta.9] - 2024-03-21

### Fixed

-   infoText 弹出层显示效果优化（避免被视口和其后控件遮挡）

## [1.1.6-beta.8] - 2024-03-20

### Added

-   upload 组件优化（支持校验，同时支持设置为 fileContent 格式，该格式可以解析上传文件的文本内容作为值添加到对应字段，并支持下载导出）

### Changed

-   依赖版本更新及代码格式修改
-   针对 required 属性的校验修正（必填项为空字符串时，应未通过）

### Fixed

-   upload 组件修复依赖无效和移除元素报错的 bug
-   修复按钮和输入框高度不一致的样式问题

## [1.1.6-beta.6] - 2024-03-15

### Added

-   infoText 说明支持用 \n 来换行

## [1.1.6-beta.4] - 2024-01-15

### Changed

-   优化 array 类型使用 format: 'tabs' 设置为页签时的展示方式

### Fixed

-   修复 array/table 类型使用 options.array_controls_top 字段设置无效的问题

## [1.1.6-beta.3] - 2023-08-04

### Fixed

-   range 组件修复 chrome 下的异常样式

## [1.1.6-beta.2] - 2023-08-03

### Added

-   range 组件增加 step 选项支持，以支持自定义步进

## [1.1.6-beta.1] - 2023-06-29

### Changed

-   修正正则校验提示字段 pattern_message

## [1.1.6-beta.0] - 2023-06-15

### Changed

-   按新格式规则格式化代码

## [1.1.5] - 2023-06-15

合并到主分支，发布正式版

## [1.1.5-beta.6] - 2023-06-14

### Fixed

-   完善校验规则生效机制：当 td 内元素因为 dependency 依赖项设置而隐藏时，其校验规则也相应无效

## [1.1.5-beta.5] - 2023-06-12

### Added

-   select2 组件增加 relativeToParent 选项支持，以避免其下拉项层和页面对话框层互相遮挡的

## [1.1.5-beta.4] - 2022-08-15

### Changed

-   调整 Edit JSON 对话框尺寸

### Fixed

-   inline 模式时，修复有表单校验提示时，按钮组不垂直对齐的问题

## [1.1.5-beta.2] - 2022-05-16

### Changed

-   增强 dependencies 功能：

    -   对于多项 dependencies 规则，使用 ‘and’ 而非 ‘or’ 的逻辑计算方式

-   添加 options.transform_json 字段，支持对 Edit JSON 对话框的 save 行为进行相应数据转换

## [1.1.5-beta.1] - 2022-04-11

### Fixed

-   string 类型保存时默认移除前后空格

## [1.1.4] - 2022-04-08

合并到主分支，发布正式版

## [1.1.3-beta.21] - 2022-04-06

### Added

-   添加 auto_refresh 属性用于标明当前字段需要实现自动刷新并置空已无效项
    -   用于修复 select 组件已选中项已经在当前组件中的 watch 依赖方已被删除后，还保留无效值的 bug
    -   避免以前修复方法造成初始已选择项不能正确渲染的 bug

## [1.1.3-beta.20] - 2022-03-28

### Fixed

-   撤销【修复 select 组件已选中项已经在 watch 方被删除后，还保留不存在的值的 bug】，避免其造成已选择项不能正确渲染的 bug

## [1.1.3-beta.19] - 2022-03-28

### Fixed

-   multiline 类型优化样式和容错性

## [1.1.3-beta.18] - 2022-03-28

### Added

-   新增 newOnly 属性表明该字段只能新建不能编辑

### Fixed

-   修复 select 组件已选中项已经在 watch 方被删除后，还保留不存在的值的 bug

## [1.1.3-beta.17] - 2022-03-23

### Added

-   增强 dependencies 功能：
    -   支持使用 not 字段来设置依赖值，表明依赖项为非设定值时生效
-   增强 pattern 功能：
    -   增加 patternValidate 字段，用于提供一个根据条件判断并设置 pattern 是否生效的方法

## [1.1.3-beta.16] - 2022-03-18

### Changed

-   调整 multiline 类型（默认值调整为自身为必填项才返回空数组，否则为空）
-   针对 anyOf 类型 增加 realParent 属性(用于 multiline 类型和 anyOf 结合使用时，避免判断 isRequired 缺失关键参数）

### Fixed

-   修复 array 类型为折叠状态时会把新增按钮也隐藏的 bug

## [1.1.3-beta.15] - 2022-03-11

### Fixed

-   支持 array/table 类型使用 items.readOnly 字段来设置单个项的只读模式（readOnly 属性设置使用更健壮的方式，避免 Edit JSON 按钮切换闭造成模式失效）

## [1.1.3-beta.14] - 2022-03-10

### Fixed

-   修复 multiline 类型在 setValue 时没有冒泡到父级对象，造成校验失败的 bug
-   修复 multiline 类型未返回正确默认值的 bug

## [1.1.3-beta.13] - 2022-03-03

### Added

-   新增 multiline 类型，表现为支持多行指定类型的文本域，用于快速生成数组（支持 字符串、数字、布尔 三种类型组成数组）
-   array 类型的 uniqueItems 增强功能（支持用 xxx@ 的形式来检测对应字段为 array 类型内的重复项）
-   array/table 类型支持使用 items.readOnly 字段来设置单个项的只读模式
    -   支持函数：按条件判断禁用；布尔：直接全局禁用
    -   支持使用 options.ignore = 'readOnly' 来设置特定项忽略只读模式
-   links 类型增强功能：
    -   当 links.mediaType = 'info' 时，渲染为一个图标，同时可以使用 getMedia 方法返回一个文本内容，用于 hover 时展示动态信息
    -   当 links.mediaType = 'download' 时，渲染为一个下载链接，同时可以使用 getMedia 方法返回一个文本内容，用于渲染动态下载文件内容

### Changed

-   当设置 input_width 时，单元格内的 input 父级元素也设置对应值，以避免不生效

### Fixed

-   inline 模式下样式优化
    -   array 类型的子元素和其按钮群组在一列显示

## [1.1.3-beta.12] - 2022-02-21

### Fixed

-   对话框内的 infoText 弹出层避免被遮挡

## [1.1.3-beta.11] - 2022-02-21

### Added

-   checkbox 类型也支持 options.infoText 属性
-   array 类型支持使用 items.readOnly 字段来设置方法判断并设置单个项的只读模式
-   table 类型支持使用 items.readOnly 字段来设置方法判断并设置单个项的只读模式

### Changed

-   table 类型支持单元格内显示校验错误提示
-   使用 textContent 代替 createTextNode

### Fixed

-   toggle 类型修改 required 下的 css 样式

## [1.1.3-beta.10] - 2022-02-15

### Added

-   支持通过 options.exclude 来设置某项属性不包括在最终值内

### Fixed

-   修复 select2 组件在读取已有数据时报错的 bug
-   调整样式（修复 modal 组件被 select2 层遮挡的 bug)
-   调整样式（修复行内模式时 array 元素内按钮组遮挡内容的 bug）

## [1.1.3-beta.9] - 2022-02-08

### Added

-   table 类型支持通过 options.className 来定制样式
-   select 类型支持使用 format: tabs 设置为标签切换形式（不支持 safari 浏览器）
-   properties 弹窗实现边距检测

### Changed

-   使用 textContent 代替 innerText

### Fixed

-   调整样式（仅隐藏 object 类型的 edit json 按钮而非整个控制栏以便显示 properties 按钮）

## [1.1.3-beta.8] - 2022-01-12

### Added

-   enumSource 属性支持使用 sourceFormat 来设置格式化函数来处理关联数据

### Changed

-   oneOf 项校验可以通过 options.hideOneOfValidate 选项来设置不通过的话不再笼统显示总提示信息
-   添加延时校验，避免渲染结果错位的问题（初始化时和切换 anyOf/oneOf 时）

### Fixed

-   inline 模式下样式优化
    -   anyOf 元素没有正确实现行内布局的问题
    -   anyOf 元素内表单项可以和前面的切换控件垂直对齐

## [1.1.3-beta.7] - 2021-12-28

### Changed

-   必填项的 label 样式优化
-   优化 Edit JSON 功能
    -   Edit JSON 的对话框内，保存按钮可以通过配置关闭
    -   编辑器 disable 状态时，Edit JSON 按钮依旧可用（仅把内部的保存按钮禁用）

### Fixed

-   对于 array 类型，可以设置不使用缓存，避免删除后又添加条目时，uuid 被复用导致 bug
-   修复 disable 状态时，array 报错的 bug

## [1.1.3-beta.6] - 2021-12-08

### Changed

-   调整根标题的文字大小
-   必填项的 label 样式优化
-   优化校验规则和机制
    -   字段修改时，仅更新当前项校验提示，不改变其他已显示的提示：优化判断逻辑，避免深度嵌套的元素不更新当前项提示

### Fixed

-   完善 dependencies 和 anyOf 的联动功能：
    -   避免 anyOf 元素在有依赖项时切换找不到对应 editor 的问题
    -   修复 editor 不存在还继续判断造成报错的 bug
    -   切换依赖项时，同时更新对应切换控件的值（虽然被隐藏）
-   number 控件在输入非数字时，保留原始处理逻辑而非变为 undefined，避免校验规则失效

## [1.0.22] - 2021-11-29

### Changed

-   number 控件在输入非数字时，变为 undefined 而非转为字符串保存
-   加入 maxLength 属性时，不再对原生控件添加同名属性，避免用户对主动截断输入值产生困扰
-   调整了 anyOf 校验信息的判断逻辑，避免因为 anyOf 项校验不通过的话不显示具体项的问题

### Fixed

-   修复 uniqueItems 判断方法不够健壮导致处理异常值报错的 bug
-   修复移除 anyOf 的 title 区不完善有遗漏的地方
-   修复当 anyOf 是联动关系时，仅校验当前激活项，因为方法不够健壮导致处理异常值报错的 bug

## [1.0.21] - 2021-10-11

### Added

-   required 属性的增强修正功能（使用 dependencies 设置的字段，当隐藏时，不校验其 required 属性）
-   exclusive 属性用于指定互斥项（表明 exclusive 内的值只能选择其一）

### Changed

-   anyOf 项校验不通过的话不再笼统显示提示信息，而是针对性提示第一个不通过项的校验提示

### Fixed

-   修复 toggle 类型在 table 单元格内显示异常的 bug

## [1.0.20] - 2021-08-31

### Added

-   array 类型的增强功能（支持用 compareThanPrev 属性来定义指定值和同级相邻节点的关系限制）

## [1.0.19] - 2021-08-27

### Added

-   array 类型的 uniqueItems 增强功能（支持用 a.b 的形式来检测嵌套属性的重复项）
-   date 自定义校验增强功能（path 字段支持通过数组元素 id 定义的相对路径）

### Changed

-   UUID 变为大写

### Fixed

-   修复实现“当 anyOf 是联动关系时，仅校验当前激活项，而非所有”功能时因为 $ref 引用导致判断失误的 bug

## [1.0.18] - 2021-08-25

### Added

-   普通 number 类型也支持 relativeTo 联动校验功能（原始只支持 date ）

### Changed

-   当 anyOf 内元素有联动关系时，仅按当前激活项的规则进行校验，而非按 anyOf 的规则校验所有

### Fixed

-   修复 date 自定义校验功能功能中因为其他类型也使用了 relativeTo 字段造成误判的 bug

## [1.0.17] - 2021-08-23

### Fixed

-   修复当没有非必填项的数据时，该项不会渲染的 bug
-   anyOf 下的元素为 array 类型时，不隐藏其标题区，避免误隐藏操作按钮

## [1.1.2] - 2021-08-04

### Fixed

-   修复当没有非必填项的数据时，该项不会渲染的 bug
-   修复 string 类型使用 markdown 编辑器时，获取值为空，导致必填项误判的 bug

## [1.0.16] - 2021-07-20

### Added

-   增强 dependencies 和 anyOf 的联动功能:
    -   针对 anyOf 下所有元素都有依赖项的情况下，初始化时不修改 type 为 the best match schema，避免联动的输入控件不能正确渲染为对应的项和值

## [1.0.15] - 2021-07-16

### Added

-   增强 dependencies 和 anyOf 的联动功能:
    -   针对 anyOf 下所有元素都有依赖项的情况下，隐藏原生切换控件，通过切换 dependencies 项来实现切换（同时隐藏 anyOf 标题）
    -   实现切换 dependencies 项时，同时重置联动项的值
    -   统一初始化 anyOf 的项，避免切换时无初始项无法渲染
-   对于没有内容的 label 标签，改变其 display 属性，变相隐藏(避免空白区域)

### Fixed

-   修复 uniqueItems 设置为 false 时还执行校验的 bug

## [1.1.0] - 2021-07-06

### Changed

-   优化校验规则和机制
    -   初始化时不再全局校验，仅在保存时统一校验
    -   值操作和修改时，仅校验当前项
    -   优化逻辑，当前字段校验信息变动时，不改变其他已显示的提示
    -   必填项提示放在每个字段下，而非整个父级对象上
-   优化调整界面样式
    -   表格去除竖间隔线，表头添加背景
    -   输入框只显示下边线
    -   select 自定义下拉箭头
    -   label 和输入框字体调整
    -   label 和输入框支持 inline 模式（显示为一行，并添加冒号）
    -   输入框支持三种预设尺寸
    -   表格内的右侧按钮组收起，鼠标 click 时再展开，展开的按钮组垂直排列并且为文字+图标形式

## [1.0.14] - 2021-06-18

### Added

-   description 说明支持用 \n 来换行
-   当根元素为字符串时，label 也渲染为大标题
-   ace 编辑器样式调整

### Fixed

-   修复 array_controls_top 选项打开时，某些按钮找不到 this.title 报错的情况
-   修复 array_controls_top 选项打开时，折叠时会把新增按钮也隐藏的 bug
-   修复 description 说明的样式名赋值错误的 bug

## [1.0.13] - 2021-05-25

### Added

-   description 说明支持传入 options.warning 来开启警示颜色

### Fixed

-   修复 signature 类型的 bug（onEnd 事件定义的 function 内 this 指向错误;clear 时没有清除 data 值）
-   修复 dependencies 属性设置为数组时，不生效的 bug
-   修复 nunjucks 模板引擎渲染方法

## [1.0.12] - 2021-05-14

### Added

-   添加 date 自定义校验功能（可以约定起、始时间必须前者小于后者）

## [1.0.11] - 2021-05-13

### Fixed

-   修复 safari 下不能对日期字符串进行正确构造造成 date 控件校验失败的 bug

## [1.0.10] - 2021-05-10

### Fixed

-   修复 SimpleMDE 不能正确初始化空字符串值的 bug

## [1.0.9] - 2021-05-08

### Fixed

-   修复日期控件图标因为有前后相邻元素造成错位的 bug
-   修复日期控件使用数值类型时设置为 0 以清空显示时无效的 bug
-   修复同步主仓库后带来的一些冗余代码和 bug
-   修复文档迁移后图片路径的问题

## [1.0.8] - 2021-04-27

### Changed

-   撤销 1.0.5 的一处修改（string 类型为必填项时，不能为空），单独开分支进行校验优化开发，保证整体体验

## [1.0.7] - 2021-04-26

### Changed

-   schema 组件的部分样式定义放入库文件内部（优化样式规则，适配根类型为非 object 情况）

## [1.0.6] - 2021-04-23

### Changed

-   schema 组件的部分样式定义放入库文件内部

## [1.0.5] - 2021-04-23

### Added

-   添加 checkbox 的变异类型 toggle

### Changed

-   schema 组件的部分样式定义放入库文件内部
-   string 类型为必填项时，不能为空
-   number 类型为空时，不强制校验是否为正确类型

### Fixed

-   array 子项修复延时造成的禁用 readOnly 未生效的 bug

## [1.0.4] - 2021-04-19

### Added

-   input 元素支持通过 options 指定宽度
-   调试 readOnly 功能（添加 log 代码）

### Changed

-   修改打包和开发调试的配置（build 打包，watch + watch.css 可以同时监控 js、css 文件的改动进行开发）
-   表格单元添加最小宽度限制
-   调整 label 行高，以容纳右侧的 btn 按钮区；btn 定位调整；
-   form group 沿用原始的下间隔，以区分相邻 group

## [1.0.3] - 2021-04-14

### Changed

-   样式调整（移除调试样式）

## [1.0.2] - 2021-04-13

### Added

-   style 样式由 css 变为 less 以增加 css 选择器的权重
-   css2json 函数支持 less 格式

### Changed

-   假如 object 作为 table 的 td 单元格渲染时，隐藏标题区，同时整体不添加缩进
-   样式调整，减小各个区块的间隙

## [1.0.1] - 2021-04-08

### Changed

-   为正式发版调整项目名称和关键字，同时设置打包忽略文件

## [1.0.0] - 2021-04-08

### Added

-   array 类型的 uniqueItems 允许设置为字符串（子项的任一属性名），这时表示 array 内单个项对应属性为不可重复值
-   自定义样式使用 theme 方式注入，而非用封装组件实现，避免依赖链外露

### Changed

-   常见基础表单控件添加缩进，和可展开的 object 类元素进行文本对齐
-   array 控件按钮图标重布局
-   anyOf 组件标题样式调整
