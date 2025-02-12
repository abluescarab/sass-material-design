export function getParentWithClass(
    element: HTMLElement | null,
    parentClass: string,
    includeChild: boolean = true
) {
    if (element == null) {
        return null;
    }

    if (includeChild && element.classList.contains(parentClass)) {
        return element;
    }

    return getParentWithClass(element.parentElement, parentClass, true);
}
