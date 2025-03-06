/**
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 */
/**
 * Creates a new checkbox.
 * @param options - options map
 * @returns new checkbox
 */
export function create(options) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = options?.checked ?? false;
    input.disabled = options?.disabled ?? false;
    input.indeterminate = options?.indeterminate ?? false;
    if (options?.id) {
        input.id = options.id;
        input.name = options.id;
    }
    const box = document.createElement("span");
    box.classList.add("md-checkbox__box");
    const text = document.createElement("span");
    text.classList.add("md-checkbox__text");
    text.innerText = options?.text ?? "";
    label.appendChild(input);
    label.appendChild(box);
    label.appendChild(text);
    if (options?.onlyLabel) {
        return label;
    }
    const div = document.createElement("div");
    div.classList.add("md-checkbox");
    div.appendChild(label);
    return div;
}
/**
 * Initializes a checkbox.
 * @param checkbox - checkbox to initialize
 */
export function initialize(checkbox) {
    if (!(checkbox instanceof HTMLElement) ||
        !checkbox.classList.contains("md-checkbox") ||
        checkbox.getElementsByTagName("label").length) {
        return;
    }
    const label = create({
        text: checkbox.innerText,
        checked: checkbox.dataset.mdChecked != undefined,
        disabled: checkbox.dataset.mdDisabled != undefined,
        indeterminate: checkbox.dataset.mdIndeterminate != undefined,
        onlyLabel: true,
    });
    checkbox.innerHTML = "";
    checkbox.appendChild(label);
}
