/**
 * @file            modules/components/tabs.ts
 * @description     Implementation file for tab container components.
 */

import { MaterialChangeEvent } from "../types/events.js";
import { getParentByClassName } from "../utils.js";

/**
 * Gets a tab by name.
 * @param tabs - tab container
 * @param name - tab ID used for `data-md-tab`
 * @returns tab button and page
 */
function getTab(tabs: Element, name: string | undefined): (Element | null)[] {
    return [
        tabs.querySelector('.md-tabs__button[data-md-tab="' + name + '"]'),
        tabs.querySelector('.md-tabs__page[data-md-tab="' + name + '"]'),
    ];
}

/**
 * Changes the current tab on the given tab container.
 * @param tabs - tab container
 * @param tab - name of new tab
 */
export function changeTab(tabs: HTMLElement, tab: string | undefined): void {
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
 * @param tabs - tab container
 */
export function initialize(tabs: HTMLElement): void {
    // add data-md-tab to all nav buttons and pages without it
    const pages = tabs.querySelectorAll<HTMLElement>(
        ".md-tabs__page:not([data-md-tab])"
    );
    const buttons = tabs.querySelectorAll<HTMLElement>(
        ".md-tabs__button:not([data-md-tab])"
    );

    const length = Math.min(buttons.length, pages.length);

    for (let i = 0; i < length; i++) {
        pages[i].dataset.mdTab = buttons[i].dataset.mdTab = `${i}`;
    }

    // set default tab if not given
    const firstTab = tabs.getElementsByClassName("md-tabs__page")[0];

    if (firstTab instanceof HTMLElement) {
        changeTab(tabs, tabs.dataset.mdTab ?? firstTab.dataset.mdTab);
    }

    tabs.querySelector(":scope > .md-tabs__nav")?.addEventListener(
        "click",
        (e) => {
            const button = getParentByClassName(
                e.target as Element,
                "md-tabs__button"
            );

            if (!(button instanceof HTMLElement)) {
                return;
            }

            changeTab(tabs, button.dataset.mdTab);
        }
    );
}
