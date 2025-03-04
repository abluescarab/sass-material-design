/*******************************************************************************
 * @file            modules/components/tree.ts
 * @description     Implementation file for tree components.
 ******************************************************************************/
import { Nullable } from "../types.js";
/**
 * Checks if a tree has any expanded nodes.
 * @param tree parent tree
 * @param includeChildren whether to deep search for expanded nodes
 * @returns whether any children are expanded
 */
export declare function hasExpanded(tree: Element | EventTarget | null, includeChildren?: boolean): boolean | null;
/**
 * Checks if a tree has any checked nodes.
 * @param tree parent tree
 * @param includeChildren whether to deep search for checked boxes
 * @returns whether any children are checked
 */
export declare function hasChecked(tree: Element | EventTarget | null, includeChildren?: boolean): boolean | null;
/**
 * Initializes a tree.
 * @param tree tree to initialize
 * @param itemPrefix prefix for each dynamically generated item ID
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
 * @param tree tree to toggle
 * @param expand whether to expand or collapse
 */
export declare function toggle(tree: Nullable<Element>, expand: boolean): void;
/**
 * Expands or collapses all elements in a tree.
 * @param tree tree to toggle
 * @param expand whether to expand or collapse
 * @param cascadeToggled whether to expand or collapse children with parent
 */
export declare function toggleAll(tree: Nullable<Element>, expand: boolean, cascadeToggled: string | undefined): void;
