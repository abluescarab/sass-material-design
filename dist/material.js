/*******************************************************************************
 * @file           src/material.ts
 * @description    Main file.
 *******************************************************************************/
import * as segmented from "./modules/components/segmented.js";
import * as tabs from "./modules/components/tabs.js";
import * as tree from "./modules/components/tree.js";
/**
 * Initializes dynamically generated Material Design elements.
 * Call this when the document loads.
 */
export function initialize() {
    document.querySelectorAll(".md-tabs").forEach((e) => {
        tabs.initialize(e);
    });
    document.querySelectorAll(".md-tree").forEach((e) => {
        tree.initialize(e);
    });
    document.querySelectorAll(".md-segmented").forEach((e) => {
        segmented.initialize(e);
    });
    console.info("Material design loaded.");
}
export * from "./modules/events.js";
export * from "./modules/themer.js";
export * from "./modules/utils.js";
