/**
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 */

/**
 * Represents the options given to a styled checkbox in the
 * {@link createStyledCheckbox()} function.
 */
export interface MaterialStyledCheckboxOptions {
    /**
     * Whether the checkbox should be toggled on.
     */
    checked?: boolean;
    /**
     * Whether the checkbox should be disabled.
     */
    disabled?: boolean;
    /**
     * The ID and name to assign to the checkbox.
     */
    id?: string;
    /**
     * Whether the checkbox should be in an indeterminate state.
     */
    indeterminate?: boolean;
    /**
     * A label element to overwrite with the contents of the checkbox.
     */
    labelElement?: HTMLElement;
    /**
     * Whether to return only the label or include the wrapper.
     */
    onlyLabel?: boolean;
    /**
     * The text inside the label.
     */
    text?: string;
}

/**
 * Creates a checkbox that shows the given display element. Unless creating a
 * new component, use the `create()` functions for either the
 * {@link create() checkbox} or [switch](./switch.ts).
 * @param className - wrapper class name
 * @param displayElement - element to display instead of the default checkbox
 * @param options - options map
 * @returns label or wrapper element depending on value of {@link MaterialStyledCheckboxOptions.onlyLabel}
 */
export function createStyledCheckbox(
    className: string,
    displayElement: HTMLElement,
    options?: MaterialStyledCheckboxOptions
): HTMLElement {
    const label =
        options?.labelElement instanceof HTMLLabelElement
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
export function create(options?: MaterialStyledCheckboxOptions): HTMLElement {
    const box = document.createElement("span");
    box.classList.add("md-checkbox__box");

    return createStyledCheckbox("md-checkbox", box, options);
}

/**
 * Initializes a checkbox.
 * @param checkbox - checkbox to initialize
 */
export function initialize(checkbox: HTMLElement): void {
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
