/*******************************************************************************
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 ******************************************************************************/
const visible = [];
const initialized = [];
/**
 * Calculates the location of a submenu based on its parent.
 * @param parent parent menu
 * @param submenu submenu to move
 */
function calculateLocation(parent, submenu) {
    // if (!(submenu instanceof HTMLElement)) {
    //     return;
    // }
    // const parentRect = parent?.getBoundingClientRect();
    // const parentMenuRect = parent?.parentElement?.getBoundingClientRect();
    // submenu.style.left = `${parentMenuRect?.right}px`;
    // submenu.style.top = `${parentRect?.top}px`;
}
export function hide(menu, force = false) {
    if (!(menu instanceof HTMLElement)) {
        return;
    }
    setTimeout(() => {
        if (menu.dataset.mdHovered == undefined) {
            menu.classList.remove("md-menu--visible");
        }
    }, 50); // ensure user has time to hover over submenu
}
export function hideAll() { }
export function show(menu) {
    menu.classList.add("md-menu--visible");
}
/**
 * Initializes a menu.
 * @param menu menu to initialize
 */
export function initialize(menu) {
    if (!(menu instanceof HTMLElement) || !menu.classList.contains("md-menu")) {
        return;
    }
    const parents = document.querySelectorAll(`[data-md-menu=${menu.id}]`);
    // if menu is not bound to anything, skip initializing
    if (parents.length == 0) {
        return;
    }
    parents.forEach((el) => {
        parent.addEventListener("click", (e) => { });
    });
    // TODO: finish implementing menu
    // menu.querySelectorAll(".md-menu__submenu").forEach((el) => {
    //     const submenu = el as HTMLElement;
    //     const parent = submenu.previousElementSibling;
    //     const arrow = document.createElement("span");
    //     arrow.classList.add("md-menu__icon", "md-symbol");
    //     arrow.innerText = "arrow_right";
    //     parent?.insertAdjacentElement("beforeend", arrow);
    //     submenu.addEventListener("mouseenter", () => {
    //         submenu.dataset.mdHovered = "";
    //     });
    //     submenu.addEventListener("mouseleave", () => {
    //         delete submenu.dataset.mdHovered;
    //         submenu.classList.remove("md-menu--visible");
    //     });
    //     parent?.addEventListener("mouseenter", () => {
    //         calculateLocation(parent, submenu);
    //         submenu.classList.add("md-menu--visible");
    //     });
    //     parent?.addEventListener("mouseleave", () => {
    //         setTimeout(() => {
    //             if (submenu.dataset.mdHovered == undefined) {
    //                 submenu.classList.remove("md-menu--visible");
    //             }
    //         }, 50); // ensure user has time to hover over submenu
    //     });
    // });
}
