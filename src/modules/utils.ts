/**
 * @file Helper file with utility functions.
 */

/* -----------------------------------------------------------------------------
 * Dataset helpers
 * -------------------------------------------------------------------------- */
/**
 * Cycles a data attribute on an element between the given values.
 * @param element - element with data value
 * @param data - data attribute name
 * @param values - values to cycle
 * @returns new data value
 */
export function cycleData(
    element: HTMLElement,
    data: string,
    ...values: string[]
): string {
    const dataName = `md${capitalize(data)}`;
    const dataValue = element.dataset[dataName];
    let index = 0;

    if (dataValue != null) {
        index = (values.indexOf(dataValue) + 1) % values.length;
    }

    const newValue = values[index];
    element.dataset[dataName] = newValue;
    return newValue;
}

/**
 * Cycles an element between the given themes.
 * @param element - element to theme
 * @param themes - theme names
 * @returns new theme
 */
export function cycleThemes(element: HTMLElement, ...themes: string[]): string {
    return cycleData(element, "theme", ...themes);
}

/**
 * Sets the theme on the given element.
 * @param element - element to theme
 * @param theme - theme to change to
 * @returns new theme
 */
export function setTheme(element: HTMLElement, theme: string = ""): string {
    return cycleThemes(element, theme);
}

/* -----------------------------------------------------------------------------
 * HTML helpers
 * -------------------------------------------------------------------------- */
/**
 * Gets the index of an element among its siblings.
 * @param element - element with a parent
 * @returns index in `parentElement.children`
 */
export function childIndex(element: Element | null): number {
    if (!element) {
        return -1;
    }

    return Array.prototype.indexOf.call(
        element.parentElement?.children,
        element
    );
}

/**
 * Gets the closest parent with the given class.
 * @param element - child element
 * @param parentClass - class to search for
 * @param forceStopAtClass - if not found, stop when reaching this class
 * @param includeSelf - whether to check if the current element has the class
 * @returns closest parent with class
 */
export function getParentByClassName(
    element: Element,
    parentClass: string,
    forceStopAtClass: string = "",
    includeSelf: boolean = true
): Element | null {
    if (includeSelf) {
        if (element.classList.contains(parentClass)) {
            return element;
        }

        if (forceStopAtClass && element.classList.contains(forceStopAtClass)) {
            return null;
        }
    }

    if (!element.parentElement) {
        return null;
    }

    return getParentByClassName(
        element.parentElement,
        parentClass,
        forceStopAtClass,
        true
    );
}

/**
 * Wraps an element in the specified tag.
 * @param element - element to wrap
 * @param tag - tag to wrap with
 * @param childrenOnly - whether to wrap only the element's children
 * @returns wrapper element
 */
export function wrap(
    element: Element,
    tag: string,
    childrenOnly: boolean = false
): HTMLElement {
    const wrapper = document.createElement(tag);

    if (childrenOnly) {
        while (element.firstChild) {
            wrapper.appendChild(element.firstChild);
        }

        element.appendChild(wrapper);
    } else {
        element.insertAdjacentElement("beforebegin", wrapper);
        wrapper.appendChild(element);
    }

    return wrapper;
}

/* -----------------------------------------------------------------------------
 * Primitive type helpers
 * -------------------------------------------------------------------------- */
/**
 * Capitalizes the first letter of a string.
 * @param str - string to modify
 * @returns capitalized string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

/**
 * Clamps a value between a minimum and maximum.
 * @param value - value to clamp between min and max
 * @param min - minimum allowed value
 * @param max - maximum allowed value
 * @returns value between min and max
 * @throws {RangeError} Minimum must be smaller than maximum.
 */
export function clamp(value: number, min: number, max: number) {
    if (min >= max) {
        throw RangeError(`Minimum must be smaller than maximum.`);
    }

    return value <= min ? min : value >= max ? max : value;
}

/**
 * Joins a series of strings in order.
 * @param strings - strings to join
 * @returns joined strings
 */
export function join(...strings: string[]): string {
    return strings.join("");
}

/**
 * Converts a string to a selector in the form "element-selector".
 * @param str - string to convert
 * @returns string with whitespace and non-word characters replaced
 */
export function stringToSelector(str: string): string {
    // shortcut if string is empty
    if (!str) {
        return str;
    }

    return str
        .replaceAll(/[^\w\s]/g, "") // non-whitespace, non-word characters
        .replaceAll(/([a-z])([A-Z])|\s/g, "$1-$2") // whitespace or uppercase after lowercase
        .toLowerCase();
}
