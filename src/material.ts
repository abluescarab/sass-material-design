import * as tabs from "./modules/components/tabs.js";

document.querySelectorAll(".md-tabs").forEach((e) => {
    tabs.initialize(e as HTMLElement);
});

export { setTheme, cycleThemes } from "./modules/themer.js";
export { getParentWithClass } from "./modules/utils.js";

console.info("Material design loaded.");
