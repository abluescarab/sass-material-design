function createButton() {
    const button = document.createElement("button");
    button.classList.add(
        "md-icon-button",
        "md-icon-button--small",
        "md-symbol"
    );
    button.innerText = "add";
    button.dataset.mdExpanded = "no";

    button.addEventListener("click", (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        const expand = el.dataset.mdExpanded == "no";

        el.dataset.mdExpanded = expand ? "yes" : "no";
        toggleSection(el, expand);
    });

    return button;
}

function toggleSection(target: HTMLElement, expand: boolean) {
    const prev = target.previousElementSibling as HTMLElement;

    if (!prev || !prev.dataset.level) {
        return;
    }

    const prevLevel = parseInt(prev.dataset.level);
    let next = prev.parentElement?.nextElementSibling as HTMLElement;

    while (next) {
        const level: number = next.dataset.level
            ? parseInt(next.dataset.level)
            : -1;

        if (level <= prevLevel) {
            break;
        }

        next.style.display = expand ? "flex" : "none";
        next = next.nextElementSibling as HTMLElement;
    }

    target.innerText = expand ? "remove" : "add";
}

function initializeR(element: HTMLElement) {
    for (let i = 1; i < element.children.length; i++) {
        initializeR(element.children[i] as HTMLElement);
    }
}

export function initialize(tree: HTMLElement) {
    for (let i = 1; i < tree.children.length; i++) {
        initializeR(tree.children[i] as HTMLElement);
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
