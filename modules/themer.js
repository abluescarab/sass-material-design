import { cycleData } from "./utils.js";
export function cycleThemes(element, ...themes) {
    cycleData(element, "theme", ...themes);
}
export function setTheme(element, theme = "") {
    return cycleThemes(element, theme);
}
