/** @import { Linter } from "eslint" */
/** @import { ConfigArray } from "typescript-eslint" */
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import js from "@eslint/js";
import { resolve } from "path";
import { cwd } from "process";
import {
    config as defineConfig,
    configs as tsConfigs
} from "typescript-eslint";
import { scriptExt } from "./glob.js";
import { ignore } from "./ignore-utils.js";
import { jsdoc as jsdocCfg } from "./jsdoc.js";
import { nodejs as nodejsCfg } from "./nodejs.js";
import { web as webCfg } from "./web.js";

/**
 * @typedef Options
 *
 * @property {boolean | string} [gitignore] 是否添加 `.gitignore` 忽略，默认使用 `cwd()` 查找 `.gitignore` 文件路径
 * @property {boolean} [ignoreConfigFiles] 忽略所有 `*.config` 配置文件，比如 `eslint.config.js`，默认 `true`
 * @property {"none" | "loose" | "strict"} [jsdoc] JSDoc 检查级别，默认 `loose`
 * @property {"none" | "loose" | "strict"} [nodejs] 包括 NodeJS 相关规则，默认 `strict`
 * @property {boolean} [web] 包括 Web 相关规则，默认 `true`
 * @property {string[]} [jsdocTags] 额外允许的 JSDoc 标签
 * @property {boolean} [ctix] 是否兼容 `ctix`，默认 `false`
 * @property {boolean} [reactive] 是否兼容响应式库，默认 `true`
 */

/**
 * @param {Options} opts
 * @returns {ConfigArray}
 */
