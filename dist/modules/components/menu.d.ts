/*******************************************************************************
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 ******************************************************************************/
/**
 * Hides a menu.
 * @param menu menu to hide
 * @param force whether to ignore the hover state of the menu
 */
export declare function hide(menu: Element, force?: boolean): void;
/**
 * Hides all visible menus.
 * @param force whether to ignore the hover state of menus
 */
export declare function hideAll(force?: boolean): void;
/**
 * Moves a menu based on its parent's location.
 * @param parent parent menu
 * @param menu menu to move
 */
export declare function move(parent: Element | undefined, menu: Element): void;
/**
 * Shows a menu.
 * @param parent element that controls the menu
 * @param menu menu to show
 */
export declare function show(parent: Element, menu: Element): void;
/**
 * Initializes a menu.
 * @param menu menu to initialize
 */
export declare function initialize(menu: Element): void;
