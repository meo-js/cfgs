/** @import { ConfigArray } from "typescript-eslint" */
import jsDoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';
import { javascriptExt, scriptExt, typescriptExt } from '../glob.js';
import jsdocTagSequence from './jsdoc-tag-sequence.js';

/**
 * @param {"none" | "loose" | "strict"} level 检查级别
 * @param {boolean} reactive 是否兼容响应式库标记
 * @param {string[]} jsdocTags 额外允许的 JSDoc 标签
 * @returns {ConfigArray}
 */
export function jsdoc(level, reactive, jsdocTags) {
  if (level === 'none') {
    return [];
  }

  const definedTags = jsdocTags.concat(
    reactive ? ['val', 'reactive', 'shallow', 'computed'] : [],
    ['experimental', 'decorator'],
    ['inherit'],
    ['bin', 'modulePath', 'moduleTag', 'tag'],
    ['group', 'groupDescription'],
    ['platform'],
    ['__NO_SIDE_EFFECTS__', '__PURE__'],
  );

  const looseRules = () => {
    if (level === 'loose') {
      // 宽松模式追加禁用规则
      return defineConfig({
        name: 'custom jsdoc loose rules',
        files: [`**/*.${scriptExt}`],
        rules: {
          'jsdoc/check-template-names': 'off',
          'jsdoc/require-description-complete-sentence': 'off',
          'jsdoc/require-jsdoc': 'off',
          'jsdoc/require-throws': 'off',
        },
      });
    } else {
      return [];
    }
  };

  return defineConfig(
    {
      files: [`**/*.${javascriptExt}`],
      ...jsDoc.configs['flat/recommended'],
    },
    {
      files: [`**/*.${typescriptExt}`],
      ...jsDoc.configs['flat/recommended-typescript'],
    },
    // 偏好配置
    {
      name: 'custom jsdoc rules',
      files: [`**/*.${scriptExt}`],
      rules: {
        'jsdoc/check-line-alignment': [
          'warn',
          'never',
          {
            disableWrapIndent: true,
          },
        ],
        'jsdoc/check-indentation': 'warn',
        'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags,
          },
        ],
        // 重载函数误报
        'jsdoc/check-param-names': 'off',
        // 'jsdoc/check-param-names': [
        //   'warn',
        //   {
        //     disableMissingParamChecks: true,
        //   },
        // ],
        'jsdoc/check-template-names': 'warn',
        'jsdoc/no-bad-blocks': [
          'warn',
          {
            preventAllMultiAsteriskBlocks: true,
          },
        ],
        'jsdoc/no-defaults': 'off',
        'jsdoc/no-blank-block-descriptions': 'warn',
        'jsdoc/no-blank-blocks': 'warn',
        'jsdoc/require-description-complete-sentence': 'warn',
        'jsdoc/require-asterisk-prefix': 'warn',
        'jsdoc/require-hyphen-before-param-description': ['warn', 'never'],
        'jsdoc/require-jsdoc': [
          'warn',
          {
            publicOnly: true,
            contexts: [
              'TSTypeAliasDeclaration',
              'TSEnumDeclaration',
              'TSInterfaceDeclaration',
              'VariableDeclaration',
              'PropertyDefinition[accessibility!="private"]',
              'MethodDefinition[accessibility!="private"] > FunctionExpression',
            ],
            require: {
              ClassDeclaration: true,
              FunctionDeclaration: true,
              MethodDefinition: false,
            },
            checkGetters: true,
            checkSetters: 'no-getter',
            enableFixer: true,
            fixerMessage: 'TODO: Missing document.',
          },
        ],
        'jsdoc/require-param': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-yields': 'off',
        'jsdoc/require-throws': 'warn',
        'jsdoc/require-yields-check': [
          'warn',
          {
            checkGeneratorsOnly: true,
          },
        ],
        'jsdoc/tag-lines': [
          'warn',
          'any',
          {
            startLines: 1,
          },
        ],
        'jsdoc/sort-tags': [
          'warn',
          {
            tagSequence: jsdocTagSequence,
          },
        ],
      },
    },
    ...looseRules(),
  );
}
