/**
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 */

import { getParentByClassName } from "../utils.js";

// key: menu, value: opening element
const visible = new Map<HTMLElement, Element>();

/**
 * Initializes a menu's event listeners and maximum height.
 * @param menu - menu to initialize
 */
function initializeMenu(menu: HTMLElement): void {
    const menuRect = menu.getBoundingClientRect();
    menu.style.maxHeight = `${menuRect.height - 16}px`;

    menu.addEventListener("mouseenter", () => {
        menu.dataset.mdHovered = "";
    });

    menu.addEventListener("mouseleave", () => {
        delete menu.dataset.mdHovered;
        hide(menu);
    });

    menu.addEventListener("mouseover", (e: MouseEvent) => {
        if (!(e.target instanceof Element)) {
            return;
        }

        // TODO: check if submenu parent and show submenu if yes
        const item = getParentByClassName(
            e.target,
            "md-menu__item",
            "md-menu",
            true
        );

        const submenu = item?.nextElementSibling;

        if (
            !item ||
            !(submenu instanceof HTMLElement) ||
            !submenu?.classList.contains("md-menu__submenu")
        ) {
            return;
        }

        show(item, submenu);
    });

    menu.addEventListener("mouseout", (e) => {
        // TODO: check if submenu parent and hide submenu if yes
    });
}

/**
 * Hides a menu.
 * @param menu - menu to hide
 * @param force - whether to ignore the hover state of the menu
 */
export function hide(menu: HTMLElement, force: boolean = false): void {
    setTimeout(() => {
        if (force || menu.dataset.mdHovered == undefined) {
            menu.classList.remove("md-menu--visible");
            visible.delete(menu);
        }
    }, 50); // ensure user has time to hover over submenu
}

/**
 * Hides all visible menus.
 * @param force - whether to ignore the hover state of menus
 */
export function hideAll(force: boolean = false): void {
    if (visible.size == 0) {
        return;
    }

    for (const menu of visible.keys()) {
        hide(menu, force);
    }

    visible.clear();
}

/**
 * Moves a menu based on its parent's location.
 * @param parent - parent menu
 * @param menu - menu to move
 */
export function move(parent: Element, menu: HTMLElement): void {
    const menuRect = menu.getBoundingClientRect();
    const parentRect = parent?.getBoundingClientRect();
    const parentMenuRect = parent?.parentElement?.getBoundingClientRect();
    const margin = 48;
    const padding = 8;

    let left = 0;
    let top = 0;
    let bottom: number | null = null;
    let above = false;

    if (menu.classList.contains("md-menu__submenu")) {
        left = parentMenuRect?.right ?? parentRect.right;
        top = parentRect.top;
    } else {
        left = parentRect.left + padding;
        top = parentRect.bottom;

        // if the menu overflows the right side, move over
        if (left + menuRect.width > window.innerWidth) {
            left = parentRect.right - menuRect.width - padding;
        }

        // if the parent element is on the bottom half of the page, move the
        // menu to the top
        if (parentRect.top + parentRect.height / 2 > window.innerHeight / 2) {
            top = parentRect.top - menuRect.height;
            above = true;
        }
    }

    // if the menu overflows the bottom, add a margin
    if (top + menuRect.height + margin > window.innerHeight) {
        bottom = margin;
    }

    // if the menu overflows the top, add a margin
    if (above && top < margin) {
        // TODO: is above set with submenus?
        top = margin;
        bottom = window.innerHeight - parentRect.top;
    }

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.bottom = bottom ? `${bottom}px` : "auto";
}

/**
 * Shows a menu.
 * @param parent - element that controls the menu
 * @param menu - menu to show
 */
export function show(parent: Element, menu: HTMLElement): void {
    move(parent, menu);
    menu.classList.add("md-menu--visible");
    visible.set(menu, parent);
}

/**
 * Initializes a menu.
 * @param menu - menu to initialize
 */
export function initialize(menu: HTMLElement): void {
    if (!menu.classList.contains("md-menu")) {
        return;
    }

    const parents = document.querySelectorAll(`[data-md-menu=${menu.id}]`);

    // if menu is not bound to anything, skip initializing
    if (parents.length == 0) {
        return;
    }

    parents.forEach((el) => {
        el.addEventListener("click", () => {
            if (visible.has(menu) && visible.get(menu) == el) {
                hide(menu, true);
            } else {
                show(el, menu);
            }
        });
    });

    initializeMenu(menu);

    // TODO: finish implementing menu
    menu.querySelectorAll<HTMLElement>(".md-menu__submenu").forEach(
        (submenu) => {
            const parent = submenu.previousElementSibling;
            const arrow: HTMLElement =
                parent?.querySelector(".md-menu__icon:last-child") ??
                document.createElement("span");

            arrow.classList.add("md-menu__icon", "md-symbol");
            arrow.textContent = "arrow_right";

            // TODO: if menu is on right side, move arrow to left?
            if (!arrow.parentElement) {
                parent?.insertAdjacentElement("beforeend", arrow);
            }

            initializeMenu(submenu);
        }
    );
}
