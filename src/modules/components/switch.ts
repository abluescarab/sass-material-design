/**
 * @file            components/switch.ts
 * @description     Implementation file for switch components.
 */

/**
 * Stores options for new switches, usually created with the {@link create()}
 * function.
 */
export interface SwitchOptions {
    /**
     * The ID and name to assign to the component.
     */
    id?: string;
    /**
     * The text inside the label.
     */
    text?: string;
    /**
     * Whether the component should be toggled on.
     */
    checked?: boolean;
    /**
     * Whether the component should be disabled.
     */
    disabled?: boolean;
    /**
     * Whether to return only the label or include the wrapper.
     */
    onlyLabel?: boolean;
}

/**
 * Creates a new switch.
 * @param options - options map
 * @returns new switch
 */
export function create(options?: SwitchOptions): HTMLElement {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = options?.checked ?? false;
    input.disabled = options?.disabled ?? false;

    if (options?.id) {
        input.id = options.id;
        input.name = options.id;
    }

    const track = document.createElement("span");
    track.classList.add("md-switch__track");

    const handle = document.createElement("span");
    handle.classList.add("md-switch__handle");

    const text = document.createElement("span");
    text.classList.add("md-switch__text");
    text.innerText = options?.text ?? "";

    track.appendChild(handle);
    label.appendChild(input);
    label.appendChild(track);
    label.appendChild(text);

    if (options?.onlyLabel) {
        return label;
    }

    const div = document.createElement("div");
    div.classList.add("md-switch");

    div.appendChild(label);

    return div;
}

/**
 * Initializes a switch.
 * @param switchElement - switch to initialize
 */
export function initialize(switchElement: Element): void {
    if (
        !(switchElement instanceof HTMLElement) ||
        !switchElement.classList.contains("md-switch") ||
        switchElement.getElementsByTagName("label").length
    ) {
        return;
    }

    const label = create({
        text: switchElement.innerText,
        checked: switchElement.dataset.mdChecked != undefined,
        disabled: switchElement.dataset.mdDisabled != undefined,
        onlyLabel: true,
    });

    switchElement.innerHTML = "";
    switchElement.appendChild(label);
}
