/*******************************************************************************
 * @file           modules/components/tabs.ts
 * @description    Implementation file for tab container components.
 *******************************************************************************/

import { MaterialChangeEvent, triggerEvent } from "../events.js";
import { getChildByClassName, getParentWithClass } from "../utils.js";

/**
 * Initializes the given tab container by adding buttons, checkboxes, etc.
 * @param tabs tab container
 */
export function initialize(tabs: Element): void {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }

    // set default tab if not given
    if (tabs.dataset.mdTab == undefined) {
        changeTab(
            tabs,
            "",
            getChildByClassName(tabs, "md-tabs__page")?.dataset.mdTab
        );
    } else {
        // otherwise ensure tabs are --selected
        changeTab(tabs, tabs.dataset.mdTab, tabs.dataset.mdTab);
    }

    tabs.addEventListener("click", (e) => {
        const button = getParentWithClass(
            e.target as Element,
            "md-tabs__button"
        );

        // ensure button is direct child of current tab container
        if (button != null && button.parentElement?.parentElement == tabs) {
            changeTab(tabs, tabs.dataset.mdTab, button.dataset.mdTab);
        }
    });
}

/**
 * Changes the current tab on the given tab container.
 * @param tabs tab container
 * @param oldTab name of old tab
 * @param newTab name of new tab
 */
function changeTab(
    tabs: Element,
    oldTab: string | undefined,
    newTab: string | undefined
): void {
    if (!(tabs instanceof HTMLElement)) {
        return;
    }

    const [oldButton, oldContent] = getTab(tabs, oldTab);
    const [newButton, newContent] = getTab(tabs, newTab);

    oldButton?.classList.remove("md-tabs__button--selected");
    oldContent?.classList.remove("md-tabs__page--selected");
    newButton?.classList.add("md-tabs__button--selected");
    newContent?.classList.add("md-tabs__page--selected");

    tabs.dataset.mdTab = newTab;

    triggerEvent<MaterialChangeEvent>(tabs, "tabchanged", {
        oldValue: oldTab,
        newValue: newTab,
    });
}

/**
 * Gets a tab by name.
 * @param tabs tab container
 * @param name tab name
 * @returns tab button and page
 */
function getTab(tabs: Element, name: string | undefined): (Element | null)[] {
    return [
        tabs.querySelector('.md-tabs__button[data-md-tab="' + name + '"]'),
        tabs.querySelector('.md-tabs__page[data-md-tab="' + name + '"]'),
    ];
}
