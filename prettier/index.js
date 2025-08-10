/**
 * 基础配置.
 *
 * @type {import('prettier').Config}
 */
export const config = {
  experimentalTernaries: false,
  experimentalOperatorPosition: 'start',
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  trailingComma: 'all',
  bracketSpacing: true,
  objectWrap: 'preserve',
  bracketSameLine: false,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};
