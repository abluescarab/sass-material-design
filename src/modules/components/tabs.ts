import { getParentWithClass } from "../utils.js";

export function initialize(container: HTMLElement) {
    // set default tab if not given
    if (container.dataset.tab == undefined) {
        changeTab(
            container,
            "",
            (
                container.getElementsByClassName(
                    "md-tabs__page"
                )[0] as HTMLElement
            ).dataset.tab
        );
    }

    container.addEventListener("click", (e) => {
        const button = getParentWithClass(
            e.target as HTMLElement,
            "md-tabs__button"
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

    oldButton?.classList.remove("md-tabs__button--selected");
    oldContent?.classList.remove("md-tabs__page--selected");
    newButton?.classList.add("md-tabs__button--selected");
    newContent?.classList.add("md-tabs__page--selected");

    container.dataset.tab = newTab;
}

function getTab(container: HTMLElement, tab: string | undefined) {
    return [
        container.querySelector('.md-tabs__button[data-tab="' + tab + '"]'),
        container.querySelector('.md-tabs__page[data-tab="' + tab + '"]'),
    ];
}
