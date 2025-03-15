/**
 * @file            example/showcase.ts
 * @description     Implements functionality for the showcase.
 */

// TODO: implement up/down arrows on panes
import {
    capitalize,
    cycleData,
    cycleThemes,
    getParentByClassName,
    initialize,
    setTheme,
    stringToSelector,
    wrap,
} from "../material.js";
import { populate } from "../modules/components/tree.js";

const container = document.getElementById("fab-container");
const fab = document.getElementById("fab");
const themeFab = document.getElementById("toggle-theme");
const fabVisibilityButton = document.getElementById("fab-visibility");

const exampleTree = Object.freeze({
    "Item 1": {
        "Item 2": {
            "Item 3": {
                "Item 4": {
                    "Item 5": {},
                },
            },
        },
    },
    "Item 6": {
        "Item 7": {
            "Item 8": {},
            "Item 9": {},
            "Item 10": {},
        },
        "Item 11": {},
        "Item 12": {
            "Item 13": {},
            "Item 14": {},
            "Item 15": {},
        },
    },
    "Item 16": {},
    "Item 17": {
        "Item 18": {
            "Item 19": {
                "Item 20": {},
            },
        },
    },
});

/**
 * Changes the icon and text in the button that controls FAB visibility.
 */
function changeFabVisibilityButton(): void {
    if (!fabVisibilityButton) {
        return;
    }

    fabVisibilityButton.childNodes[1].textContent =
        container?.style.display == "none" ? "visibility" : "visibility_off";

    replaceFabButtonText(
        fabVisibilityButton,
        container?.style.display == "none" ? "Show" : "Hide"
    );
}

/**
 * Changes the icon on the button that controls the page theme.
 * @param theme - light or dark
 */
function changeThemeButtonIcon(theme: string): void {
    if (!(themeFab instanceof Element)) {
        return;
    }

    const icon = themeFab.querySelector(".md-fab__icon");

    if (!icon) {
        return;
    }

    icon.textContent = theme == "light" ? "dark_mode" : "light_mode";
}

/**
 * Creates the attributes display.
 * @param el - element to display attributes for
 */
function createAttributes(el: Element): void {
    if (!el.children.length) {
        return;
    }

    const wrapper = wrap(el, "div", true);
    wrapper.classList.add("flex", "fill");

    if (el.classList.contains("cols")) {
        wrapper.classList.add("cols");
    } else {
        wrapper.classList.add("rows");
    }

    const attributes = document.createElement("div");
    const code = document.createElement("code");
    const h2 = document.createElement("h2");

    h2.dataset.mdTypescale = "title-medium";
    h2.textContent = "Attributes";

    const element = wrapper.children[0] as HTMLElement;
    const dataset = Object.keys(element.dataset).sort();

    const length = Math.max(...dataset.map((d) => stringToSelector(d).length));

    if (
        element.hasAttribute("disabled") ||
        element.className.includes("--disabled")
    ) {
        code.innerHTML += "disabled<br />";
    }

    for (const data of dataset) {
        const str = `data-${stringToSelector(data)}:`;
        const para = document.createElement("p");
        para.classList.add("attribute");
        para.innerHTML += str;
        para.innerHTML += "&nbsp;".repeat(length + 7 - str.length);

        const italic = document.createElement("span");
        italic.style.fontStyle = "italic";
        italic.innerHTML =
            element.dataset[data] != undefined && element.dataset[data] != ""
                ? element.dataset[data]
                : "true";

        para.appendChild(italic);
        code.appendChild(para);
    }

    if (code.innerHTML == "") {
        code.innerHTML = "No attributes.";
    }

    attributes.appendChild(h2);
    attributes.appendChild(code);
    el.insertAdjacentElement("afterbegin", attributes);
}

/**
 * Replaces the text inside any button that controls the FAB display.
 * @param button - button to replace text inside
 * @param replacement - text to replace with
 */
function replaceFabButtonText(button: Element, replacement: string): void {
    const node = button.childNodes[2];
    node.nodeValue =
        node.nodeValue?.replace(node.nodeValue.trim(), replacement) ?? "";
}

document.addEventListener("DOMContentLoaded", () => {
    const trees = [
        "tree-all-checkboxes",
        "tree-subtree-checkboxes",
        "tree-root-checkboxes",
        "tree-leaf-checkboxes",
    ];

    const theme = sessionStorage.getItem("theme") ?? "light";
    setTheme(document.body, theme);
    changeThemeButtonIcon(theme);

    if (container) {
        container.style.display = sessionStorage.getItem("fab-hidden")
            ? "none"
            : "flex";
    }

    changeFabVisibilityButton();

    for (const tree of trees) {
        const element = document.getElementById(tree);

        if (element) {
            populate(element, exampleTree);
        }
    }

    [].forEach.call(document.getElementsByClassName("attributes"), (el) =>
        createAttributes(el)
    );

    initialize();
});

document.getElementById("close-banner")?.addEventListener("click", (e) => {
    if (!(e.currentTarget instanceof Element)) {
        return;
    }

    getParentByClassName(e.currentTarget, "md-banner")?.classList.remove(
        "md-banner--visible"
    );
});

[].forEach.call(
    document
        .getElementById("icon-buttons")
        ?.getElementsByClassName("md-icon-button"),
    (el: Element) => {
        el.addEventListener("click", (e) => {
            if (!(e.currentTarget instanceof Element)) {
                return;
            }

            e.currentTarget.classList.toggle("md-icon-button--selected");
        });
    }
);

