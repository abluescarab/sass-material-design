/*******************************************************************************
 * @file            modules/themer.ts
 * @description     Helper file with theming functions.
 ******************************************************************************/
import { cycleData } from "./utils.js";
/**
 * Cycles an element between the given themes.
 * @param element element to theme
 * @param themes theme names
 * @returns new theme
 */
export function cycleThemes(element, ...themes) {
    return cycleData(element, "theme", ...themes);
}
/**
 * Sets the theme on the given element.
 * @param element element to theme
 * @param theme theme to change to
 * @returns new theme
 */
export function setTheme(element, theme = "") {
    return cycleThemes(element, theme);
}
