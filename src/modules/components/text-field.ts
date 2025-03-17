/**
 * @file            components/text-field.ts
 * @description     Implementation file for text field components.
 */

function moveInput(
    textField: HTMLElement,
    input: HTMLInputElement | HTMLTextAreaElement,
    hide: boolean
) {
    const prefix = textField.getElementsByClassName("md-text-field__prefix")[0];

    if (!(prefix instanceof HTMLElement)) {
        return;
    }

    const rect = prefix.getBoundingClientRect();

    if (hide) {
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

    const input = textField.getElementsByClassName("md-text-field__input")[0];
    const container = textField.getElementsByClassName(
        "md-text-field__container"
    )[0];

    if (
        !(container instanceof HTMLElement) ||
        (!(input instanceof HTMLInputElement) &&
            !(input instanceof HTMLTextAreaElement))
    ) {
        return;
    }

    container.dataset.mdPlaceholder = input.placeholder;

    moveInput(textField, input, input.value == "");

    textField.addEventListener("click", (e) => {
        const el = e.target as HTMLElement;

        if (el.classList.contains("md-text-field__icon")) {
            // TODO: text field click buttons
        }
    });

    input.addEventListener("focus", () => {
        moveInput(textField, input, false);
    });

    input.addEventListener("blur", () => {
        moveInput(textField, input, input.value == "");
    });
}