document
    .getElementById("close-fullscreen-dialog")
    ?.addEventListener("click", (e) => {
        if (!(e.currentTarget instanceof Element)) {
            return;
        }

        getParentByClassName(e.currentTarget, "md-dialog")?.classList.remove(
            "md-dialog--visible"
        );
    });

document
    .querySelectorAll("#snackbars .md-pane__content > .md-button")
    .forEach((element) =>
        element.addEventListener("click", (e) => {
            if (!(e.currentTarget instanceof HTMLElement)) {
                return;
            }

            const el = e.currentTarget;
            const snackbar = el?.nextElementSibling;

            snackbar?.classList.toggle("md-snackbar--visible");

            if (snackbar?.classList.contains("md-snackbar--visible")) {
                el.innerText = el.innerText.replace("Show", "Hide");
            } else {
                el.innerText = el.innerText.replace("Hide", "Show");
            }
        })
    );

document.querySelectorAll(".md-snackbar .md-action").forEach((element) =>
    element.addEventListener("click", (e) => {
        if (!(e.currentTarget instanceof Element)) {
            return;
        }

        const el = e.currentTarget.parentElement;
        const prev = el?.previousElementSibling;

        el?.classList.remove("md-snackbar--visible");

        if (!(prev instanceof HTMLElement)) {
            return;
        }

        prev.innerText = prev.innerText.replace("Hide", "Show");
    })
);

document
    .querySelectorAll("#dialogs .md-pane__content > .md-button")
    .forEach((element) =>
        element.addEventListener("click", (e) => {
            if (!(e.currentTarget instanceof Element)) {
                return;
            }

            e.currentTarget.nextElementSibling?.classList.toggle(
                "md-dialog--visible"
            );
        })
    );

document.querySelectorAll(".md-dialog .close-button").forEach((element) =>
    element.addEventListener("click", (e) => {
        if (!(e.currentTarget instanceof HTMLElement)) {
            return;
        }

        getParentByClassName(e.currentTarget, "md-dialog")?.classList.remove(
            "md-dialog--visible"
        );
    })
);

document.getElementById("show-nested-dialog")?.addEventListener("click", () => {
    document
        .getElementById("nested-dialog")
        ?.classList.add("md-dialog--visible");
});

document
    .getElementById("show-nested-long-dialog")
    ?.addEventListener("click", () => {
        document
            .getElementById("nested-long-dialog")
            ?.classList.add("md-dialog--visible");
    });

// -----------------------------------------------------------------------------
// FAB events
themeFab?.addEventListener("click", () => {
    const theme = cycleThemes(document.body, "light", "dark");
    changeThemeButtonIcon(theme);
    sessionStorage.setItem("theme", theme ?? "light");
});

fab?.addEventListener("click", () =>
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
);

document.getElementById("fab-color")?.addEventListener("click", (e) => {
    if (
        !(fab instanceof HTMLElement) ||
        !(e.currentTarget instanceof Element)
    ) {
        return;
    }

    const color = cycleData(
        fab,
        "color",
        "",
        "primary",
        "secondary",
        "tertiary"
    );
    replaceFabButtonText(
        e.currentTarget,
        color == "" ? "Surface" : capitalize(color)
    );
});

document.getElementById("fab-size")?.addEventListener("click", (e) => {
    if (!(e.currentTarget instanceof Element)) {
        return;
    }

    const size = fab
        ? cycleData(fab, "size", "", "small", "large", "extended")
        : "";
    replaceFabButtonText(
        e.currentTarget,
        size == "" ? "Medium" : capitalize(size)
    );
});

document.getElementById("fab-elevation")?.addEventListener("click", (e) => {
    if (!(e.currentTarget instanceof Element)) {
        return;
    }

    fab?.classList.toggle("md-fab--low");
    replaceFabButtonText(
        e.currentTarget,
        fab?.classList.contains("md-fab--low") ? "Low" : "High"
    );
});

document.getElementById("fab-lr")?.addEventListener("click", (e) => {
    if (!container || !(e.currentTarget instanceof Element)) {
        return;
    }

    const side = container.dataset.mdLr == "right" ? "left" : "right";
    container.dataset.mdLr = side;
    replaceFabButtonText(e.currentTarget, capitalize(side));
});

document.getElementById("fab-tb")?.addEventListener("click", (e) => {
    if (!container || !(e.currentTarget instanceof Element)) {
        return;
    }

    const side = container.dataset.mdTb == "bottom" ? "top" : "bottom";
    container.dataset.mdTb = side;
    replaceFabButtonText(e.currentTarget, capitalize(side));
});

document.getElementById("fab-orientation")?.addEventListener("click", (e) => {
    if (!(e.currentTarget instanceof Element)) {
        return;
    }

    replaceFabButtonText(
        e.currentTarget,
        container?.classList.toggle("md-fixed--reverse") ? "Reverse" : "Forward"
    );
});

fabVisibilityButton?.addEventListener("click", () => {
    if (!container) {
        return;
    }

    const wasHidden = container.style.display == "none";
    container.style.display = wasHidden ? "flex" : "none";

    changeFabVisibilityButton();

    if (wasHidden) {
        sessionStorage.removeItem("fab-hidden");
    } else {
        sessionStorage.setItem(
            "fab-hidden",
            (container.style.display != "none").toString()
        );
    }
});
