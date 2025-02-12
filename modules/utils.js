export function getParentWithClass(element, parentClass, includeChild = true) {
    if (element == null) {
        return null;
    }
    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }
    return getParentWithClass(element.parentElement, parentClass, true);
}
