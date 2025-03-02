/*******************************************************************************
 * @file            modules/components/tree.ts
 * @description     Implementation file for tree components.
 ******************************************************************************/
import { MaterialToggleEvent, MaterialState } from "../events.js";
import { getChildByClassName, getParentWithClass, prefix, stringToSelector, } from "../utils.js";
/**
 * Creates a button to insert in the tree.
 * @param buttonType icon button type
 * @returns new button
 */
function createButton(buttonType) {
    const button = document.createElement("button");
    button.classList.add("md-icon-button", "md-icon-button--small", "md-symbol");
    button.dataset.mdType = buttonType;
    button.innerText = "add";
    return button;
}
/**
 * Initializes a tree recursively.
 * @param tree tree to initialize
 * @param buttonType icon button type
 * @param where to include checkboxes
 */
function initializeTree(tree, itemPrefix, buttonType, checkboxes) {
    if (!tree) {
        return;
    }
    for (const child of tree.children) {
        if (child.classList.contains("md-tree__label")) {
            const root = isRoot(child);
            const leaf = isLeaf(child);
            let node = child;
            if (checkboxes == "all" ||
                (checkboxes == "leaves" && leaf) ||
                (checkboxes == "roots" && root) ||
                (checkboxes == "subtrees" && isChild(child))) {
                node = document.createElement("div");
                node.classList.add("md-checkbox");
                const input = document.createElement("input");
                input.type = "checkbox";
                child.insertAdjacentElement("afterbegin", input);
                child.insertAdjacentElement("beforebegin", node);
                node.appendChild(child);
            }
            if (!node.id) {
                const id = prefix(`${itemPrefix ? itemPrefix : "tree"}__`, stringToSelector(child.innerText));
                if (!document.getElementById(id)) {
                    node.id = id;
                }
            }
            if (root) {
                node.classList.add("md-tree__root");
            }
            if (leaf) {
                node.classList.add("md-tree__leaf");
            }
            else {
                node.classList.add("md-tree__branch");
            }
        }
        if (child.classList.contains("md-tree__subtree")) {
            const label = child.previousElementSibling;
            label.insertAdjacentElement("afterbegin", createButton(buttonType));
            initializeTree(child, itemPrefix, buttonType, checkboxes);
        }
    }
}
/**
 * Checks if the given element is in a subtree.
 * @param element element to check
 * @returns whether the given element is in a subtree
 */
function isChild(element) {
    return element.parentElement?.classList.contains("md-tree__subtree");
}
/**
 * Checks if the given element is a leaf node in the tree.
 * @param element element to check
 * @returns whether the given element is a leaf node
 */
function isLeaf(element) {
    return !element.nextElementSibling?.classList.contains("md-tree__subtree");
}
/**
 * Checks if the given element is a root node in the tree.
 * @param element element to check
 * @returns whether the given element is a root node
 */
function isRoot(element) {
    return element.parentElement?.classList.contains("md-tree");
}
/**
 * Populates a tree recursively from a map.
 * @param tree tree to populate
 * @param map map to populate from
 */
function populateTree(tree, map) {
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
 * @param element parent element
 * @param checked whether to check or uncheck children
 */
function toggleCheckboxes(element, checked) {
    const subtree = element?.nextElementSibling;
    if (!subtree?.classList.contains("md-tree__subtree")) {
        return;
    }
    for (const checkbox of subtree.querySelectorAll("input[type='checkbox'")) {
        checkbox.checked = checked;
    }
}
/**
 * Handles the click event on a tree.
 * @param tree parent tree
 * @param target clicked checkbox
 */
function treeClicked(tree, target) {
    if (!target) {
        return;
    }
    const el = target;
    if (el.classList.contains("md-tree__label")) {
        return;
    }
    if (el.classList.contains("md-icon-button")) {
        const expand = el.innerText == "add";
        toggleAll(el.parentElement?.nextElementSibling, expand, tree.dataset.mdCascadeToggled);
        tree.dispatchEvent(new MaterialToggleEvent(el, expand ? MaterialState.Expanded : MaterialState.Collapsed));
    }
    else if (el instanceof HTMLInputElement) {
        const checked = el.checked;
        const cascadeChecked = tree.dataset.mdCascadeChecked;
        const checkboxes = tree.dataset.mdCheckboxes;
        if ((checkboxes == "all" || checkboxes == "subtrees") &&
            (cascadeChecked == "both" ||
                (cascadeChecked == "checked" && checked) ||
                (cascadeChecked == "unchecked" && !checked))) {
            toggleCheckboxes(getParentWithClass(el, "md-checkbox"), checked);
        }
        tree.dispatchEvent(new MaterialToggleEvent(el, checked ? MaterialState.Checked : MaterialState.Unchecked));
    }
}
/**
 * Checks if a tree has any expanded nodes.
 * @param tree parent tree
 * @param includeChildren whether to deep search for expanded nodes
 * @returns whether any children are expanded
 */
export function hasExpanded(tree, includeChildren = true) {
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
 * @param tree parent tree
 * @param includeChildren whether to deep search for checked boxes
 * @returns whether any children are checked
 */
export function hasChecked(tree, includeChildren = true) {
    if (!(tree instanceof HTMLElement)) {
        return null;
    }
    if (tree.dataset.mdCheckboxes == "subtrees" ||
        tree.dataset.mdCheckboxes == "leaves") {
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
 * @param tree tree to initialize
 * @param itemPrefix prefix for each dynamically generated item ID
 */
export function initialize(tree, itemPrefix = null) {
    if (!(tree instanceof HTMLElement)) {
        return;
    }
    initializeTree(tree, itemPrefix ?? tree?.id, tree.dataset.mdButtonType, tree.dataset.mdCheckboxes);
    const loadExpanded = tree.dataset.mdExpandOnLoad != undefined;
    toggleAll(tree, loadExpanded, loadExpanded ? "expanded" : "");
    tree.addEventListener("click", (e) => treeClicked(tree, e.target));
}
/**
 * Populates a tree from a map.
 * @param tree tree to populate
 * @param map map to populate from
 */
export function populate(tree, map) {
    populateTree(tree, map);
}
/**
 * Expands or collapses a tree.
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 */
export function toggle(tree, expand) {
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }
    const button = getChildByClassName(tree.previousElementSibling, "md-icon-button");
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
 * @param cascadeToggled whether to expand or collapse children with parent
 */
export function toggleAll(tree, expand, cascadeToggled) {
    if (!tree || !(tree instanceof HTMLElement)) {
        return;
    }
    if (tree.classList.contains("md-tree__subtree")) {
        toggle(tree, expand);
    }
    if ((cascadeToggled == "expanded" && expand) ||
        (cascadeToggled == "collapsed" && !expand)) {
        for (const subtree of tree.getElementsByClassName("md-tree__subtree")) {
            toggle(subtree, expand);
        }
    }
}
