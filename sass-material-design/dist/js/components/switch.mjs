/**
 * @file Implementation file for switch components.
 */
import { createStyled } from "./checkbox.mjs";
/**
 * Creates a new switch.
 * @param options - options map
 * @returns new switch
 */
export function create(options) {
    const track = document.createElement("span");
    track.classList.add("md-switch__track");
    const handle = document.createElement("span");
    handle.classList.add("md-switch__handle");
    track.appendChild(handle);
    return createStyled("md-switch", track, options);
}
/**
 * Initializes a switch.
 * @param switchElement - switch to initialize
 */
export function initialize(switchElement) {
    if (!switchElement.classList.contains("md-switch")) {
        return;
    }
    const label = create({
        checked: switchElement.dataset.mdChecked != undefined,
        disabled: switchElement.dataset.mdDisabled != undefined,
        onlyLabel: true,
        text: switchElement.textContent ?? "",
    });
    if (switchElement.children.length == 0) {
        switchElement.textContent = "";
        switchElement.appendChild(label);
    }
}
//# sourceMappingURL=switch.mjs.map