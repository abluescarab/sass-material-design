/*******************************************************************************
 * @file           modules/components/tree.ts
 * @description    Implementation file for tree components.
 *******************************************************************************/

import { MaterialToggleEvent, MaterialState } from "../events.js";
import {
    getChildByClassName,
    getParentWithClass,
    prefix,
    stringToSelector,
} from "../utils.js";

/**
 * Creates a button to insert in the tree.
 * @param buttonType icon button type
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
 * Toggles child checkboxes.
 * @param element parent element
 * @param checked whether to check or uncheck children
 */
function toggleCheckboxes(element: Element | null, checked: boolean): void {
    const subtree = element?.nextElementSibling;

    if (
        !element ||
        !subtree?.classList.contains("md-tree__subtree") ||
        !subtree?.firstElementChild?.classList.contains("md-checkbox")
    ) {
        return;
    }

    for (const child of subtree.children) {
        if (child.classList.contains("md-checkbox")) {
            child.querySelectorAll("input[type='checkbox']").forEach((c) => {
                (c as HTMLInputElement).checked = checked;
            });
        }

        toggleCheckboxes(child, checked);
    }
}

/**
 * Checks if the given element is in a subtree.
 * @param element element to check
 * @returns whether the given element is in a subtree
 */
function isChild(element: Element): boolean | undefined {
    return element.parentElement?.classList.contains("md-tree__subtree");
}

/**
 * Checks if the given element is a leaf node in the tree.
 * @param element element to check
 * @returns whether the given element is a leaf node
 */
function isLeaf(element: Element): boolean {
    return !element.nextElementSibling?.classList.contains("md-tree__subtree");
}

/**
 * Checks if the given element is a root node in the tree.
 * @param element element to check
 * @returns whether the given element is a root node
 */
function isRoot(element: Element): boolean | undefined {
    return element.parentElement?.classList.contains("md-tree");
}

/**
 * Handles the click event on a tree.
 * @param tree parent tree
 * @param target clicked checkbox
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
        const nextTree = el.parentElement?.nextElementSibling;

        if (tree.dataset.mdCascadeCollapse != undefined) {
            toggleAll(nextTree, expand, false);
        } else {
            toggle(nextTree, expand);
        }

        tree.dispatchEvent(
            new MaterialToggleEvent(
                el,
                expand ? MaterialState.Expanded : MaterialState.Collapsed
            )
        );
    } else if (el instanceof HTMLInputElement) {
        const checked = el.checked;
        const cascadeChecked = tree.dataset.mdCascadeChecked;
        const checkboxes = tree.dataset.mdCheckboxes;

        if (
            (checkboxes == "all" || checkboxes == "subtrees") &&
            (cascadeChecked == "both" ||
                (cascadeChecked == "checked" && checked) ||
                (cascadeChecked == "unchecked" && !checked))
        ) {
            toggleCheckboxes(getParentWithClass(el, "md-checkbox"), checked);
        }

        tree.dispatchEvent(
            new MaterialToggleEvent(
                el,
                checked ? MaterialState.Checked : MaterialState.Unchecked
            )
        );
    }
}

/**
 * Checks if a tree has any expanded nodes.
 * @param tree parent tree
 * @returns whether any children are expanded
 */
export function hasExpanded(
    tree: Element | EventTarget | null
): boolean | null {
    if (!(tree instanceof Element)) {
        return null;
    }

    return tree.querySelector(".md-tree__subtree--expanded") != null;
}

/**
 * Checks if a tree has any checked nodes.
 * @param tree parent tree
 * @returns whether any children are checked
 */
export function hasChecked(tree: Element | EventTarget | null): boolean | null {
    if (!(tree instanceof Element)) {
        return null;
    }

    return tree.querySelector(".md-checkbox input:checked") != null;
}

/**
 * Initializes a tree recursively.
 * @param tree tree to initialize
 * @param buttonType icon button type
 * @param where to include checkboxes
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

    for (const child of tree.children) {
        if (child.classList.contains("md-tree__label")) {
            const root = isRoot(child);
            const leaf = isLeaf(child);
            let node = child;

            if (
                checkboxes == "all" ||
                (checkboxes == "leaves" && leaf) ||
                (checkboxes == "roots" && root) ||
                (checkboxes == "subtrees" && isChild(child))
            ) {
                node = document.createElement("div");
                node.classList.add("md-checkbox");

                const input = document.createElement("input");
                input.type = "checkbox";

                child.insertAdjacentElement("afterbegin", input);
                child.insertAdjacentElement("beforebegin", node);
                node.appendChild(child);
            }

            if (!node.id) {
                const id = prefix(
                    `${itemPrefix ? itemPrefix : "tree"}__`,
                    stringToSelector((child as HTMLElement).innerText)
                );

                if (!document.getElementById(id)) {
                    node.id = id;
                }
            }

            if (root) {
                node.classList.add("md-tree__root");
            }

            if (leaf) {
                node.classList.add("md-tree__leaf");
            } else {
                node.classList.add("md-tree__branch");
            }
        }

        if (child.classList.contains("md-tree__subtree")) {
            const label = child.previousElementSibling as HTMLElement;

            label.insertAdjacentElement("afterbegin", createButton(buttonType));
            initializeTree(child, itemPrefix, buttonType, checkboxes);
        }
    }
}

/**
 * Initializes a tree.
 * @param tree tree to initialize
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
        tree.dataset.mdButtonStyle,
        tree.dataset.mdCheckboxes
    );
    toggleAll(tree, tree.dataset.mdExpandOnLoad != undefined, true);

    tree.addEventListener("click", (e) => treeClicked(tree, e.target));
}

/**
 * Populates a tree recursively from a map.
 * @param tree tree to populate
 * @param map map to populate from
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
 * Populates a tree from a map.
 * @param tree tree to populate
 * @param map map to populate from
 */
export function populate(tree: Element | null, map: object): void {
    populateTree(tree, map);
}

/**
 * Expands or collapses a tree.
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 */
export function toggle(
    tree: Element | null | undefined,
    expand: boolean
): void {
    if (
        !tree ||
        !(tree instanceof HTMLElement) ||
        !tree.classList.contains("md-tree__subtree")
    ) {
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
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 * @param cascadeExpand whether to cascade expansion to children
 */
export function toggleAll(
    tree: Element | null | undefined,
    expand: boolean,
    cascadeExpand: boolean
): void {
    if (!tree || !(tree instanceof HTMLElement)) {
        return;
    }

    if (tree.classList.contains("md-tree__subtree")) {
        toggle(tree, expand);
    }

    if (!expand || (cascadeExpand && expand)) {
        for (const subtree of tree.getElementsByClassName("md-tree__subtree")) {
            toggle(subtree, expand);
        }
    }
}
