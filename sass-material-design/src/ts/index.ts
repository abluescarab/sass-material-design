/**
 * @file Main file.
 */

import * as components from "./components/index";

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
        "[data-md-menu]": components.materialMenu.initialize,
        "[data-md-tooltip]": components.materialTooltip.initialize,
        "md-checkbox": components.materialCheckbox.initialize,
        "md-segmented": components.materialSegmentedButton.initialize,
        "md-switch": components.materialSwitch.initialize,
        "md-table": components.materialTable.initialize,
        "md-tabs": components.materialTabs.initialize,
        "md-text-field": components.materialTextField.initialize,
        "md-tree": components.materialTree.initialize,
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
