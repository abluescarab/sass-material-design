/**
 * @file            components/tooltip.ts
 * @description     Implementation file for Material Design tooltips.
 */
/**
 * Hides the given tooltip.
 * @param tooltip - tooltip to hide
 * @param immediate - whether to skip delay
 */
export declare function hide(tooltip: Element, immediate?: boolean): void;
/**
 * Hides all visible tooltips and shows the given tooltip.
 * @param parent - element that controls the tooltip
 * @param tooltip - tooltip to show
 * @param immediate - whether to skip delay
 */
export declare function show(parent: Element, tooltip: Element, immediate?: boolean): void;
/**
 * Initializes a tooltip.
 * @param parent - element that controls the tooltip
 */
export declare function initialize(parent: Element): void;
