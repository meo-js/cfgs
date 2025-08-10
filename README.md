<!-- <p align="center">
<img src="https://raw.githubusercontent.com/unocss/unocss/main/playground/public/icon-gray.svg" style="width:100px;" />
</p> -->

<h1 align="center">
@meojs/cfgs
</h1>

<p align="center">
Meo's development configurations.
</p>

<!-- <br>
<p align="center">
<a href="https://unocss.dev/">Documentation</a> |
<a href="https://unocss.dev/play/">Playground</a>
</p>
<br> -->

<br>
<p align="center">
<span>English</span> |
<a href="./README_zh-CN.md">简体中文</a>
</p>

## Introduction

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

- `@meojs/cfgs/ts/base.json` - Configuration with rules only
- `@meojs/cfgs/ts/general.json` - Common configuration for ES modules
- `@meojs/cfgs/ts/cocos.json` - Configuration for Cocos Creator projects
- `@meojs/cfgs/ts/node.json` - Configuration for NodeJS projects

### ESLint Config

```js
import { eslint } from "@xenon.js/configs";

export default eslint.config({
  // Whether to add `.gitignore` ignore, by default uses `cwd()` to find the `.gitignore` file path
  gitignore?: boolean | string,
  // Ignore all `*.config` configuration files, such as `eslint.config.js`, default is `true`
  ignoreConfigFiles?: boolean,
  // JSDoc inspection level, default is `loose`
  jsdoc?: "none" | "loose" | "strict",
  // Include NodeJS related rules, default is `strict`
  nodejs?: "none" | "loose" | "strict",
  // Include Web related rules, default is `true`
  web?: boolean,
  // Additional allowed JSDoc tags
  jsdocTags?: string[],
  // Whether to be compatible with reactive libraries, default is `true`
  reactive?: boolean,
});
```

### Prettier Config

```js
import { prettier } from '@xenon.js/configs';

export default prettier.config;
```

### Editor Config

Please manually copy the files from the `editorconfig` directory.

### Repo Template

Please manually copy the files from the `repo` directory.

<!-- ## Documentation

Read the [documentation](https://unocss.dev/) for more details. -->

<!-- ## Contributing

To get started contributing to the project, see the [Contributing Guide](./CONTRIBUTING.md). -->

## Contributing

- Run `pnpm run build` to build the project.
- Run `pnpm run publish:version` to build and push a new version.

## License

[MIT @ SmallMain](./LICENSE)