export function config(opts = {}) {
    const {
        gitignore = true,
        ignoreConfigFiles = true,
        jsdoc = "loose",
        nodejs = "strict",
        web = true,
        jsdocTags = [],
        ctix = false,
        reactive = true,
    } = opts;

    const allScriptFiles = defineConfig({
        name: "all script files",
        files: [`**/*.${scriptExt}`],
    });

    const baseOptions = defineConfig({
        name: "base options",
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                projectService: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error",
        },
    });

    const ignoreGitignore = () => {
        if (gitignore !== false) {
            const path = gitignore === true
                ? resolve(cwd(), ".gitignore")
                : gitignore;
            return ignore(".gitignore", path);
        } else {
            return [];
        }
    };

    const ignoreAllConfigFiles = () => {
        if (ignoreConfigFiles) {
            return defineConfig({
                name: "ignore config files",
                ignores: [`**/*.config.${scriptExt}`],
            });
        } else {
            return [];
        }
    };

    const customRules = defineConfig({
        name: "custom js/ts rules",
        rules: {
            // 不在 @eslint/js 推荐规则内，自认为需要启用的规则
            "array-callback-return": ["error", { checkForEach: false }],
            "no-constructor-return": "error",
            "no-promise-executor-return": "error",
            "no-self-compare": "error",
            "no-template-curly-in-string": "warn",
            "no-unmodified-loop-condition": "error",
            "default-case-last": "error",
            "eqeqeq": ["error", "smart"],
            "grouped-accessor-pairs": ["warn", "getBeforeSet"],
            // 本条已在 @typescript-eslint 推荐规则中
            // "no-array-constructor": "off",
            // "@typescript-eslint/no-array-constructor": "error",
            "no-caller": "error",
            "no-iterator": "error",
            "no-label-var": "error",
            "no-new-wrappers": "error",
            "no-object-constructor": "error",
            "no-return-assign": "error",
            "no-useless-return": "warn",
            "no-var": "error",
            "prefer-object-has-own": "error",
            "prefer-regex-literals": "warn",
            "prefer-rest-params": "error",
            "prefer-template": "warn",
            "require-unicode-regexp": "warn",

            // 被 @typescript-eslint 启用，但错误级别太高
            "prefer-const": "warn",

            // 由于其它规则要求必须处理 Promise，当显式不进行处理时则会使用 void
            "no-void": "off",

            // 有时候保留未使用的东西有用处，所以禁用该规则
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",

            // FUTURE 现在还有很多地方需要使用 namespace，未到禁用的时候
            "@typescript-eslint/no-namespace": "off",

            // 现在有很多地方需要使用 ! ，未到禁用的时候
            "@typescript-eslint/no-non-null-assertion": "off",

            // 有用处，并且暂时不会被滥用，不需要禁用
            "@typescript-eslint/no-this-alias": "off",

            // FUTURE 未完全了解函数的协逆变规则，暂时还需要使用 Function 类型
            "@typescript-eslint/no-unsafe-function-type": "off",

            // 在推荐规则内，但自认为没有必要启用的规则
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/prefer-literal-enum-member": "off",
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
            "@typescript-eslint/no-unnecessary-type-arguments": "off",
            "@typescript-eslint/consistent-type-assertions": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/class-literal-property-style": "off",
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            "@typescript-eslint/unified-signatures": "off",
            "@typescript-eslint/prefer-promise-reject-errors": "off",

            // 在推荐规则内，但需允许 (...args: any[]) 用法
            "@typescript-eslint/no-explicit-any": [
                "error",
                { ignoreRestArgs: true },
            ],

            // 在推荐规则内，但需允许传入数值
            "@typescript-eslint/restrict-template-expressions": [
                "error",
                {
                    allowAny: true,
                    allowNumber: true,
                },
            ],

            // 在推荐规则内，但需更宽松
            "@typescript-eslint/no-confusing-void-expression": [
                "error",
                {
                    ignoreArrowShorthand: true,
                    ignoreVoidOperator: true,
                },
            ],

            // 在推荐规则内，但需允许 while (true) 用法
            "@typescript-eslint/no-unnecessary-condition": [
                "error",
                {
                    allowConstantLoopConditions: true,
                    checkTypePredicates: true,
                },
            ],

            // 在推荐的规则内，但需更宽松
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true,
                    enforceForJSX: true,
                },
            ],

            // 在推荐的规则内，但需允许空的 interface
            // "@typescript-eslint/no-empty-object-type": [
            //     "error",
            //     {
            //         allowInterfaces: "always",
            //     },
            // ],
            // 某些类型好像必须使用 {} 才能正常运作，暂时关闭
            "@typescript-eslint/no-empty-object-type": "off",

            // 在推荐规则内，但需允许 (this: void) 用法
            // "@typescript-eslint/no-invalid-void-type": [
            //     "error",
            //     { allowAsThisParameter: true },
            // ],
            // FUTURE 存在误报的情况，暂时关闭
            "@typescript-eslint/no-invalid-void-type": "off",

            // 在推荐规则内，但需更宽松
            // "@typescript-eslint/only-throw-error": [
            //     "error",
            //     {
            //         allowThrowingAny: true,
            //         allowThrowingUnknown: true,
            //     },
            // ],
            // FUTURE 误报 throw 泛型，暂时关闭
            "@typescript-eslint/only-throw-error": "off",

            // 不在 @typescript-eslint 推荐规则内，自认为需要启用的规则
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/require-array-sort-compare": "error",
            "@typescript-eslint/strict-boolean-expressions": [
                "error",
                {
                    allowAny: true,
                    allowNullableBoolean: true,
                    allowNullableEnum: false,
                },
            ],
            "@typescript-eslint/switch-exhaustiveness-check": [
                "error",
                {
                    considerDefaultExhaustiveForUnions: true,
                    requireDefaultForNonUnion: true,
                },
            ],

            // 该规则可避免 verbatimModuleSyntax 导致意外留下的的副作用导入
            "@typescript-eslint/no-import-type-side-effects": "error",

            // 允许整个文件的 disable 指令
            "@eslint-community/eslint-comments/no-unlimited-disable": "off",
            "@eslint-community/eslint-comments/disable-enable-pair": [
                "error",
                { "allowWholeFile": true },
            ],

            // 如果禁用则必须进行注释
            "@eslint-community/eslint-comments/require-description":
                "error",
        },
    });

    return defineConfig(
        ...allScriptFiles,
        ...baseOptions,
        ...ignoreGitignore(),
        ...ignoreAllConfigFiles(),
        {
            name: "eslint/js/recommended",
            ...js.configs.recommended,
        },
        ...tsConfigs.strictTypeChecked,
        ...tsConfigs.stylisticTypeChecked,
        // @ts-ignore
        comments.recommended,
        ...customRules,
        ...jsdocCfg(jsdoc, reactive, ctix, jsdocTags),
        ...nodejsCfg(nodejs),
        ...webCfg(web),
    );
}
