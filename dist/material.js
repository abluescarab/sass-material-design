/*******************************************************************************
 * @file            src/material.ts
 * @description     Main file.
 ******************************************************************************/
import { initialize as checkboxInitialize } from "./modules/components/checkbox.js";
import { initialize as segmentedInitialize } from "./modules/components/segmented.js";
import { initialize as switchComponentInitialize } from "./modules/components/switch.js";
import { initialize as tabsInitialize } from "./modules/components/tabs.js";
import { initialize as tooltipInitialize } from "./modules/components/tooltip.js";
import { initialize as treeInitialize } from "./modules/components/tree.js";
/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads or initialize each element yourself.
 */
export function initialize() {
    const elements = {
        ".md-checkbox": checkboxInitialize,
        ".md-segmented": segmentedInitialize,
        ".md-switch": switchComponentInitialize,
        ".md-tabs": tabsInitialize,
        ".md-tree": treeInitialize,
        "[data-md-tooltip]": tooltipInitialize,
    };
    for (const [selector, initializer] of Object.entries(elements)) {
        document.querySelectorAll(selector).forEach((e) => initializer(e));
    }
    console.info("Material design loaded.");
}
export * from "./modules/events.js";
export * from "./modules/themer.js";
export * from "./modules/types.js";
export * from "./modules/utils.js";
