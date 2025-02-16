export function capitalize(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
export function getParentWithClass(element, parentClass, includeChild = true) {
    if (element == null) {
        return null;
    }
    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }
    return getParentWithClass(element.parentElement, parentClass, true);
}
export function cycleData(element, data, ...values) {
    if (!element) {
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
