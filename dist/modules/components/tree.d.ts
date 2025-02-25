/*******************************************************************************
 * @file           modules/components/tree.ts
 * @description    Implementation file for tree components.
 *******************************************************************************/
/**
 * Initializes a tree.
 * @param tree tree to initialize
 */
export declare function initialize(tree: Element, itemPrefix?: string | null): void;
/**
 * Populates a tree from a map.
 * @param tree tree to populate
 * @param map map to populate from
 */
export declare function populate(tree: Element | null, map: object): void;
/**
 * Expands or collapses a tree.
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 */
export declare function toggle(tree: Element | null | undefined, expand: boolean): void;
/**
 * Expands or collapses all elements in a tree.
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 * @param cascadeExpand whether to cascade expansion to children
 */
export declare function toggleAll(tree: Element | null | undefined, expand: boolean, cascadeExpand: boolean): void;
