/**
 * @file Main file.
 */
import { initialize as initMenu } from "./components/menu.mjs";
import { initialize as initTooltip } from "./components/tooltip.mjs";
import { initialize as initCheckbox } from "./components/checkbox.mjs";
import { initialize as initSegmented } from "./components/segmented.mjs";
import { initialize as initSwitch } from "./components/switch.mjs";
import { initialize as initTable } from "./components/table.mjs";
import { initialize as initTabs } from "./components/tabs.mjs";
import { initialize as initTextTield } from "./components/text-field.mjs";
import { initialize as initTree } from "./components/tree.mjs";
/**
 * Initializes dynamically generated Material Design elements. Call this when
 * the document loads.
 */
export function initialize() {
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
            : document.querySelectorAll(selector);
        for (const element of elements) {
            initializer(element);
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
export * from "./events.mjs";
export * from "./timed-queue.mjs";
export * from "./utils.mjs";
//# sourceMappingURL=index.mjs.map