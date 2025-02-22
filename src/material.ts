import * as tabs from "./modules/components/tabs.js";
import * as tree from "./modules/components/tree.js";

export function initialize() {
    document.querySelectorAll(".md-tabs").forEach((e) => {
        tabs.initialize(e as HTMLElement);
    });

    document.querySelectorAll(".md-tree").forEach((e) => {
        tree.initialize(e as HTMLElement);
    });

    console.info("Material design loaded.");
}

export * from "./modules/themer.js";
export * from "./modules/utils.js";
