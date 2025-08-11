/**
 * @returns {import('stylelint').Config}
 */
export function config() {
  return {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recess-order',
      'stylelint-config-html',
    ],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
  };
}
