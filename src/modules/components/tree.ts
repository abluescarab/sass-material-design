/**
 * @file            modules/components/tree.ts
 * @description     Implementation file for tree components.
 */

import { create as createCheckbox } from "./checkbox.js";
import { MaterialToggleEvent, MaterialState } from "../types/events.js";
import { getParentByClassName, join, stringToSelector } from "../utils.js";
import { Nullable } from "../types/index";

let lastItem = 0;
// TODO: change tree elements to be inside parent?

/**
 * Creates a button to insert in the tree.
 * @param buttonType - icon button type
 * @returns new button
 */
function createButton(buttonType: string | undefined): HTMLButtonElement {
    const button = document.createElement("button");
    button.classList.add("md-icon-button", "md-icon-button--small");
    button.textContent = "add";

    if (buttonType) {
        button.dataset.mdType = buttonType;
    }

    return button;
}

/**
 * Generates an ID for an element with either the specified string or with an
 * auto incremented number.
 * @param prefix - prefix before item ID
 * @param text - text after the prefix
 * @returns prefixed ID
 */
function getId(prefix: string, text: Nullable<string>): string {
    return join(prefix, text ? stringToSelector(text) : `item-${lastItem++}`);
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
    itemPrefix: string,
    buttonType: string | undefined,
    checkboxes: string | undefined
): void {
    for (const element of tree.children) {
        const child = element;
        const fullPrefix = `${itemPrefix ? itemPrefix : "tree"}__`;

        if (child.classList.contains("md-tree__label")) {
            const root = isRoot(child);
            const leaf = isLeaf(child);
            const id = getId(fullPrefix, child.textContent);
            let node = child;

            if (
                checkboxes == "all" ||
                (checkboxes == "leaves" && leaf) ||
                (checkboxes == "roots" && root) ||
                (checkboxes == "subtrees" && isChild(child))
            ) {
                node = createCheckbox({
                    text: child.textContent ?? id,
                    id: join(id, "__input"),
                });

                child.insertAdjacentElement("afterend", node);
                child.remove();
            }

            if (!node.id) {
                node.id = join(id, "__controller");
            }

            if (root) {
                node.classList.add("md-tree__root");
            }

            node.classList.add(leaf ? "md-tree__leaf" : "md-tree__branch");
        } else if (child.classList.contains("md-tree__subtree")) {
            const label = child.previousElementSibling;
            const button = createButton(buttonType);
            const id = getId(fullPrefix, label?.textContent);

            if (!child.id) {
                child.id = id;
                button.id = join(id, "__button");
            }

            label?.insertAdjacentElement("afterbegin", button);
            initializeTree(child, id, buttonType, checkboxes);
        }
    }
}

/**
 * Checks if the given element is in a subtree.
 * @param element - element to check
 * @returns whether the given element is in a subtree
 */
function isChild(element: Element): boolean {
    return (
        element.parentElement != null &&
        element.parentElement.classList.contains("md-tree__subtree")
    );
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
function isRoot(element: Element): boolean {
    return (
        element.parentElement != null &&
        element.parentElement.classList.contains("md-tree")
    );
}

/**
 * Populates a tree recursively from a map.
 * @param tree - tree to populate
 * @param map - map to populate from
 */
function populateTree(tree: Element, map: object): void {
    for (const [key, value] of Object.entries(map)) {
        const label = document.createElement("label");
        label.classList.add("md-tree__label");
        label.textContent = key;

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
function toggleCheckboxes(checkbox: Element, checked: boolean): Element[] {
    const elements: Element[] = [];
    const subtree = getParentByClassName(
        checkbox,
        "md-checkbox"
    )?.nextElementSibling;

    if (!subtree?.classList.contains("md-tree__subtree")) {
        return elements;
    }

    for (const checkbox of subtree.querySelectorAll<HTMLInputElement>(
        `input[type='checkbox']${checked ? ":not(:checked)" : ":checked"}`
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
function treeClicked(tree: HTMLElement, target: HTMLElement): void {
    if (target.classList.contains("md-tree__label")) {
        return;
    }

    if (target.classList.contains("md-icon-button")) {
        if (
            !(target.parentElement?.nextElementSibling instanceof HTMLElement)
        ) {
            return;
        }

        const expand = target.textContent == "add";

        tree.dispatchEvent(
            new MaterialToggleEvent(
                target,
                expand ? MaterialState.Expanded : MaterialState.Collapsed,
                toggleAll(
                    target.parentElement.nextElementSibling,
                    expand,
                    tree.dataset.mdCascadeToggled
                )
            )
        );
    } else if (target instanceof HTMLInputElement) {
        const checked = target.checked;
        const cascadeChecked = tree.dataset.mdCascadeChecked;
        const checkboxes = tree.dataset.mdCheckboxes;
        const elements: Element[] = [];

        if (
            (checkboxes == "all" || checkboxes == "subtrees") &&
            (cascadeChecked == "both" ||
                (cascadeChecked == "checked" && checked) ||
                (cascadeChecked == "unchecked" && !checked))
        ) {
            elements.push(...toggleCheckboxes(target, checked));
        }

        tree.dispatchEvent(
            new MaterialToggleEvent(
                target,
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
    tree: Element,
    includeChildren: boolean = true
): boolean {
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
    tree: HTMLElement,
    includeChildren: boolean = true
): boolean {
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
export function initialize(tree: HTMLElement, itemPrefix: string = ""): void {
    initializeTree(
        tree,
        itemPrefix ?? tree?.id,
        tree.dataset.mdButtonType,
        tree.dataset.mdCheckboxes
    );

    const loadExpanded = tree.dataset.mdExpandOnLoad != undefined;

    toggleAll(tree, loadExpanded, loadExpanded ? "expanded" : "");

    tree.addEventListener("click", (e) => {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        treeClicked(tree, e.target);
    });
}

/**
 * Populates a tree from a map.
 * @param tree - tree to populate
 * @param map - map to populate from
 */
export function populate(tree: Element, map: object): void {
    populateTree(tree, map);
}

/**
 * Expands or collapses a tree.
 * @param tree - tree to toggle
 * @param expand - whether to expand or collapse
 */
export function toggle(tree: Element, expand: boolean): void {
    if (
        !tree.classList.contains("md-tree__subtree") ||
        !tree.previousElementSibling
    ) {
        return;
    }

    const button =
        tree.previousElementSibling.getElementsByClassName("md-icon-button")[0];

    if (!button) {
        return;
    }

    button.textContent = expand ? "remove" : "add";
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
    tree: HTMLElement,
    expand: boolean,
    cascadeToggled: string | undefined
): Element[] {
    const elements: Element[] = [];

    if (tree.classList.contains("md-tree__subtree")) {
        elements.push(tree);
    }

    if (
        (cascadeToggled == "expanded" && expand) ||
        (cascadeToggled == "collapsed" && !expand)
    ) {
        elements.push(
            ...tree.getElementsByClassName(
                `md-tree__subtree${expand ? "" : "--expanded"}`
            )
        );
    }

    for (const toggled of elements) {
        toggle(toggled, expand);
    }

    return elements;
}
