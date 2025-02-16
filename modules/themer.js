import { cycleData } from "./utils.js";
export function cycleThemes(element, ...themes) {
    return cycleData(element, "theme", ...themes);
}
export function setTheme(element, theme = "") {
    return cycleThemes(element, theme);
}
