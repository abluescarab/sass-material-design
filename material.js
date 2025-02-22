import * as tabs from "./modules/components/tabs.js";
import * as tree from "./modules/components/tree.js";
export function initialize() {
    document.querySelectorAll(".md-tabs").forEach((e) => {
        tabs.initialize(e);
    });
    document.querySelectorAll(".md-tree").forEach((e) => {
        tree.initialize(e);
    });
    console.info("Material design loaded.");
}
export * from "./modules/themer.js";
export * from "./modules/utils.js";
