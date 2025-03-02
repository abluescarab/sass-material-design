/*******************************************************************************
 * @file            components/tooltip.ts
 * @description     Implementation file for Material Design tooltips.
 ******************************************************************************/
/**
 * Hides the given tooltip.
 * @param tooltip tooltip to hide
 * @param tooltipHideDelay delay before hiding in milliseconds
 */
export declare function hide(tooltip: Element, immediate?: boolean): void;
/**
 * Hides all visible tooltips and shows the given tooltip.
 * @param parent element that controls the tooltip
 * @param tooltip tooltip to show
 * @param tooltipShowDelay delay before showing in milliseconds
 */
export declare function show(parent: Element, tooltip: Element, immediate?: boolean): void;
/**
 * Initializes a tooltip.
 * @param parent element that controls the tooltip
 * @param tooltipShowDelay delay before showing the tooltip in milliseconds
 * @param tooltipHideDelay delay before hiding the tooltip in milliseconds
 */
export declare function initialize(parent: Element): void;
