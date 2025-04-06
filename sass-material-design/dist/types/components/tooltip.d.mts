/**
 * @file Implementation file for Material Design tooltips.
 */
/**
 * Hides the given tooltip.
 * @param tooltip - tooltip to hide
 * @param immediate - whether to skip delay
 */
export declare function hide(tooltip: HTMLElement, immediate?: boolean): void;
/**
 * Hides all visible tooltips and shows the given tooltip.
 * @param parent - element that controls the tooltip
 * @param tooltip - tooltip to show
 * @param immediate - whether to skip delay
 */
export declare function show(parent: Element, tooltip: HTMLElement, immediate?: boolean): void;
/**
 * Initializes a tooltip's parent.
 * @param parent - element which controls a tooltip
 */
export declare function initialize(parent: HTMLElement): void;
//# sourceMappingURL=tooltip.d.mts.map