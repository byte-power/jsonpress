# 开发指南

## 目录说明

```
├── build
│   └── CssToJson.js        构建工具，用于把 css(less) 文件转换为 json 格式的 js 文件，方便在 js 中引入
├── config                  webpack 相关设置（其中引入了 CssToJson ）
├── dist                    打包构建生成的成品代码
├── docs                    相关文档说明
├── examples                相关使用示例
├── playground              演练场
├── src
│   ├── editors             核心代码，用于解析 Schema 里的所有数据类型（type + format）
│   ├── iconlibs            引入第三方图标库（目前支持 bootstrap3 *、fontawesome5）
│   ├── templates           引入第三方 html 模板（目前支持 default *、nunjucks）
│   ├── themes              引入第三方主题库（目前支持 bootstrap3 *、html、tailwind）
│   ├── validators          校验规则
│   ├── core.js             入口文件（用于引入其他所有的基础设置、模块。并生成编辑器实例）
│   ├── defaults.js         编辑器默认配置
│   ├── editor.js           所有数据类型 editor 的基础类
│   ├── iconlib.js          图标库的基础类
│   ├── resolvers.js        解析函数（分析 schema 的结构并调用相应的 editor 进行解析）
│   ├── schemaloader.js     通过 ajax 加载外部 schema
│   ├── style.less          基础样式
│   ├── theme.js            主题库的基础类
│   ├── utilities.js        基础工具集
│   └── validator.js        主入口
└── package.json            仓库 npm 配置
```

## 开发步骤

### 调试

`npm run watch` 监控 js 文件更新并实时编译（文件打包目录为 dist，可以用 npm link 指定项目软连接到当前打包目录，进行实时调试）

`npm run watch:css` 监控 css 文件更新并实时编译

### 发布

`npm run push` 修改最小版本号，并发布到 npmjs 网站
`npm run publish` 修改次版本号，并发布到 npmjs 网站
