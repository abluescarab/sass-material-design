function createButton() {
    const button = document.createElement("button");
    button.classList.add("md-tree__button", "md-symbol");
    button.dataset.mdType = "filled";
    button.innerText = "add";

    button.addEventListener("click", (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        const expand = el.innerText == "add";
        toggleAll(
            el.parentElement?.nextElementSibling as HTMLElement,
            expand,
            false
        );
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
                "afterbegin",
                createButton()
            );

            initializeTree(el);
        }
    }
}

export function toggleAll(
    tree: HTMLElement,
    expand: boolean,
    cascadeExpand: boolean
) {
    if (!tree) {
        return;
    }

    if (tree.classList.contains("md-tree__subtree")) {
        toggle(tree, expand);
    }

    if (!expand || (cascadeExpand && expand)) {
        for (const subtree of tree.getElementsByClassName("md-tree__subtree")) {
            toggle(subtree as HTMLElement, expand);
        }
    }
}

export function toggle(tree: HTMLElement | null, expand: boolean) {
    if (!tree || !tree.classList.contains("md-tree__subtree")) {
        return;
    }

    const button = tree.previousElementSibling?.getElementsByClassName(
        "md-tree__button"
    )[0] as HTMLElement;

    if (!button) {
        return;
    }

    tree.style.display = expand ? "flex" : "none";
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
    toggleAll(tree, tree.dataset.mdExpanded == "true", true);
}
