export function cycleThemes(element: HTMLElement, themes: string[] = []) {
    const themePrefix = "md-theme--";
    const themeMatch = element.className.match(
        new RegExp(`\\b${themePrefix}(\\S+)\\b`)
    );
    let index = 0;

    if (themeMatch) {
        element.classList.remove(themeMatch[0]);
        index = (themes.indexOf(themeMatch[1]) + 1) % themes.length;
    }

    const theme = themes[index];

    element.classList.add(`${themePrefix}${theme}`);
    return theme;
}

export function setTheme(element: HTMLElement, theme: string = "") {
    return cycleThemes(element, [theme]);
}
