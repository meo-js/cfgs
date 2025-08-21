/** @import { ConfigArray } from "typescript-eslint" */
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { scriptExt, testSuffix } from '../glob.js';

/**
 * 针对测试的配置
 *
 * @param {boolean} enable 是否启用
 * @returns {ConfigArray}
 */
export function test(enable) {
  if (!enable) {
    return [];
  }

  const testFiles = `**/*.${testSuffix}.${scriptExt}`;

  return defineConfig(
    {
      files: [testFiles],
      settings: {
        vitest: {
          typecheck: true,
        },
      },
      languageOptions: {
        globals: {
          ...vitest.environments.env.globals,
        },
      },
      ...vitest.configs.recommended,
    },
    {
      name: 'custom test rules',
      files: [testFiles],
      rules: {
        'vitest/consistent-test-filename': [
          'error',
          {
            'allTestPattern': {
              'format': 'regex',
              'default': '.*\\.(test|spec)\\.(?:[mc])?[jt]sx?$',
            },
            'pattern': {
              'format': 'regex',
              'default': '.*\\.test\\.(?:[mc])?[jt]sx?$',
            },
          },
        ],
        'vitest/consistent-test-it': 'error',
        'vitest/consistent-vitest-vi': 'error',
        'vitest/no-alias-methods': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/no-standalone-expect': 'error',
        'vitest/no-test-prefixes': 'error',
        'vitest/no-test-return-statement': 'error',
        'vitest/prefer-called-once': 'error',
        'vitest/prefer-each': 'error',
        'vitest/prefer-importing-vitest-globals': 'error',
        'vitest/prefer-mock-promise-shorthand': 'error',
        'vitest/prefer-spy-on': 'error',
      },
    },
  );
}
