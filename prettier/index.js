/**
 * @typedef Options
 *
 * @property {boolean} [tailwindcss] 是否使用 Tailwind CSS，默认 `false`
 */

/**
 * @param {Options} opts
 * @returns {import('prettier').Config}
 */
export function config(opts = {}) {
  const { tailwindcss } = opts;

  /** @type {import('prettier').Config} */
  const cfg = {
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
    plugins: ['prettier-plugin-organize-imports'],
  };

  if (!cfg.plugins) {
    cfg.plugins = [];
  }

  if (tailwindcss) {
    cfg.plugins.push('prettier-plugin-tailwindcss');
  }

  return cfg;
}
