import * as tabs from "./modules/components/tabs.js";

document.querySelectorAll(".material-tabs").forEach((e) => {
    tabs.initialize(e as HTMLElement);
});

export { setTheme, cycleThemes } from "./modules/themer.js";
