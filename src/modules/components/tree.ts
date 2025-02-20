function createButton() {
    const button = document.createElement("button");
    button.classList.add(
        "md-icon-button",
        "md-icon-button--small",
        "md-symbol"
    );
    button.innerText = "add";

    button.addEventListener("click", (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        const expand = el.innerText == "add";
        toggle(el.parentElement?.nextElementSibling as HTMLElement, expand);
    });

    return button;
}

function initializeTree(element: HTMLElement) {
    if (!element) {
        return;
    }

    for (const child of element.children) {
        const el = child as HTMLElement;

        if (el.classList.contains("md-tree__subtree")) {
            el.style.display = "none";
            el.previousElementSibling?.insertAdjacentElement(
                "beforeend",
                createButton()
            );

            initializeTree(el);
        }
    }
}

export function toggleAll(tree: HTMLElement, expand: boolean) {
    if (!tree) {
        return;
    }

    if (tree.classList.contains("md-tree__subtree")) {
        toggle(tree, expand);
    }

    for (const subtree of tree.querySelectorAll(".md-tree__subtree")) {
        toggle(subtree as HTMLElement, expand);
    }
}

export function toggle(tree: HTMLElement | null, expand: boolean) {
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }

    const button = tree.previousElementSibling?.querySelector(
        ".md-icon-button"
    ) as HTMLElement;

    if (!button) {
        return;
    }

    tree.style.display = expand ? "block" : "none";
    button.innerText = expand ? "remove" : "add";
}

export function populate(tree: HTMLElement, map: Map<string, any>) {
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

export function initialize(tree: HTMLElement) {
    initializeTree(tree);
    toggleAll(tree, tree.dataset.mdExpanded == "true");
}
