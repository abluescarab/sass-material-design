/*******************************************************************************
 * @file           modules/utils.ts
 * @description    Helper file with utility functions.
 *******************************************************************************/

/**
 * Capitalizes the first letter of a string.
 * @param str string to modify
 * @returns capitalized string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

/**
 * Cycles a data attribute on an element between the given values.
 * @param element element with data value
 * @param data data attribute name
 * @param values values to cycle
 * @returns new data value
 */
export function cycleData(
    element: Element | null,
    data: string,
    ...values: string[]
): string | null {
    if (!element || !(element instanceof HTMLElement)) {
        return null;
    }

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
 * Gets the first child of an element by its class name.
 * @param parent direct parent
 * @param className class to search by
 * @returns child as {@link HTMLElement}
 */
export function getChildByClassName(
    parent: Element | null,
    className: string
): HTMLElement | null {
    if (!parent) {
        return null;
    }

    return (parent as HTMLElement).getElementsByClassName(
        className
    )[0] as HTMLElement;
}

/**
 * Gets the closest parent with the given class.
 * @param element child element
 * @param parentClass class to search for
 * @param includeChild whether to check if the child has the given class
 * @returns closest parent with class
 */
export function getParentWithClass(
    element: Element | null,
    parentClass: string,
    includeChild: boolean = true
): HTMLElement | null {
    if (element == null || !(element instanceof HTMLElement)) {
        return null;
    }

    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }

    return getParentWithClass(element.parentElement, parentClass, true);
}
