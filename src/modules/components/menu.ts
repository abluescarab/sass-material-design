/**
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 */

const initialized = new Map<HTMLElement, Element | null>();

function move(menu: HTMLElement, parent: Element) {
    const menuRect = menu.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const margin = 48;
    const padding = 16;

    let left = 0;
    let top = 0;

    if (menu.classList.contains("md-menu__submenu")) {
    } else {
        left = parentRect.left + padding;
        top = parentRect.bottom;

        // if the menu overflows the right side, move over
        if (left + menuRect.width > window.innerWidth) {
            left = parentRect.right - menuRect.width - padding;
        }
    }

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
}

export function hide(menu: HTMLElement) {
    menu.classList.remove("md-menu--visible");
    initialized.set(menu, null);
}

export function show(menu: HTMLElement, parent: Element) {
    move(menu, parent);
    menu.classList.add("md-menu--visible");
    initialized.set(menu, parent);
}

/**
 * Initializes a menu's parent.
 * @param parent - element which controls a menu
 */
export function initialize(parent: HTMLElement) {
    if (!parent.dataset.mdMenu) {
        return;
    }

    const menu = document.getElementById(parent.dataset.mdMenu);

    if (!menu) {
        return;
    }

    parent.addEventListener("click", () => {
        if (initialized.get(menu) == parent) {
            hide(menu);
        } else {
            console.log("showing");
            show(menu, parent);
        }
    });

    if (!initialized.has(menu)) {
        menu.addEventListener("mouseover", (e) => {
            console.log(e.target);
        });

        menu.addEventListener("mouseout", (e) => {
            console.log(e.target);
        });

        const submenus = menu.getElementsByClassName("md-menu__submenu");

        for (const submenu of submenus) {
            const parent = submenu.parentElement;
            const arrow: HTMLElement =
                parent?.querySelector(".md-menu__label + .md-menu__icon") ??
                document.createElement("span");

            arrow.classList.add("md-menu__icon");
            arrow.textContent = "arrow_right";

            if (!arrow.parentElement) {
                parent
                    ?.getElementsByClassName("md-menu__label")[0]
                    ?.insertAdjacentElement("afterend", arrow);
            }
        }

        initialized.set(menu, null);
    }
}

// import BiMap from "../types/bimap.js";
// import { getParentByClassName } from "../utils.js";

// // // key: menu, value: opening element
// // const visible = new Map<HTMLElement, Element>();

// // TODO: fix showing submenus
// const menus = new BiMap<HTMLElement, Element>();

// /**
//  * Moves a menu based on its parent's location.
//  * @param menu - menu to move
//  * @param parent - parent menu
//  */
// export function move(menu: HTMLElement, parent: Element): void {
//     const menuRect = menu.getBoundingClientRect();
//     const parentRect = parent?.getBoundingClientRect();
//     const parentMenuRect = parent?.parentElement?.getBoundingClientRect();
//     const margin = 48;
//     const padding = 8;

//     let left = 0;
//     let top = 0;
//     let bottom: number | null = null;
//     let above = false;

//     if (menu.classList.contains("md-menu__submenu")) {
//         left = parentMenuRect?.right ?? parentRect.right;
//         top = parentRect.top;
//     } else {
//         left = parentRect.left + padding;
//         top = parentRect.bottom;

//         // if the menu overflows the right side, move over
//         if (left + menuRect.width > window.innerWidth) {
//             left = parentRect.right - menuRect.width - padding;
//         }

//         // if the parent element is on the bottom half of the page, move the
//         // menu to the top
//         if (parentRect.top + parentRect.height / 2 > window.innerHeight / 2) {
//             top = parentRect.top - menuRect.height;
//             above = true;
//         }
//     }

//     //     if (left + menuRect.width > window.innerWidth) {
//     //         left = window.innerWidth - menuRect.width;
//     //     }

//     //     if (left == parentMenuRect?.left) {
//     //         left = parentMenuRect.left - menuRect.width;
//     //     }

//     // if the menu overflows the bottom, add a margin
//     if (top + menuRect.height + margin > window.innerHeight) {
//         bottom = margin;
//     }

//     // if the menu overflows the top, add a margin
//     if (above && top < margin) {
//         // TODO: is above set with submenus?
//         top = margin;
//         bottom = window.innerHeight - parentRect.top;
//     }

