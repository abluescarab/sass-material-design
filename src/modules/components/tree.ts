/**
 * @file            modules/components/tree.ts
 * @description     Implementation file for tree components.
 */

import { create as createCheckbox } from "./checkbox.js";
import { MaterialToggleEvent, MaterialState } from "../types/events.js";
import { Nullable } from "../types/index.js";
import {
    getChildByClassName,
    getParentByClassName,
    prefix,
    stringToSelector,
    suffix,
} from "../utils.js";

/**
 * Creates a button to insert in the tree.
 * @param buttonType - icon button type
 * @returns new button
 */
function createButton(buttonType: string | undefined): HTMLButtonElement {
    const button = document.createElement("button");
    button.classList.add(
        "md-icon-button",
        "md-icon-button--small",
        "md-symbol"
    );
    button.dataset.mdType = buttonType;
    button.innerText = "add";

    return button;
}

/**
 * Initializes a tree recursively.
 * @param tree - tree to initialize
 * @param itemPrefix - prefix for item IDs
 * @param buttonType - icon button type
 * @param checkboxes - where to include checkboxes
 */
function initializeTree(
    tree: Element,
    itemPrefix: string | null,
    buttonType: string | undefined,
    checkboxes: string | undefined
): void {
    if (!tree) {
        return;
    }

    for (const element of tree.children) {
        const child = element as HTMLElement;
        const fullPrefix = `${itemPrefix ? itemPrefix : "tree"}__`;

        if (child.classList.contains("md-tree__label")) {
            const root = isRoot(child);
            const leaf = isLeaf(child);
            const id = prefix(stringToSelector(child.innerText), fullPrefix);
            let node = child;

            if (
                checkboxes == "all" ||
                (checkboxes == "leaves" && leaf) ||
                (checkboxes == "roots" && root) ||
                (checkboxes == "subtrees" && isChild(child))
            ) {
                node = createCheckbox({
                    text: child.innerText,
                    id: suffix(id, "__input"),
                });

                child.insertAdjacentElement("afterend", node);
                child.remove();
            }

            if (!node.id) {
                node.id = suffix(id, "__controller");
            }

            if (root) {
                node.classList.add("md-tree__root");
            }

            node.classList.add(leaf ? "md-tree__leaf" : "md-tree__branch");
        } else if (child.classList.contains("md-tree__subtree")) {
            const label = child.previousElementSibling as HTMLElement;
            const button = createButton(buttonType);
            const id = prefix(stringToSelector(label.innerText), fullPrefix);

            if (!child.id) {
                child.id = id;
                button.id = suffix(id, "__button");
            }

            label.insertAdjacentElement("afterbegin", button);
            initializeTree(child, id, buttonType, checkboxes);
        }
    }
}

/**
 * Checks if the given element is in a subtree.
 * @param element - element to check
 * @returns whether the given element is in a subtree
 */
function isChild(element: Element): boolean | undefined {
    return element.parentElement?.classList.contains("md-tree__subtree");
}

/**
 * Checks if the given element is a leaf node in the tree.
 * @param element - element to check
 * @returns whether the given element is a leaf node
 */
function isLeaf(element: Element): boolean {
    return !element.nextElementSibling?.classList.contains("md-tree__subtree");
}

/**
 * Checks if the given element is a root node in the tree.
 * @param element - element to check
 * @returns whether the given element is a root node
 */
function isRoot(element: Element): boolean | undefined {
    return element.parentElement?.classList.contains("md-tree");
}

/**
 * Populates a tree recursively from a map.
 * @param tree - tree to populate
 * @param map - map to populate from
 */
function populateTree(tree: Element | null, map: object): void {
    if (!tree) {
        return;
    }

    for (const [key, value] of Object.entries(map)) {
        const label = document.createElement("label");
        label.classList.add("md-tree__label");
        label.innerText = key;

        tree.appendChild(label);

        if (Object.keys(value).length > 0) {
            const subtree = document.createElement("div");
            subtree.classList.add("md-tree__subtree");

            populateTree(subtree, value);
            tree.appendChild(subtree);
        }
    }
}

/**
 * Toggles child checkboxes.
 * @param checkbox - checkbox input
 * @param checked - whether to check or uncheck children
 * @returns list of toggled elements
 */
function toggleCheckboxes(
    checkbox: Element | null,
    checked: boolean
): Element[] {
    const elements: Element[] = [];
    const subtree = getParentByClassName(
        checkbox,
        "md-checkbox"
    )?.nextElementSibling;

    if (!subtree?.classList.contains("md-tree__subtree")) {
        return elements;
    }

    for (const checkbox of subtree.querySelectorAll<HTMLInputElement>(
        "input[type='checkbox'"
    )) {
        checkbox.checked = checked;
        elements.push(checkbox);
    }

    return elements;
}

/**
 * Handles the click event on a tree.
 * @param tree - parent tree
 * @param target - clicked checkbox
 */
