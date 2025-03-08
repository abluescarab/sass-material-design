/**
 * @file            components/switch.ts
 * @description     Implementation file for switch components.
 */
import { createStyledCheckbox, } from "./checkbox.js";
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
    return createStyledCheckbox("md-switch", track, options);
}
/**
 * Initializes a switch.
 * @param switchElement - switch to initialize
 */
export function initialize(switchElement) {
    if (!(switchElement instanceof HTMLElement) ||
        !switchElement.classList.contains("md-switch")) {
        return;
    }
    const label = create({
        checked: switchElement.dataset.mdChecked != undefined,
        disabled: switchElement.dataset.mdDisabled != undefined,
        labelElement: switchElement.getElementsByTagName("label")[0],
        onlyLabel: true,
    });
    if (switchElement.children.length == 0) {
        switchElement.textContent = "";
        switchElement.appendChild(label);
    }
}
