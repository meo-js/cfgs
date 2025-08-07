/**
 * @param {"none" | "loose" | "strict"} level 检查级别
 * @param {boolean} reactive 是否兼容响应式库标记
 * @param {string[]} jsdocTags 额外允许的 JSDoc 标签
 * @returns {ConfigArray}
 */
export function jsdoc(level: "none" | "loose" | "strict", reactive: boolean, jsdocTags: string[]): ConfigArray;
import type { ConfigArray } from "typescript-eslint";
