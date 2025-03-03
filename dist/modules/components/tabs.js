/*******************************************************************************
 * @file            modules/components/tabs.ts
 * @description     Implementation file for tab container components.
 ******************************************************************************/
import { MaterialChangeEvent } from "../events.js";
import { getChildByClassName, getParentWithClass } from "../utils.js";
/**
 * Gets a tab by name.
 * @param tabs tab container
 * @param name tab name
 * @returns tab button and page
 */
function getTab(tabs, name) {
    return [
        tabs.querySelector('.md-tabs__button[data-md-tab="' + name + '"]'),
        tabs.querySelector('.md-tabs__page[data-md-tab="' + name + '"]'),
    ];
}
/**
 * Changes the current tab on the given tab container.
 * @param tabs tab container
 * @param tab name of new tab
 */
export function changeTab(tabs, tab) {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }
    const oldTab = tabs.dataset.mdTab;
    const [oldButton, oldContent] = getTab(tabs, oldTab);
    const [newButton, newContent] = getTab(tabs, tab);
    oldButton?.classList.remove("md-tabs__button--selected");
    oldContent?.classList.remove("md-tabs__page--selected");
    newButton?.classList.add("md-tabs__button--selected");
    newContent?.classList.add("md-tabs__page--selected");
    tabs.dataset.mdTab = tab;
    tabs.dispatchEvent(new MaterialChangeEvent(newButton, oldTab, tab));
}
/**
 * Initializes a tab container.
 * @param tabs tab container
 */
export function initialize(tabs) {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }
    // set default tab if not given
    changeTab(tabs, tabs.dataset.mdTab == undefined
        ? getChildByClassName(tabs, "md-tabs__page")?.dataset.mdTab
        : tabs.dataset.mdTab);
    getChildByClassName(tabs, "md-tabs__nav")?.addEventListener("click", (e) => {
        const button = getParentWithClass(e.target, "md-tabs__button");
        // ensure button is direct child of current tab container
        if (button != null && button.parentElement?.parentElement == tabs) {
            changeTab(tabs, button.dataset.mdTab);
        }
    });
}
