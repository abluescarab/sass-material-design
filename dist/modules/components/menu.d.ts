/**
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 */
/**
 * Moves a menu based on its parent's location.
 * @param menu - menu to move
 * @param parent - parent menu
 */
export declare function move(menu: HTMLElement, parent: Element): void;
/**
 * Hides a menu.
 * @param menu - menu to hide
 * @param force - whether to ignore the hover state of the menu
 */
export declare function hide(menu: HTMLElement, force?: boolean): void;
/**
 * Hides all visible menus.
 * @param force - whether to ignore the hover state of menus
 */
export declare function hideAll(force?: boolean): void;
/**
 * Shows a menu.
 * @param menu - menu to show
 * @param parent - element that controls the menu
 */
export declare function show(menu: HTMLElement, parent: Element): void;
/**
 * Initializes a menu.
 * @param menu - menu to initialize
 */
export declare function initialize(menu: HTMLElement): void;
