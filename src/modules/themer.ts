import { cycleData } from "./utils.js";

export function cycleThemes(element: HTMLElement, ...themes: string[]) {
    cycleData(element, "theme", ...themes);
}

export function setTheme(element: HTMLElement, theme: string = "") {
    return cycleThemes(element, theme);
}
