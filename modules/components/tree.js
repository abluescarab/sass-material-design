function createButton() {
    const button = document.createElement("button");
    button.classList.add("md-icon-button", "md-icon-button--small", "md-symbol");
    button.innerText = "add";
    button.addEventListener("click", (e) => {
        var _a;
        const el = e.currentTarget;
        const expand = el.innerText == "add";
        toggle((_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling, expand);
    });
    return button;
}
function initializeTree(element) {
    var _a;
    if (!element) {
        return;
    }
    for (const child of element.children) {
        const el = child;
        if (el.classList.contains("md-tree__subtree")) {
            el.style.display = "none";
            (_a = el.previousElementSibling) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("beforeend", createButton());
            initializeTree(el);
        }
    }
}
export function toggleAll(tree, expand) {
    if (!tree) {
        return;
    }
    if (tree.classList.contains("md-tree__subtree")) {
        toggle(tree, expand);
    }
    for (const subtree of tree.querySelectorAll(".md-tree__subtree")) {
        toggle(subtree, expand);
    }
}
export function toggle(tree, expand) {
    var _a;
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }
    const button = (_a = tree.previousElementSibling) === null || _a === void 0 ? void 0 : _a.querySelector(".md-icon-button");
    if (!button) {
        return;
    }
    tree.style.display = expand ? "block" : "none";
    button.innerText = expand ? "remove" : "add";
}
export function populate(tree, map) {
    for (const [key, value] of Object.entries(map)) {
        const text = document.createElement("span");
        text.classList.add("md-tree__text");
        text.innerText = key;
        tree.appendChild(text);
        if (Object.keys(value).length > 0) {
            const subtree = document.createElement("div");
            subtree.classList.add("md-tree__subtree");
            populate(subtree, value);
            tree.appendChild(subtree);
        }
    }
}
export function initialize(tree) {
    initializeTree(tree);
    toggleAll(tree, tree.dataset.mdExpanded == "true");
}
