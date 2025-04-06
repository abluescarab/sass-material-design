/**
 * @file Helper file with utility functions.
 */
/**
 * Cycles a data attribute on an element between the given values.
 * @param element - element with data value
 * @param data - data attribute name
 * @param values - values to cycle
 * @returns new data value
 */
export declare function cycleData(element: HTMLElement, data: string, ...values: string[]): string;
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
/**
 * Gets the index of an element among its siblings.
 * @param element - element with a parent
 * @returns index in `parentElement.children`
 */
export declare function childIndex(element: Element | null): number;
/**
 * Gets the closest parent with the given class.
 * @param element - child element
 * @param parentClass - class to search for
 * @param forceStopAtClass - if not found, stop when reaching this class
 * @param includeSelf - whether to check if the current element has the class
 * @returns closest parent with class
 */
export declare function getParentByClassName(element: Element, parentClass: string, forceStopAtClass?: string, includeSelf?: boolean): Element | null;
/**
 * Wraps an element in the specified tag.
 * @param element - element to wrap
 * @param tag - tag to wrap with
 * @param childrenOnly - whether to wrap only the element's children
 * @returns wrapper element
 */
export declare function wrap(element: Element, tag: string, childrenOnly?: boolean): HTMLElement;
/**
 * Capitalizes the first letter of a string.
 * @param str - string to modify
 * @returns capitalized string
 */
export declare function capitalize(str: string): string;
/**
 * Clamps a value between a minimum and maximum.
 * @param value - value to clamp between min and max
 * @param min - minimum allowed value
 * @param max - maximum allowed value
 * @returns value between min and max
 * @throws {RangeError} Minimum must be smaller than maximum.
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Joins a series of strings in order.
 * @param strings - strings to join
 * @returns joined strings
 */
export declare function join(...strings: string[]): string;
/**
 * Converts a string to a selector in the form "element-selector".
 * @param str - string to convert
 * @returns string with whitespace and non-word characters replaced
 */
export declare function stringToSelector(str: string): string;
//# sourceMappingURL=utils.d.mts.map