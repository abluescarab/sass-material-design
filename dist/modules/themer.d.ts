/**
 * @file            modules/themer.ts
 * @description     Helper file with theming functions.
 */
/**
 * Cycles an element between the given themes.
 * @param element - element to theme
 * @param themes - theme names
 * @returns new theme
 */
export declare function cycleThemes(element: HTMLElement, ...themes: string[]): string;
/**
 * Sets the theme on the given element.
 * @param element - element to theme
 * @param theme - theme to change to
 * @returns new theme
 */
export declare function setTheme(element: HTMLElement, theme?: string): string;
