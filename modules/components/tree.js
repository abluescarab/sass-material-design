// TODO: add option to check children when checked
// TODO: add option to not collapse children with parent
// TODO: add option to have checkmarks only for subtree elements (no top level, no parents of subtrees)
import { getChildByClassName } from "../utils.js";
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
    button.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const expand = el.innerText == "add";
        toggleAll(el.parentElement?.nextElementSibling, expand, false);
    });
    return button;
}
/**
 * Initializes a tree recursively.
 * @param element element to initialize
 * @param buttonType icon button type
 * @param checkboxes whether to include checkboxes
 */
function initializeTree(element, buttonType, checkboxes = false) {
    if (!element) {
        return;
    }
    for (const child of element.children) {
        const el = child;
        if (checkboxes && el.classList.contains("md-tree__label")) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("md-checkbox");
            const input = document.createElement("input");
            input.type = "checkbox";
            el.insertAdjacentElement("afterbegin", input);
            el.insertAdjacentElement("beforebegin", wrapper);
            wrapper.appendChild(el);
        }
        if (el.classList.contains("md-tree__subtree")) {
            const label = el.previousElementSibling;
            el.style.display = "none";
            label.insertAdjacentElement("afterbegin", createButton(buttonType));
            initializeTree(el, buttonType, checkboxes);
        }
    }
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
 * Initializes a given tree.
 * @param tree tree to initialize
 */
export function initialize(tree) {
    if (!(tree instanceof HTMLElement)) {
        return;
    }
    initializeTree(tree, tree.dataset.mdButtonStyle, tree.dataset.mdCheckboxes == "true");
    toggleAll(tree, tree.dataset.mdExpandOnLoad == "true", true);
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
    if (!tree ||
        !(tree instanceof HTMLElement) ||
        !tree.classList.contains("md-tree__subtree")) {
        return;
    }
    const button = getChildByClassName(tree.previousElementSibling, "md-icon-button");
    if (!button) {
        return;
    }
    tree.style.display = expand ? "flex" : "none";
    button.innerText = expand ? "remove" : "add";
    if (expand) {
        button.classList.add("md-icon-button--selected");
    }
    else {
        button.classList.remove("md-icon-button--selected");
    }
}
/**
 * Expands or collapses all elements in a tree.
 * @param tree element to toggle
 * @param expand whether to expand or collapse
 * @param cascadeExpand whether to cascade expansion to children
 */
export function toggleAll(tree, expand, cascadeExpand) {
    if (!tree) {
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
