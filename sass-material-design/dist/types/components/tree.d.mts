/**
 * @file Implementation file for tree components.
 */
/**
 * Checks if a tree has any expanded nodes.
 * @param tree - parent tree
 * @param includeChildren - whether to deep search for expanded nodes
 * @returns whether any children are expanded
 */
export declare function hasExpanded(tree: Element, includeChildren?: boolean): boolean;
/**
 * Checks if a tree has any checked nodes.
 * @param tree - parent tree
 * @param includeChildren - whether to deep search for checked boxes
 * @returns whether any children are checked
 */
export declare function hasChecked(tree: HTMLElement, includeChildren?: boolean): boolean;
/**
 * Initializes a tree.
 * @param tree - tree to initialize
 */
export declare function initialize(tree: HTMLElement): void;
/**
 * Populates a tree from a map.
 * @param tree - tree to populate
 * @param map - map to populate from
 */
export declare function populate(tree: Element, map: object): void;
/**
 * Expands or collapses a tree.
 * @param tree - tree to toggle
 * @param expand - whether to expand or collapse
 */
export declare function toggle(tree: Element, expand: boolean): void;
/**
 * Expands or collapses all elements in a tree.
 * @param tree - tree to toggle
 * @param expand - whether to expand or collapse
 * @param cascadeToggled - whether to expand or collapse children with parent
 * @returns list of toggled elements
 */
export declare function toggleAll(tree: HTMLElement, expand: boolean, cascadeToggled: string | undefined): Element[];
//# sourceMappingURL=tree.d.mts.map