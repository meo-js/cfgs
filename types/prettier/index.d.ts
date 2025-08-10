/**
 * @typedef Options
 *
 * @property {boolean} [tailwindcss] 是否使用 Tailwind CSS，默认 `false`
 */
/**
 * @param {Options} opts
 * @returns {import('prettier').Config}
 */
export function config(opts?: Options): import("prettier").Config;
export type Options = {
    /**
     * 是否使用 Tailwind CSS，默认 `false`
     */
    tailwindcss?: boolean;
};
