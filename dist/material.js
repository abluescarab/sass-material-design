/**
 * @file            src/material.ts
 * @description     Main file.
 */
import { initialize as checkboxInitialize } from "./modules/components/checkbox.js";
import { initialize as segmentedInitialize } from "./modules/components/segmented.js";
import { initialize as switchComponentInitialize } from "./modules/components/switch.js";
import { initialize as tabsInitialize } from "./modules/components/tabs.js";
import { initialize as tooltipInitialize } from "./modules/components/tooltip.js";
import { initialize as treeInitialize } from "./modules/components/tree.js";
import * as menu from "./modules/components/menu.js";
/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize() {
    // TODO: ensure each element is only initialized once?
    const elements = {
        ".md-checkbox": checkboxInitialize,
        ".md-menu": menu.initialize,
        ".md-segmented": segmentedInitialize,
        ".md-switch": switchComponentInitialize,
        ".md-tabs": tabsInitialize,
        ".md-tree": treeInitialize,
        ".md-tooltip": tooltipInitialize,
    };
    for (const [selector, initializer] of Object.entries(elements)) {
        document.querySelectorAll(selector).forEach((e) => initializer(e));
    }
    document.addEventListener("click", (e) => {
        if (!e.target.dataset.mdMenu) {
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
