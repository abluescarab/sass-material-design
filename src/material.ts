/**
 * @file            src/material.ts
 * @description     Main file.
 */

import * as modules from "./modules/index";

/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize(): void {
    // TODO: ensure each element is only initialized once?
    const initializers = {
        "[data-md-menu]": modules.menu.initialize,
        "[data-md-tooltip]": modules.tooltip.initialize,
        "md-checkbox": modules.checkbox.initialize,
        "md-segmented": modules.segmentedButton.initialize,
        "md-switch": modules.switchButton.initialize,
        "md-table": modules.table.initialize,
        "md-tabs": modules.tabs.initialize,
        "md-text-field": modules.textField.initialize,
        "md-tree": modules.tree.initialize,
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

export * from "./modules/index.js";
