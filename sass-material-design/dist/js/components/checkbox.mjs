/**
 * @file Implementation file for checkbox components.
 */
/**
 * Creates a checkbox that shows the given display element. Unless creating a
 * new component, use the `create()` functions for either the
 * {@link create() checkbox} or [switch](./switch.ts).
 * @param className - wrapper class name
 * @param displayElement - element to display instead of the default checkbox
 * @param options - options map
 * @returns label or wrapper element depending on value of {@link MaterialStyledCheckboxOptions.onlyLabel}
 */
export function createStyled(className, displayElement, options) {
    const label = options?.labelElement instanceof HTMLLabelElement
        ? options.labelElement
        : document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = options?.checked ?? false;
    input.disabled = options?.disabled ?? false;
    input.indeterminate = options?.indeterminate ?? false;
    if (options?.id) {
        input.id = options.id;
        input.name = options.id;
    }
    const text = document.createElement("span");
    text.classList.add(`${className}__text`);
    text.textContent =
        options?.text ?? options?.labelElement?.textContent ?? "";
    if (options?.labelElement) {
        options.labelElement.innerHTML = "";
    }
    label.appendChild(input);
    label.appendChild(displayElement);
    label.appendChild(text);
    if (options?.onlyLabel) {
        return label;
    }
    const div = document.createElement("div");
    div.classList.add(className);
    div.appendChild(label);
    return div;
}
/**
 * Creates a new checkbox.
 * @param options - options map
 * @returns new checkbox
 */
export function create(options) {
    const box = document.createElement("span");
    box.classList.add("md-checkbox__box");
    return createStyled("md-checkbox", box, options);
}
/**
 * Initializes a checkbox.
 * @param checkbox - checkbox to initialize
 */
export function initialize(checkbox) {
    if (!checkbox.classList.contains("md-checkbox")) {
        return;
    }
    const label = create({
        checked: checkbox.dataset.mdChecked != undefined,
        disabled: checkbox.dataset.mdDisabled != undefined,
        indeterminate: checkbox.dataset.mdIndeterminate != undefined,
        onlyLabel: true,
        text: checkbox.textContent ?? "",
    });
    if (checkbox.children.length == 0) {
        checkbox.textContent = "";
        checkbox.appendChild(label);
    }
}
//# sourceMappingURL=checkbox.mjs.map