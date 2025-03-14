/**
 * @file            modules/utils.ts
 * @description     Helper file with utility functions.
 */

/**
 * Capitalizes the first letter of a string.
 * @param str - string to modify
 * @returns capitalized string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

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
 * Gets the first child element with the given class name.
 * @param parent - direct parent
 * @param className - class to search for
 * @returns child as {@link HTMLElement}
 */
export function getChildByClassName(
    parent: Element,
    className: string
): Element {
    return parent.getElementsByClassName(className)[0];
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
