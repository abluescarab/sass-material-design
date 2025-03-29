/**
 * @file            components/menu.ts
 * @description     Implementation file for Material Design menu components.
 */
/**
 * Hides a menu.
 * @param menu - menu to hide if not hovered over
 * @param immediate - whether to hide without a delay
 */
export declare function hide(menu: HTMLElement, immediate?: boolean): void;
/**
 * Hides all visible menus.
 */
export declare function hideAll(): void;
/**
 * Shows a menu next to its parent.
 * @param parent - menu parent element
 * @param menu - menu to show
 * @param immediate - whether to show the menu without a delay
 */
export declare function show(parent: Element, menu: HTMLElement, immediate?: boolean): void;
/**
 * Initializes a menu's parent.
 * @param parent - element which controls a menu
 */
export declare function initialize(parent: HTMLElement): void;
