import * as tabs from "./modules/components/tabs.js";
document.querySelectorAll(".material-tabs").forEach((e) => {
    tabs.initialize(e);
});
export { setTheme, cycleThemes } from "./modules/themer.js";
console.info("Material design loaded.");
