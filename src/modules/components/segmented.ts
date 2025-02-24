/*******************************************************************************
 * @file           modules/components/segmented.ts
 * @description    Implementation file for segmented button components.
 *******************************************************************************/

import { getParentWithClass } from "../utils.js";

/**
 * Selects or deselects a segment.
 * @param segment clicked segment
 * @param requireSelect whether a segment must be selected
 * @param allowMulti whether multiple segments can be selected
 */
function selectSegment(
    segment: Element | null,
    requireSelect: boolean,
    allowMulti: boolean
): void {
    const selectedClass = "md-segmented__button--selected";
    const select = !segment?.classList.contains(selectedClass);
    const selected =
        segment?.parentElement?.getElementsByClassName(selectedClass) ?? [];

    if (select && !allowMulti) {
        selected[0]?.classList.remove(selectedClass);
    }

    if (
        (select && (allowMulti || selected?.length == 0)) ||
        (!select && (!requireSelect || selected?.length > 1))
    ) {
        segment?.classList.toggle(selectedClass, select);
    }
}

/**
 * Initializes a segmented button.
 * @param element segmented button
 */
export function initialize(element: Element): void {
    if (
        !(element instanceof HTMLElement) ||
        !element.classList.contains("md-segmented")
    ) {
        return;
    }

    for (const child of element.children) {
        const check = document.createElement("span");
        check.classList.add("md-segmented__check", "md-symbol");
        check.innerText = "check";

        child.insertAdjacentElement("afterbegin", check);
    }

    element.addEventListener("click", (e) => {
        const button = getParentWithClass(e.target, "md-segmented__button");

        selectSegment(
            button,
            element.dataset.mdRequireSelect != undefined,
            element.dataset.mdMultiselect != undefined
        );
    });
}
