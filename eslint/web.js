/** @import { ConfigArray } from "typescript-eslint" */
import html from '@html-eslint/eslint-plugin';
import jsInHtml from 'eslint-plugin-html';
import { defineConfig } from 'eslint/config';
import { htmlExt } from '../glob.js';

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

  return defineConfig(
    {
      name: 'lint script in html',
      files: [`**/*.${htmlExt}`],
      plugins: { jsInHtml },
    },
    {
      name: 'lint html in script template literals',
      plugins: {
        '@html-eslint': html,
      },
    },
    {
      name: 'html recommended rules',
      files: ['**/*.html'],
      ...html.configs['flat/recommended'],
    },
    {
      name: 'custom html rules',
      rules: {
        '@html-eslint/no-duplicate-class': 'error',
        '@html-eslint/no-duplicate-in-head': 'error',
        '@html-eslint/no-invalid-entity': 'error',
        '@html-eslint/no-nested-interactive': 'error',
        '@html-eslint/no-script-style-type': 'error',
        '@html-eslint/require-button-type': 'error',
        '@html-eslint/require-explicit-size': 'error',
        '@html-eslint/require-meta-charset': 'error',
        '@html-eslint/no-abstract-roles': 'error',
        '@html-eslint/no-accesskey-attrs': 'error',
        '@html-eslint/no-aria-hidden-body': 'error',
        '@html-eslint/no-aria-hidden-on-focusable': 'error',
        '@html-eslint/no-empty-headings': 'error',
        '@html-eslint/no-heading-inside-button': 'error',
        '@html-eslint/no-invalid-role': 'error',
        '@html-eslint/require-form-method': 'error',
        '@html-eslint/require-frame-title': 'error',
        '@html-eslint/require-input-label': 'error',
        '@html-eslint/require-meta-viewport': 'error',
        '@html-eslint/attrs-newline': 'off',
        '@html-eslint/element-newline': 'off',
        '@html-eslint/id-naming-convention': 'off',
        '@html-eslint/indent': 'off',
        '@html-eslint/lowercase': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/no-extra-spacing-text': 'off',
        '@html-eslint/no-multiple-empty-lines': 'off',
        '@html-eslint/no-trailing-spaces': 'off',
        '@html-eslint/quotes': 'off',
        '@html-eslint/sort-attrs': 'off',
      },
    },
  );
}