function treeClicked(tree: HTMLElement, target: EventTarget | null): void {
    if (!target) {
        return;
    }

    const el = target as HTMLElement;

    if (el.classList.contains("md-tree__label")) {
        return;
    }

    if (el.classList.contains("md-icon-button")) {
        const expand = el.innerText == "add";

        tree.dispatchEvent(
            new MaterialToggleEvent(
                el,
                expand ? MaterialState.Expanded : MaterialState.Collapsed,
                toggleAll(
                    el.parentElement?.nextElementSibling,
                    expand,
                    tree.dataset.mdCascadeToggled
                )
            )
        );
    } else if (el instanceof HTMLInputElement) {
        const checked = el.checked;
        const cascadeChecked = tree.dataset.mdCascadeChecked;
        const checkboxes = tree.dataset.mdCheckboxes;
        const elements: Element[] = [];

        if (
            (checkboxes == "all" || checkboxes == "subtrees") &&
            (cascadeChecked == "both" ||
                (cascadeChecked == "checked" && checked) ||
                (cascadeChecked == "unchecked" && !checked))
        ) {
            elements.push(...toggleCheckboxes(el, checked));
        }

        tree.dispatchEvent(
            new MaterialToggleEvent(
                el,
                checked ? MaterialState.Checked : MaterialState.Unchecked,
                elements
            )
        );
    }
}

/**
 * Checks if a tree has any expanded nodes.
 * @param tree - parent tree
 * @param includeChildren - whether to deep search for expanded nodes
 * @returns whether any children are expanded
 */
export function hasExpanded(
    tree: Element | EventTarget | null,
    includeChildren: boolean = true
): boolean | null {
    if (!(tree instanceof Element)) {
        return null;
    }

    let selector = ".md-tree__subtree--expanded";

    if (!includeChildren) {
        selector = `:scope > ${selector}`;
    }

    return tree.querySelector(selector) != null;
}

/**
 * Checks if a tree has any checked nodes.
 * @param tree - parent tree
 * @param includeChildren - whether to deep search for checked boxes
 * @returns whether any children are checked
 */
export function hasChecked(
    tree: Element | EventTarget | null,
    includeChildren: boolean = true
): boolean | null {
    if (!(tree instanceof HTMLElement)) {
        return null;
    }

    if (
        tree.dataset.mdCheckboxes == "subtrees" ||
        tree.dataset.mdCheckboxes == "leaves"
    ) {
        return false;
    }

    let selector = ".md-checkbox input:checked";

    if (!includeChildren) {
        selector = `:scope > ${selector}`;
    }

    return tree.querySelector(selector) != null;
}

/**
 * Initializes a tree.
 * @param tree - tree to initialize
 * @param itemPrefix - prefix for each dynamically generated item ID
 */
export function initialize(
    tree: Element,
    itemPrefix: string | null = null
): void {
    if (!(tree instanceof HTMLElement)) {
        return;
    }

    initializeTree(
        tree,
        itemPrefix ?? tree?.id,
        tree.dataset.mdButtonType,
        tree.dataset.mdCheckboxes
    );

    const loadExpanded = tree.dataset.mdExpandOnLoad != undefined;

    toggleAll(tree, loadExpanded, loadExpanded ? "expanded" : "");

    tree.addEventListener("click", (e) => treeClicked(tree, e.target));
}

/**
 * Populates a tree from a map.
 * @param tree - tree to populate
 * @param map - map to populate from
 */
export function populate(tree: Element | null, map: object): void {
    populateTree(tree, map);
}

/**
 * Expands or collapses a tree.
 * @param tree - tree to toggle
 * @param expand - whether to expand or collapse
 */
export function toggle(tree: Nullable<Element>, expand: boolean): void {
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }

    const button = getChildByClassName(
        tree.previousElementSibling,
        "md-icon-button"
    );

    if (!button) {
        return;
    }

    button.innerText = expand ? "remove" : "add";
    tree.classList.toggle("md-tree__subtree--expanded", expand);
    button.classList.toggle("md-icon-button--selected", expand);
}

/**
 * Expands or collapses all elements in a tree.
 * @param tree - tree to toggle
 * @param expand - whether to expand or collapse
 * @param cascadeToggled - whether to expand or collapse children with parent
 * @returns list of toggled elements
 */
export function toggleAll(
    tree: Nullable<Element>,
    expand: boolean,
    cascadeToggled: string | undefined
): Element[] {
    const elements: Element[] = [];

    if (!tree || !(tree instanceof HTMLElement)) {
        return elements;
    }

    if (tree.classList.contains("md-tree__subtree")) {
        elements.push(tree);
    }

    if (
        (cascadeToggled == "expanded" && expand) ||
        (cascadeToggled == "collapsed" && !expand)
    ) {
        elements.push(...tree.getElementsByClassName("md-tree__subtree"));
    }

    for (const toggled of elements) {
        toggle(toggled, expand);
    }

    return elements;
}
