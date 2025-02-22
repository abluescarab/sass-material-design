// TODO: add option to check children when checked
// TODO: add option to have checkmarks only for subtree elements (no top level, no parents of subtrees)
function createButton(buttonStyle) {
    const button = document.createElement("button");
    button.classList.add("md-icon-button", "md-icon-button--small", "md-symbol");
    button.dataset.mdType = buttonStyle;
    button.innerText = "add";
    button.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const expand = el.innerText == "add";
        toggleAll(el.parentElement?.nextElementSibling, expand, false);
    });
    return button;
}
function initializeTree(element, buttonStyle, checkboxes = false) {
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
            label.insertAdjacentElement("afterbegin", createButton(buttonStyle));
            initializeTree(el, buttonStyle, checkboxes);
        }
    }
}
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
export function initialize(tree) {
    initializeTree(tree, tree.dataset.mdButtonStyle, tree.dataset.mdCheckboxes == "true");
    toggleAll(tree, tree.dataset.mdExpanded == "true", true);
}
export function populate(tree, map) {
    populateTree(tree, map);
}
export function toggle(tree, expand) {
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }
    const button = tree.previousElementSibling?.getElementsByClassName("md-icon-button")[0];
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