//     menu.style.left = `${left}px`;
//     menu.style.top = `${top}px`;
//     menu.style.bottom = bottom ? `${bottom}px` : "auto";
// }

// /**
//  * Initializes a menu's event listeners and maximum height.
//  * @param menu - menu to initialize
//  */
// function initializeMenu(menu: HTMLElement): void {
//     const menuRect = menu.getBoundingClientRect();
//     menu.style.maxHeight = `${menuRect.height - 16}px`;

//     menu.addEventListener("mouseover", (e) => {
//         if (!(e.target instanceof Element)) {
//             return;
//         }

//         // TODO: check if submenu parent and show submenu if yes
//         const item = getParentByClassName(
//             e.target,
//             "md-menu__item",
//             "md-menu",
//             true
//         );

//         const submenu = item?.getElementsByClassName("md-menu__submenu")[0];

//         if (!item || !(submenu instanceof HTMLElement)) {
//             return;
//         }

//         show(submenu, item);
//     });

//     menu.addEventListener("mouseout", (e) => {
//         // TODO: check if submenu parent and hide submenu if yes
//         if (!(e.target instanceof HTMLElement)) {
//             return;
//         }

//         if (e.target.classList.contains("md-menu__submenu")) {
//             hide(e.target);
//         }
//     });

//     // if (menu.classList.contains("md-menu__submenu")) {
//     //     menu.addEventListener("mouseenter", () => {
//     //         menu.dataset.mdHovered = "";
//     //     });

//     //     menu.addEventListener("mouseleave", () => {
//     //         delete menu.dataset.mdHovered;
//     //         hide(menu);
//     //     });
//     // }
// }

// /**
//  * Hides a menu.
//  * @param menu - menu to hide
//  * @param force - whether to ignore the hover state of the menu
//  */
// export function hide(menu: HTMLElement, force: boolean = false): void {
//     // setTimeout(() => {
//     //     if (force || menu.dataset.mdHovered == undefined) {
//     menu.classList.remove("md-menu--visible");
//     menus.delete(menu);
//     // visible.delete(menu);
//     //     }
//     // }, 50); // ensure user has time to hover over submenu
// }

// /**
//  * Hides all visible menus.
//  * @param force - whether to ignore the hover state of menus
//  */
// export function hideAll(force: boolean = false): void {
//     for (const menu of document.getElementsByClassName("md-menu--visible")) {
//         if (menu instanceof HTMLElement) {
//             hide(menu, force);
//         }
//     }

//     // if (visible.size == 0) {
//     //     return;
//     // }

//     // for (const menu of visible.keys()) {
//     //     hide(menu, force);
//     // }

//     // visible.clear();
// }

// /**
//  * Shows a menu.
//  * @param menu - menu to show
//  * @param parent - element that controls the menu
//  */
// export function show(menu: HTMLElement, parent: Element): void {
//     move(menu, parent);
//     menu.classList.add("md-menu--visible");
//     menus.delete(menu);
//     // visible.set(menu, parent);
// }

// /**
//  * Initializes a menu.
//  * @param menu - menu to initialize
//  */
// export function initialize(menu: HTMLElement): void {
//     if (!menu.classList.contains("md-menu")) {
//         return;
//     }

//     const parents = document.querySelectorAll(`[data-md-menu=${menu.id}]`);

//     // if menu is not bound to anything, skip initializing
//     if (parents.length == 0) {
//         return;
//     }

//     parents.forEach((el) => {
//         el.addEventListener("click", () => {
//             // if (visible.has(menu) && visible.get(menu) == el) {
//             if (menus.get(menu) == el) {
//                 hide(menu, true);
//             } else {
//                 show(menu, el);
//             }
//         });
//     });

//     initializeMenu(menu);

//     const submenus = menu.getElementsByClassName("md-menu__submenu");

//     // TODO: finish implementing menu
//     for (const submenu of submenus) {
//         const parent = submenu.previousElementSibling;
//         const arrow: HTMLElement =
//             parent?.querySelector(".md-menu__label + .md-menu__icon") ??
//             document.createElement("span");

//         arrow.classList.add("md-menu__icon");
//         arrow.textContent = "arrow_right";

//         if (!arrow.parentElement) {
//             parent?.insertAdjacentElement("afterend", arrow);
//         }

//         // initializeMenu(submenu);
//     }
// }
