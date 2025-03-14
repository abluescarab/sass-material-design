/**
 * @file            components/text-field.ts
 * @description     Implementation file for text field components.
 */

import { getChildByClassName } from "../utils.js";

/**
 * Sets the placeholder text at the top of an input container.
 * @param textField - parent text field
 * @param input - input with placeholder attribute
 */
function changePlaceholder(
    textField: HTMLElement,
    input: HTMLInputElement | HTMLTextAreaElement
) {
    if (textField.dataset.mdHideTopPlaceholder) {
        return;
    }

    const container = getChildByClassName(
        textField,
        "md-text-field__container"
    );

    if (!(container instanceof HTMLElement)) {
        return;
    }

    container.dataset.mdPlaceholder =
        input.value == "" ? "" : input.placeholder;
}

function moveInput(
    textField: HTMLElement,
    input: HTMLInputElement | HTMLTextAreaElement
) {
    const prefix = getChildByClassName(textField, "md-text-field__prefix");

    if (!(prefix instanceof HTMLElement)) {
        return;
    }

    const rect = prefix.getBoundingClientRect();

    if (rect.x < -rect.width && rect.y < -rect.height) {
        input.style.left = `${-rect.width}px`;
    } else {
        input.style.left = "";
    }
}

/**
 * Initializes a text field.
 * @param textField - text field to initialize
 */
export function initialize(textField: HTMLElement): void {
    if (!textField.classList.contains("md-text-field")) {
        return;
    }

    const input = getChildByClassName(textField, "md-text-field__input");

    if (
        !(input instanceof HTMLInputElement) &&
        !(input instanceof HTMLTextAreaElement)
    ) {
        return;
    }

    changePlaceholder(textField, input);
    moveInput(textField, input);

    textField.addEventListener("click", (e) => {
        const el = e.target as HTMLElement;

        if (el.classList.contains("md-text-field__icon")) {
            // TODO: text field click buttons
        }
    });

    input.addEventListener("input", () => {
        changePlaceholder(textField, input);
        moveInput(textField, input);
    });
}
