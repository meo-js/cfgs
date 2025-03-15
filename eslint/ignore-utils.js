import { convertIgnorePatternToMinimatch } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import { existsSync, readFileSync } from "fs";
import { isAbsolute } from "path";

/** @import { Linter } from "eslint" */

/**
 * The Code copied from @eslint/compat, but with a few modifications to handle it correctly.
 *
 * @param {string} name The name of the eslint rule.
 * @param {string} filePath The absolute path to the ignore file.
 * @returns {Linter.Config[]} An object with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path is not an absolute path.
 */
export function ignore(name, filePath) {
    if (!isAbsolute(filePath)) {
        throw new Error("The ignore file location must be an absolute path.");
    }

    if (!existsSync(filePath)) {
        return [];
    }

    const ignoreFile = readFileSync(filePath, "utf8");
    const lines = ignoreFile.split(/\r?\n/u);

    return defineConfig({
        name,
        ignores: lines
            .map(line => line.trim())
            .filter(line => line && !line.startsWith("#"))
            // no '/' then no dir
            .map(v => (v.at(-1) === "/" ? [v] : [v, v + "/"]))
            .flat(1)
            .map(convertIgnorePatternToMinimatch),
    });
}
