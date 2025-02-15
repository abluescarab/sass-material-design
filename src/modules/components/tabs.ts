import { getParentWithClass } from "../utils.js";

export function initialize(container: HTMLElement) {
    // set default tab if not given
    if (container.dataset.mdTab == undefined) {
        changeTab(
            container,
            "",
            (
                container.getElementsByClassName(
                    "md-tabs__page"
                )[0] as HTMLElement
            ).dataset.mdTab
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
            changeTab(container, container.dataset.mdTab, button.dataset.mdTab);
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

    container.dataset.mdTab = newTab;
}

function getTab(container: HTMLElement, tab: string | undefined) {
    return [
        container.querySelector('.md-tabs__button[data-md-tab="' + tab + '"]'),
        container.querySelector('.md-tabs__page[data-md-tab="' + tab + '"]'),
    ];
}
