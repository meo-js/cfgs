/** @import { ConfigArray } from "typescript-eslint" */
import jsDoc from "eslint-plugin-jsdoc";
import { getJsdocProcessorPlugin } from "eslint-plugin-jsdoc/getJsdocProcessorPlugin.js";
import { defineConfig } from "eslint/config";
import {
    configs as tsConfigs,
    parser as tsParser,
} from "typescript-eslint";
import { javascriptExt, scriptExt, typescriptExt } from "./glob.js";
import jsdocTagSequence from "./jsdoc-tag-sequence.js";

/**
 * @param {"none" | "loose" | "strict"} level 检查级别
 * @param {boolean} reactive 是否兼容响应式库标记
 * @param {boolean} ctix 是否兼容 `ctix`，默认 `false`
 * @param {string[]} jsdocTags 额外允许的 JSDoc 标签
 * @returns {ConfigArray}
 */
export function jsdoc(level, reactive, ctix, jsdocTags) {
    if (level === "none") {
        return [];
    }

    const definedTags = jsdocTags
        .concat(
            reactive ? [
                "val",
                "reactive",
                "shallow",
                "computed",
            ] : [],
            ctix ? [
                "ctix-exclude",
                "ctix-generation-style",
                "ctix-exclude-next",
                "ctix-declaration",
            ] : [],
        );

    const looseRules = () => {
        if (level === "loose") {
            // 宽松模式追加禁用规则
            return defineConfig({
                name: "custom jsdoc loose rules",
                files: [`**/*.${scriptExt}`],
                rules: {
                    "jsdoc/check-param-names": [
                        "warn",
                        {
                            disableMissingParamChecks: true,
                        },
                    ],
                    "jsdoc/require-param": [
                        "warn",
                        {
                            ignoreWhenAllParamsMissing: true,
                        },
                    ],
                    "jsdoc/require-returns": "off",
                    "jsdoc/require-yields": "off",
                },
            });
        } else {
            return [];
        }
    }

    return defineConfig(
        {
            files: [`**/*.${javascriptExt}`],
            ...jsDoc.configs["flat/recommended"],
        },
        {
            files: [`**/*.${typescriptExt}`],
            ...jsDoc.configs["flat/recommended-typescript"],
        },
        {
            name: "jsdoc/examples-plugin",
            plugins: {
                // @ts-ignore
                examples: getJsdocProcessorPlugin({
                    // 默认值可能需要直接用语言描述
                    //   checkDefaults: true,
                    //   checkParams: true,
                    //   checkProperties: true,
                    // @ts-ignore
                    parser: tsParser,
                }),
            },
            processor: "examples/examples",
        },
        // 根据源码得知数组第一位是规则配置
        jsDoc.configs.examples[1],
        jsDoc.configs["default-expressions"][1],
        // FUTURE 关闭代码块的 TypeScript 检查，因为 TypeScript 报错没有 Project，这是误报
        {
            files: [
                "**/*.md/*.js",
                "**/*.jsdoc-defaults",
                "**/*.jsdoc-params",
                "**/*.jsdoc-properties",
            ],
            ...tsConfigs.disableTypeChecked,
        },
        // 补充一些代码块兼容规则
        {
            name: "custom jsdoc md rules",
            files: [
                "**/*.md/*.js",
                "**/*.jsdoc-defaults",
                "**/*.jsdoc-params",
                "**/*.jsdoc-properties",
            ],
            rules: {
                "@typescript-eslint/no-unused-expressions": "off",
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
        // 偏好配置
        {
            name: "custom jsdoc rules",
            files: [`**/*.${scriptExt}`],
            rules: {
                "jsdoc/check-template-names": "warn",
                "jsdoc/check-tag-names": [
                    "warn",
                    {
                        definedTags,
                    },
                ],
                "jsdoc/no-bad-blocks": [
                    "warn",
                    {
                        preventAllMultiAsteriskBlocks: true,
                    },
                ],
                "jsdoc/no-defaults": "off",
                "jsdoc/no-blank-block-descriptions": "warn",
                "jsdoc/no-blank-blocks": "warn",
                "jsdoc/require-asterisk-prefix": "warn",
                "jsdoc/require-hyphen-before-param-description": [
                    "warn",
                    "never",
                ],
                "jsdoc/require-jsdoc": "off",
                "jsdoc/tag-lines": [
                    "warn",
                    "any",
                    {
                        startLines: 1,
                    },
                ],
                "jsdoc/sort-tags": [
                    "warn",
                    {
                        tagSequence: jsdocTagSequence,
                        alphabetizeExtras: true,
                    },
                ],
            },
        },
        ...looseRules(),
    );
}
