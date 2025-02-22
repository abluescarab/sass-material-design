import { getChildByClassName, getParentWithClass } from "../utils.js";
export function initialize(tabs) {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }
    // set default tab if not given
    if (tabs.dataset.mdTab == undefined) {
        changeTab(tabs, "", getChildByClassName(tabs, "md-tabs__page")?.dataset.mdTab);
    }
    else {
        // otherwise ensure tabs are --selected
        changeTab(tabs, tabs.dataset.mdTab, tabs.dataset.mdTab);
    }
    tabs.addEventListener("click", (e) => {
        const button = getParentWithClass(e.target, "md-tabs__button");
        // ensure button is direct child of current tab container
        if (button != null && button.parentElement?.parentElement == tabs) {
            changeTab(tabs, tabs.dataset.mdTab, button.dataset.mdTab);
        }
    });
}
function changeTab(tabs, oldTab, newTab) {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }
    const [oldButton, oldContent] = getTab(tabs, oldTab);
    const [newButton, newContent] = getTab(tabs, newTab);
    oldButton?.classList.remove("md-tabs__button--selected");
    oldContent?.classList.remove("md-tabs__page--selected");
    newButton?.classList.add("md-tabs__button--selected");
    newContent?.classList.add("md-tabs__page--selected");
    const event = new CustomEvent("change", {
        detail: {
            oldTab: oldTab,
            newTab: newTab,
        },
    });
    tabs.dataset.mdTab = newTab;
    tabs.dispatchEvent(event);
}
function getTab(tabs, tab) {
    return [
        tabs.querySelector('.md-tabs__button[data-md-tab="' + tab + '"]'),
        tabs.querySelector('.md-tabs__page[data-md-tab="' + tab + '"]'),
    ];
}
