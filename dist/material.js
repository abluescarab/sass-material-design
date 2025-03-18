/**
 * @file            src/material.ts
 * @description     Main file.
 */
import { initialize as checkboxInitialize } from "./modules/components/checkbox.js";
import { initialize as segmentedInitialize } from "./modules/components/segmented.js";
import { initialize as switchComponentInitialize } from "./modules/components/switch.js";
import { initialize as tabsInitialize } from "./modules/components/tabs.js";
import { initialize as textFieldInitialize } from "./modules/components/text-field.js";
import { initialize as tooltipInitialize } from "./modules/components/tooltip.js";
import { initialize as treeInitialize } from "./modules/components/tree.js";
import * as menu from "./modules/components/menu.js";
/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize() {
    // TODO: ensure each element is only initialized once?
    const initializers = {
        "md-checkbox": checkboxInitialize,
        "md-menu": menu.initialize,
        "md-segmented": segmentedInitialize,
        "md-switch": switchComponentInitialize,
        "md-tabs": tabsInitialize,
        "md-text-field": textFieldInitialize,
        "md-tree": treeInitialize,
        "[data-md-tooltip]": tooltipInitialize,
    };
    for (const [selector, initializer] of Object.entries(initializers)) {
        // treat selectors starting with md- as class names
        const elements = selector.startsWith("md-")
            ? document.getElementsByClassName(selector)
            : document.querySelectorAll(selector);
        for (const element of elements) {
            initializer(element);
        }
    }
    document.addEventListener("click", (e) => {
        if (e.target instanceof HTMLElement && !e.target?.dataset.mdMenu) {
            menu.hideAll(true);
        }
    });
    window.addEventListener("resize", () => {
        menu.hideAll(true);
    });
    window.addEventListener("scroll", () => {
        menu.hideAll(true);
    });
    console.info("Material design loaded.");
}
export * from "./modules/types/events.js";
export * from "./modules/themer.js";
export * from "./modules/types/index.js";
export * from "./modules/utils.js";
