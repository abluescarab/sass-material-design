/**
 * @file Main file.
 */

import * as components from "./modules/components/index";

/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize(): void {
    // TODO: ensure each element is only initialized once?
    const initializers = {
        "[data-md-menu]": components.menu.initialize,
        "[data-md-tooltip]": components.tooltip.initialize,
        "md-checkbox": components.checkbox.initialize,
        "md-segmented": components.segmentedButton.initialize,
        "md-switch": components.switchButton.initialize,
        "md-table": components.table.initialize,
        "md-tabs": components.tabs.initialize,
        "md-text-field": components.textField.initialize,
        "md-tree": components.tree.initialize,
    };

    for (const [selector, initializer] of Object.entries(initializers)) {
        // treat selectors starting with md- as class names
        const elements = selector.startsWith("md-")
            ? document.getElementsByClassName(selector)
            : document.querySelectorAll<HTMLElement>(selector);

        for (const element of elements) {
            initializer(element as HTMLElement);
        }
    }

    // document.addEventListener("click", (e) => {
    //     if (e.target instanceof HTMLElement && !e.target?.dataset.mdMenu) {
    //         menu.hideAll(true);
    //     }
    // });

    // window.addEventListener("resize", () => {
    //     menu.hideAll(true);
    // });

    // window.addEventListener("scroll", () => {
    //     menu.hideAll(true);
    // });

    console.info("Material design loaded.");
}
