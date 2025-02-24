// TODO: implement up/down arrows on panes
import {
    initialize,
    getParentWithClass,
    cycleData,
    capitalize,
    cycleThemes,
} from "../material.js";
import { populate } from "../modules/components/tree.js";

const container = document.getElementById("fab-container");
const fab = document.getElementById("fab");

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
 * Replaces the text inside any button that controls the FAB display.
 * @param {*} button button to replace text inside
 * @param {*} replacement text to replace with
 */
function replaceFabButtonText(button, replacement) {
    const node = button.childNodes[2];
    node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), replacement);
}

function dataToSelector(dataName) {
    return dataName.replaceAll(/([A-Z])/g, "-$1").toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {
    populate(document.getElementById("tree-all-checkboxes"), exampleTree);
    populate(document.getElementById("tree-subtree-checkboxes"), exampleTree);
    populate(document.getElementById("tree-root-checkboxes"), exampleTree);
    populate(document.getElementById("tree-leaf-checkboxes"), exampleTree);

    [].forEach.call(document.getElementsByClassName("attributes"), (el) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("flex", "rows", "fill");

        while (el.firstChild) {
            wrapper.appendChild(el.firstChild);
        }

        el.appendChild(wrapper);

        const attributes = document.createElement("div");
        const code = document.createElement("code");
        const h2 = document.createElement("h2");

        h2.dataset.mdTypescale = "title-medium";
        h2.innerText = "Attributes";

        const element = wrapper.children[0];
        const dataset = Object.keys(element.dataset).sort();

        const length = Math.max(
            ...dataset.map((d) => dataToSelector(d).length)
        );

        if (element.disabled || element.className.includes("--disabled")) {
            code.innerHTML += "disabled<br />";
        }

        for (const data of dataset) {
            const str = `data-${dataToSelector(data)}:`;
            const para = document.createElement("p");
            para.classList.add("attribute");
            para.innerHTML += str;
            para.innerHTML += "&nbsp;".repeat(length + 7 - str.length);

            const italic = document.createElement("span");
            italic.style.fontStyle = "italic";
            italic.innerHTML =
                element.dataset[data] != "" ? element.dataset[data] : "true";

            para.appendChild(italic);
            code.appendChild(para);
        }

        if (code.innerHTML == "") {
            code.innerHTML = "No attributes.";
        }

        attributes.appendChild(h2);
        attributes.appendChild(code);
        el.appendChild(attributes);
    });

    initialize();
});

document
    .getElementById("close-banner")
    .addEventListener("click", (e) =>
        getParentWithClass(e.currentTarget, "md-banner").classList.remove(
            "md-banner--visible"
        )
    );

document.getElementById("toggle-theme").addEventListener("click", (e) => {
    e.currentTarget.getElementsByClassName("md-fab__icon")[0].innerText =
        cycleThemes(document.body, "light", "dark") == "light"
            ? "dark_mode"
            : "light_mode";
});

[].forEach.call(
    document
        .getElementById("icon-buttons")
        .getElementsByClassName("md-icon-button"),
    (el) => {
        el.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("md-icon-button--selected");
        });
    }
);

document
    .getElementById("checkbox-1")
    .addEventListener(
        "change",
        (e) =>
            (document.getElementById("checkbox-2").disabled =
                !e.currentTarget.checked)
    );

document
    .getElementById("checkbox-3")
    .addEventListener(
        "change",
        (e) =>
            (document.getElementById("checkbox-4").disabled =
                !e.currentTarget.checked)
    );

document
    .querySelectorAll("#snackbars .md-pane__content > .md-button")
    .forEach((element) =>
        element.addEventListener("click", (e) => {
            const el = e.currentTarget;
            const snackbar = el.nextElementSibling;

            snackbar.classList.toggle("md-snackbar--visible");

            if (snackbar.classList.contains("md-snackbar--visible")) {
                el.innerText = el.innerText.replace("Show", "Hide");
            } else {
                el.innerText = el.innerText.replace("Hide", "Show");
            }
        })
    );

document.querySelectorAll(".md-snackbar__action").forEach((element) =>
    element.addEventListener("click", (e) => {
        const el = e.currentTarget.parentElement;

        el.classList.remove("md-snackbar--visible");
        el.previousElementSibling.innerText =
            el.previousElementSibling.innerText.replace("Hide", "Show");
    })
);

fab.addEventListener("click", (e) =>
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
);

document.getElementById("fab-color").addEventListener("click", (e) => {
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

document.getElementById("fab-size").addEventListener("click", (e) => {
    const size = cycleData(fab, "size", "", "small", "large", "extended");
    replaceFabButtonText(
        e.currentTarget,
        size == "" ? "Medium" : capitalize(size)
    );
});

document.getElementById("fab-elevation").addEventListener("click", (e) => {
    fab.classList.toggle("md-fab--low");
    replaceFabButtonText(
        e.currentTarget,
        fab.classList.contains("md-fab--low") ? "Low" : "High"
    );
});

document.getElementById("fab-lr").addEventListener("click", (e) => {
    const side = container.dataset.mdLr == "right" ? "left" : "right";
    container.dataset.mdLr = side;
    replaceFabButtonText(e.currentTarget, capitalize(side));
});

document.getElementById("fab-tb").addEventListener("click", (e) => {
    const side = container.dataset.mdTb == "bottom" ? "top" : "bottom";
    container.dataset.mdTb = side;
    replaceFabButtonText(e.currentTarget, capitalize(side));
});

document.getElementById("fab-orientation").addEventListener("click", (e) => {
    replaceFabButtonText(
        e.currentTarget,
        container.classList.toggle("md-fixed--reverse") ? "Reverse" : "Forward"
    );
});

document.getElementById("fab-visibility").addEventListener("click", (e) => {
    container.style.display =
        container.style.display == "none" ? "flex" : "none";

    e.currentTarget.childNodes[1].innerText =
        container.style.display == "none" ? "visibility" : "visibility_off";

    replaceFabButtonText(
        e.currentTarget,
        fab.style.display == "none" ? "Show" : "Hide"
    );
});
