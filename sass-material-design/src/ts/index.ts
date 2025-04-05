/**
 * @file Main file.
 */

import { initialize as initMenu } from "./components/menu";
import { initialize as initTooltip } from "./components/tooltip";
import { initialize as initCheckbox } from "./components/checkbox";
import { initialize as initSegmented } from "./components/segmented";
import { initialize as initSwitch } from "./components/switch";
import { initialize as initTable } from "./components/table";
import { initialize as initTabs } from "./components/tabs";
import { initialize as initTextTield } from "./components/text-field";
import { initialize as initTree } from "./components/tree";

/**
 * Represents a type which can be null or undefined.
 * @template T
 */
export type Nullable<T> = T | null | undefined;

/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize(): void {
    // TODO: ensure each element is only initialized once?
    const initializers = {
        "[data-md-menu]": initMenu,
        "[data-md-tooltip]": initTooltip,
        "md-checkbox": initCheckbox,
        "md-segmented": initSegmented,
        "md-switch": initSwitch,
        "md-table": initTable,
        "md-tabs": initTabs,
        "md-text-field": initTextTield,
        "md-tree": initTree,
    };

    for (const [selector, initializer] of Object.entries(initializers)) {
        // treat selectors starting with md- as class names
        const elements = selector.startsWith("md-")
            ? document.getElementsByClassName(selector)
            : document.querySelectorAll<HTMLElement>(selector);

        for (const element of elements) {
            initializer(element as HTMLElement);
        }
    }

    // document.addEventListener("click", (e) => {
    //     if (e.target instanceof HTMLElement && !e.target?.dataset.mdMenu) {
    //         menu.hideAll(true);
    //     }
    // });

    // window.addEventListener("resize", () => {
    //     menu.hideAll(true);
    // });

    // window.addEventListener("scroll", () => {
    //     menu.hideAll(true);
    // });

    console.info("Material design loaded.");
}

export * from "./events";
export * from "./timed-queue";
export * from "./utils";
