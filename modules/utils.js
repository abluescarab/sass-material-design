export function capitalize(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
export function cycleData(element, data, ...values) {
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
export function getChildByClassName(parent, className) {
    if (!parent) {
        return null;
    }
    return parent.getElementsByClassName(className)[0];
}
export function getParentWithClass(element, parentClass, includeChild = true) {
    if (element == null || !(element instanceof HTMLElement)) {
        return null;
    }
    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }
    return getParentWithClass(element.parentElement, parentClass, true);
}
