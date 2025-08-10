<!-- <p align="center">
<img src="https://raw.githubusercontent.com/unocss/unocss/main/playground/public/icon-gray.svg" style="width:100px;" />
</p> -->

<h1 align="center">
@meojs/cfgs
</h1>

<p align="center">
Meo 团队使用的开发配置。
</p>

<!-- <br>
<p align="center">
<a href="https://unocss.dev/">Documentation</a> |
<a href="https://unocss.dev/play/">Playground</a>
</p>
<br> -->

<br>
<p align="center">
<a href="./README.md">English</a> |
<span>简体中文</span>
</p>

## 简介

```bash
npm i -D @meojs/cfgs
```

### TSConfig

```jsonc
{
    "extends": "@meojs/cfgs/ts/general.json",
    "include": ["src"],
}
```

- `@meojs/cfgs/ts/base.json` - 仅有规则的配置
- `@meojs/cfgs/ts/general.json` - ES 模块通用配置
- `@meojs/cfgs/ts/cocos.json` - Cocos Creator 项目配置
- `@meojs/cfgs/ts/node.json` - NodeJS 项目配置

### ESLint Config

```js
import { eslint } from "@xenon.js/configs";

export default eslint.config({
    // 是否添加 `.gitignore` 忽略，默认使用 `cwd()` 查找 `.gitignore` 文件路径
    gitignore?: boolean | string,
    // 忽略所有 `*.config` 配置文件，比如 `eslint.config.js`，默认 `true`
    ignoreConfigFiles?: boolean,
    // JSDoc 检查级别，默认 `loose`
    jsdoc?: "none" | "loose" | "strict",
    // 包括 NodeJS 相关规则，默认 `strict`
    nodejs?: "none" | "loose" | "strict",
    // 包括 Web 相关规则，默认 `true`
    web?: boolean,
    // 额外允许的 JSDoc 标签
    jsdocTags?: string[],
    // 是否兼容响应式库，默认 `true`
    reactive?: boolean,
});
```

### Prettier Config

```js
import { prettier } from "@xenon.js/configs";

export default prettier.config;
```

### Editor Config

请手动复制 `editorconfig` 目录内的文件。

### Repo Template

请手动复制 `repo` 目录内的文件。

<!-- ## Documentation

Read the [documentation](https://unocss.dev/) for more details. -->

<!-- ## Contributing

To get started contributing to the project, see the [Contributing Guide](./CONTRIBUTING.md). -->

## 贡献

- 执行 `pnpm run build` 构建项目。
- 执行 `pnpm run publish:version` 构建并推送新版本。

## 许可证

[MIT @ SmallMain](./LICENSE)
