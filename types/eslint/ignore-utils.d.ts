/** @import { Linter } from "eslint" */
/**
 * The Code copied from @eslint/compat, but with a few modifications to handle it correctly.
 *
 * @param {string} name The name of the eslint rule.
 * @param {string} filePath The absolute path to the ignore file.
 * @returns {Linter.Config[]} An object with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path is not an absolute path.
 */
export function ignore(name: string, filePath: string): Linter.Config[];
import type { Linter } from "eslint";
