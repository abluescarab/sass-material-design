/**
 * @file ESLint config file.
 */

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    jsdoc.configs["flat/stylistic-typescript"],
    {
        plugins: { jsdoc },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
    },
    {
        languageOptions: { globals: globals.browser },
    },
    {
        rules: {
            "jsdoc/check-access": "warn", // Recommended
            "jsdoc/check-alignment": "warn", // Recommended
            "jsdoc/check-examples": "off",
            "jsdoc/check-indentation": "off",
            "jsdoc/check-line-alignment": "warn",
            "jsdoc/check-param-names": "warn", // Recommended
            "jsdoc/check-template-names": "warn",
            "jsdoc/check-property-names": "warn", // Recommended
            "jsdoc/check-syntax": "warn",
            "jsdoc/check-tag-names": "warn", // Recommended
            "jsdoc/check-types": "warn", // Recommended
            "jsdoc/check-values": "warn", // Recommended
            "jsdoc/empty-tags": "warn", // Recommended
            "jsdoc/implements-on-classes": "warn", // Recommended
            "jsdoc/informative-docs": "warn",
            "jsdoc/lines-before-block": "off",
            "jsdoc/match-description": "warn",
            "jsdoc/multiline-blocks": "warn", // Recommended
            "jsdoc/no-bad-blocks": "warn",
            "jsdoc/no-blank-block-descriptions": "warn",
            "jsdoc/no-defaults": "warn",
            "jsdoc/no-missing-syntax": "off",
            "jsdoc/no-multi-asterisks": "warn", // Recommended
            "jsdoc/no-restricted-syntax": "off",
            "jsdoc/no-types": "warn",
            "jsdoc/no-undefined-types": "warn", // Recommended
            "jsdoc/require-asterisk-prefix": "warn",
            "jsdoc/require-description": "warn",
            "jsdoc/require-description-complete-sentence": "off",
            "jsdoc/require-example": "off",
            "jsdoc/require-file-overview": "warn",
            "jsdoc/require-hyphen-before-param-description": "warn",
            "jsdoc/require-jsdoc": "warn", // Recommended
            "jsdoc/require-param": "warn", // Recommended
            "jsdoc/require-param-description": "warn", // Recommended
            "jsdoc/require-param-name": "warn", // Recommended
            "jsdoc/require-param-type": "warn", // Recommended
            "jsdoc/require-property": "warn", // Recommended
            "jsdoc/require-property-description": "warn", // Recommended
            "jsdoc/require-property-name": "warn", // Recommended
            "jsdoc/require-property-type": "warn", // Recommended
            "jsdoc/require-returns": "warn", // Recommended
            "jsdoc/require-returns-check": "warn", // Recommended
            "jsdoc/require-returns-description": "warn", // Recommended
            "jsdoc/require-returns-type": "warn", // Recommended
            "jsdoc/require-template": "warn",
            "jsdoc/require-throws": "warn",
            "jsdoc/require-yields": "warn", // Recommended
            "jsdoc/require-yields-check": "warn", // Recommended
            "jsdoc/sort-tags": "warn",
            "jsdoc/tag-lines": "warn", // Recommended
            "jsdoc/valid-types": "warn", // Recommended
        },
    },
    {
        files: ["**/*.ts"],
        rules: {
            "jsdoc/require-hyphen-before-param-description": ["warn", "always"],
            "jsdoc/require-param-type": "off", // Recommended
            "jsdoc/require-property-type": "off", // Recommended
            "jsdoc/require-returns-type": "off", // Recommended
        },
    },
];
