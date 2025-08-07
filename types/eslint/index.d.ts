/**
 * @typedef Options
 *
 * @property {boolean | string} [gitignore] 是否添加 `.gitignore` 忽略，默认使用 `cwd()` 查找 `.gitignore` 文件路径
 * @property {boolean} [ignoreConfigFiles] 忽略所有 `*.config` 配置文件，比如 `eslint.config.js`，默认 `true`
 * @property {"none" | "loose" | "strict"} [jsdoc] JSDoc 检查级别，默认 `loose`
 * @property {"none" | "loose" | "strict"} [nodejs] 包括 NodeJS 相关规则，默认 `strict`
 * @property {boolean} [web] 包括 Web 相关规则，默认 `true`
 * @property {string[]} [jsdocTags] 额外允许的 JSDoc 标签
 * @property {boolean} [reactive] 是否兼容响应式库，默认 `true`
 */
/**
 * @param {Options} opts
 * @returns {ConfigArray}
 */
export function config(opts?: Options): ConfigArray;
export type Options = {
    /**
     * 是否添加 `.gitignore` 忽略，默认使用 `cwd()` 查找 `.gitignore` 文件路径
     */
    gitignore?: boolean | string;
    /**
     * 忽略所有 `*.config` 配置文件，比如 `eslint.config.js`，默认 `true`
     */
    ignoreConfigFiles?: boolean;
    /**
     * JSDoc 检查级别，默认 `loose`
     */
    jsdoc?: "none" | "loose" | "strict";
    /**
     * 包括 NodeJS 相关规则，默认 `strict`
     */
    nodejs?: "none" | "loose" | "strict";
    /**
     * 包括 Web 相关规则，默认 `true`
     */
    web?: boolean;
    /**
     * 额外允许的 JSDoc 标签
     */
    jsdocTags?: string[];
    /**
     * 是否兼容响应式库，默认 `true`
     */
    reactive?: boolean;
};
import type { ConfigArray } from "typescript-eslint";
