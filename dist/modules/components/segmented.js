/*******************************************************************************
 * @file            modules/components/segmented.ts
 * @description     Implementation file for Material Design segmented button
 *                  components.
 ******************************************************************************/
import { getParentByClassName } from "../utils.js";
/**
 * Selects or deselects a segment.
 * @param segment clicked segment
 * @param requireSelect whether a segment must be selected
 * @param allowMulti whether multiple segments can be selected
 */
function selectSegment(segment, requireSelect, allowMulti) {
    const selectedClass = "md-segmented__button--selected";
    const select = !segment?.classList.contains(selectedClass);
    const selected = segment?.parentElement?.getElementsByClassName(selectedClass) ?? [];
    if (select && !allowMulti) {
        selected[0]?.classList.remove(selectedClass);
    }
    if ((select && (allowMulti || selected?.length == 0)) ||
        (!select && (!requireSelect || selected?.length > 1))) {
        segment?.classList.toggle(selectedClass, select);
    }
}
/**
 * Initializes a segmented button.
 * @param segmentedButton segmented button
 */
export function initialize(segmentedButton) {
    if (!(segmentedButton instanceof HTMLElement) ||
        !segmentedButton.classList.contains("md-segmented")) {
        return;
    }
    for (const child of segmentedButton.children) {
        const check = document.createElement("span");
        check.classList.add("md-segmented__check", "md-symbol");
        check.innerText = "check";
        child.insertAdjacentElement("afterbegin", check);
    }
    segmentedButton.addEventListener("click", (e) => {
        const parent = getParentByClassName(e.target, "md-segmented__button");
        selectSegment(parent, segmentedButton.dataset.mdRequireSelect != undefined, segmentedButton.dataset.mdMultiselect != undefined);
    });
}
