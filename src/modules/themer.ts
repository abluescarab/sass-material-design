import { cycleData } from "./utils.js";

export function cycleThemes(element: Element, ...themes: string[]) {
    return cycleData(element, "theme", ...themes);
}

export function setTheme(element: Element, theme: string = "") {
    return cycleThemes(element, theme);
}
