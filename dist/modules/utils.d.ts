/*******************************************************************************
 * @file            modules/utils.ts
 * @description     Helper file with utility functions.
 ******************************************************************************/
/**
 * Capitalizes the first letter of a string.
 * @param str string to modify
 * @returns capitalized string
 */
export declare function capitalize(str: string | null): string;
/**
 * Cycles a data attribute on an element between the given values.
 * @param element element with data value
 * @param data data attribute name
 * @param values values to cycle
 * @returns new data value
 */
export declare function cycleData(element: Element | null, data: string, ...values: string[]): string | null;
/**
 * Gets the first child element with the given class name.
 * @param parent direct parent
 * @param className class to search for
 * @returns child as {@link HTMLElement}
 */
export declare function getChildByClassName(parent: Element | EventTarget | null, className: string): HTMLElement | null;
/**
 * Gets the closest parent with the given class.
 * @param element child element
 * @param parentClass class to search for
 * @param forceStopAtClass if not found, stop when reaching this class
 * @param includeChild whether to check if the child has the given class
 * @returns closest parent with class
 */
export declare function getParentWithClass(element: Element | EventTarget | null, parentClass: string, forceStopAtClass?: string, includeChild?: boolean): HTMLElement | null;
/**
 * Adds a prefix to a string.
 * @param prefix string to prepend
 * @param str original string
 * @returns string with prefix added
 */
export declare function prefix(prefix: string, str: string): string;
/**
 * Converts a string to a selector in the form "element-selector".
 * @param str string to convert
 * @returns string with whitespace and non-word characters replaced
 */
export declare function stringToSelector(str: string): string;
/**
 * Adds a suffix to a string.
 * @param suffix string to append
 * @param str original string
 * @returns string with suffix added
 */
export declare function suffix(suffix: string, str: string): string;
