import { getParentWithClass } from "../utils.js";

export function initialize(container: HTMLElement) {
    container.addEventListener("click", (e) => {
        const button = getParentWithClass(
            e.target as HTMLElement,
            "material-tabs__nav-button"
        );

        // ensure button is direct child of current tab container
        if (
            button != null &&
            button.parentElement?.parentElement == container
        ) {
            changeTab(container, container.dataset.tab, button.dataset.tab);
        }
    });
}

function changeTab(
    container: HTMLElement,
    oldTab: string | undefined,
    newTab: string | undefined
) {
    if (newTab == null) {
        return;
    }

    if (oldTab == newTab) {
        return;
    }

    const [oldButton, oldContent] = getTab(container, oldTab);
    const [newButton, newContent] = getTab(container, newTab);

    oldButton?.classList.remove("current");
    oldContent?.classList.remove("current");
    newButton?.classList.add("current");
    newContent?.classList.add("current");

    container.dataset.tab = newTab;
}

function getTab(container: HTMLElement, tab: string | undefined) {
    return [
        container.querySelector(
            '.material-tabs__nav-button[data-tab="' + tab + '"]'
        ),
        container.querySelector('.material-tabs__page[data-tab="' + tab + '"]'),
    ];
}
