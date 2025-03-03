/*******************************************************************************
 * @file            src/material.ts
 * @description     Main file.
 ******************************************************************************/
import * as checkbox from "./modules/components/checkbox.js";
import * as segmented from "./modules/components/segmented.js";
import * as switchComponent from "./modules/components/switch.js";
import * as tabs from "./modules/components/tabs.js";
import * as tooltip from "./modules/components/tooltip.js";
import * as tree from "./modules/components/tree.js";
/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads or initialize each element yourself.
 */
export function initialize() {
    const elements = {
        ".md-checkbox": checkbox.initialize,
        ".md-segmented": segmented.initialize,
        ".md-switch": switchComponent.initialize,
        ".md-tabs": tabs.initialize,
        ".md-tree": tree.initialize,
        "[data-md-tooltip]": tooltip.initialize,
    };
    for (const [selector, initializer] of Object.entries(elements)) {
        document.querySelectorAll(selector).forEach((e) => initializer(e));
    }
    console.info("Material design loaded.");
}
export * from "./modules/events.js";
export * from "./modules/themer.js";
export * from "./modules/utils.js";
