function createButton() {
    const button = document.createElement("button");
    button.classList.add("md-icon-button", "md-icon-button--small", "md-symbol");
    button.innerText = "add";
    button.dataset.mdExpanded = "no";
    button.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const expand = el.dataset.mdExpanded == "no";
        el.dataset.mdExpanded = expand ? "yes" : "no";
        toggleSection(el, expand);
    });
    return button;
}
function toggleSection(target, expand) {
    var _a;
    const prev = target.previousElementSibling;
    if (!prev || !prev.dataset.level) {
        return;
    }
    const prevLevel = parseInt(prev.dataset.level);
    let next = (_a = prev.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
    while (next) {
        const level = next.dataset.level
            ? parseInt(next.dataset.level)
            : -1;
        if (level <= prevLevel) {
            break;
        }
        next.style.display = expand ? "flex" : "none";
        next = next.nextElementSibling;
    }
    target.innerText = expand ? "remove" : "add";
}
function initializeR(element) {
    for (let i = 1; i < element.children.length; i++) {
        initializeR(element.children[i]);
    }
}
export function initialize(tree) {
    for (let i = 1; i < tree.children.length; i++) {
        initializeR(tree.children[i]);
    }
    // const children = tree.children;
    // console.log(children);
    // for(let i = 0; i < )
    // const items = tree.querySelectorAll(".md-tree__item");
    // for (let i = 0; i < items.length; i++) {
    //     const curr = items[i] as HTMLElement;
    //     if (curr.children.length > 1) {
    //         curr.children[0].insertAdjacentElement("beforeend", createButton());
    //     }
    //     if (curr.parentElement?.classList.contains("md-tree__subtree")) {
    //         curr.style.display = "none";
    //     }
    // }
}
