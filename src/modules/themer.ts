export function cycleThemes(element: HTMLElement, themes: string[] = []) {
    const themePrefix = "material-theme--";
    const themeMatch = element.className.match(
        new RegExp(`\\b${themePrefix}(\\S+)\\b`)
    );
    let index = 0;

    if (themeMatch) {
        element.classList.remove(themeMatch[0]);
        index = (themes.indexOf(themeMatch[1]) + 1) % themes.length;
    }

    element.classList.add(`${themePrefix}${themes[index]}`);
}

export function setTheme(element: HTMLElement, theme: string = "") {
    cycleThemes(element, [theme]);
}
