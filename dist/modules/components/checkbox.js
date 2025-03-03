/*******************************************************************************
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 ******************************************************************************/
/**
 * Creates a new checkbox.
 * @param options options map
 * @returns new checkbox
 */
export function create(options) {
    const div = document.createElement("div");
    div.classList.add("md-checkbox");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = options?.checked ?? false;
    input.disabled = options?.disabled ?? false;
    input.indeterminate = options?.indeterminate ?? false;
    const boxSpan = document.createElement("span");
    boxSpan.classList.add("md-checkbox__box");
    const textSpan = document.createElement("span");
    textSpan.classList.add("md-checkbox__text");
    textSpan.innerText = options?.text ?? "";
    label.appendChild(input);
    label.appendChild(boxSpan);
    label.appendChild(textSpan);
    div.appendChild(label);
    return div;
}
