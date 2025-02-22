export function capitalize(str: string) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export function cycleData(
    element: Element | null,
    data: string,
    ...values: string[]
) {
    if (!element || !(element instanceof HTMLElement)) {
        return;
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

export function getChildByClassName(parent: Element | null, className: string) {
    if (!parent) {
        return null;
    }

    return (parent as HTMLElement).getElementsByClassName(
        className
    )[0] as HTMLElement;
}

export function getParentWithClass(
    element: Element | null,
    parentClass: string,
    includeChild: boolean = true
) {
    if (element == null || !(element instanceof HTMLElement)) {
        return null;
    }

    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }

    return getParentWithClass(element.parentElement, parentClass, true);
}
