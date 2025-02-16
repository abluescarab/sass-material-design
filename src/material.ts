import * as tabs from "./modules/components/tabs.js";

document.querySelectorAll(".md-tabs").forEach((e) => {
    tabs.initialize(e as HTMLElement);
});

export * from "./modules/themer.js";
export * from "./modules/utils.js";

console.info("Material design loaded.");
