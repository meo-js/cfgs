/** @import { ConfigArray } from "typescript-eslint" */
import node from "eslint-plugin-n";
import nodeSecurity from "eslint-plugin-security";
import { defineConfig } from "eslint/config";

/**
 * @param {"none" | "loose" | "strict"} level 检查级别
 * @returns {ConfigArray}
 */
export function nodejs(level) {
    if (level === "none") {
        return [];
    }

    return defineConfig(
        node.configs["flat/recommended"],
        level === "strict" ? nodeSecurity.configs.recommended : {},
        {
            name: "custom nodejs rules",
            rules: {
                // 以下规则误报且有 TypeScript 原生支持
                "n/no-missing-import": "off",
                "n/no-missing-require": "off",

                // 不报告实验性功能
                "n/no-unsupported-features/node-builtins": [
                    "error",
                    {
                        "allowExperimental": true,
                    },
                ],
            },
        },
        {
            name: "custom nodejs security rules",
            rules: {
                // 没必要打开
                "security/detect-object-injection": "off",
                "security/detect-non-literal-fs-filename": "off",
            },
        },
    );
}
