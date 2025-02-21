import { getParentWithClass } from "../utils.js";
// TODO: change container -> tabs or something similar
export function initialize(container) {
    // set default tab if not given
    if (container.dataset.mdTab == undefined) {
        changeTab(container, "", container.getElementsByClassName("md-tabs__page")[0].dataset.mdTab);
    }
    else {
        // otherwise ensure tabs are --selected
        changeTab(container, container.dataset.mdTab, container.dataset.mdTab);
    }
    container.addEventListener("click", (e) => {
        const button = getParentWithClass(e.target, "md-tabs__button");
        // ensure button is direct child of current tab container
        if (button != null &&
            button.parentElement?.parentElement == container) {
            changeTab(container, container.dataset.mdTab, button.dataset.mdTab);
        }
    });
}
function changeTab(container, oldTab, newTab) {
    if (newTab == null) {
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
function getTab(container, tab) {
    return [
        container.querySelector('.md-tabs__button[data-md-tab="' + tab + '"]'),
        container.querySelector('.md-tabs__page[data-md-tab="' + tab + '"]'),
    ];
}
