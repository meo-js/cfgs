/** @import { ConfigArray } from "typescript-eslint" */
import html from "@html-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

/**
 * 针对 Web 的配置
 *
 * 建议配置 `engines` 字段以提供准确的检查，详情请查看 [NPM 文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)
 *
 * @param {boolean} enable 是否启用
 * @returns {ConfigArray}
 */
export function web(enable) {
    if (!enable) {
        return [];
    }

    return defineConfig({
        name: "web recommended rules",
        files: ["**/*.html"],
        // @ts-expect-error 误报没有该配置
        ...html.configs["flat/recommended"],
    });
}
