/**
 * @file            components/text-field.ts
 * @description     Implementation file for text field components.
 */
import { getChildByClassName } from "../utils.js";
/**
 * Sets the placeholder text at the top of an input container.
 * @param textField - parent text field
 * @param container - container to set placeholder in
 * @param input - input with placeholder attribute
 */
function changePlaceholder(textField, input) {
    if (textField.dataset.mdHideTopPlaceholder) {
        return;
    }
    const container = getChildByClassName(textField, "md-text-field__container");
    if (!(container instanceof HTMLElement)) {
        return;
    }
    container.dataset.mdPlaceholder =
        input.value == "" ? "" : input.placeholder;
}
/**
 * Initializes a text field.
 * @param textField - text field to initialize
 */
export function initialize(textField) {
    if (!textField.classList.contains("md-text-field")) {
        return;
    }
    const input = getChildByClassName(textField, "md-text-field__input");
    if (!(input instanceof HTMLInputElement) &&
        !(input instanceof HTMLTextAreaElement)) {
        return;
    }
    changePlaceholder(textField, input);
    textField.addEventListener("click", (e) => {
        const el = e.target;
        if (el.classList.contains("md-text-field__icon")) {
            // TODO: text field click buttons
        }
    });
    input.addEventListener("input", () => {
        changePlaceholder(textField, input);
    });
}
