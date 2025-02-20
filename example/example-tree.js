import { populate } from "../modules/components/tree.js";

const exampleTree = Object.freeze({
    "Item 1": {},
    "Item 2": {
        "Item 3": {},
        "Item 4": {},
        "Item 5": {
            "Item 6": {},
            "Item 7": {},
            "Item 8": {},
        },
    },
    "Item 9": {},
    "Item 10": {
        "Item 11": {
            "Item 12": {
                "Item 13": {},
                "Item 14": {},
            },
        },
    },
    "Item 15": {},
    "Item 16": {},
});

document.addEventListener("DOMContentLoaded", (e) => {
    const element = document.getElementById("example-tree");
    populate(element, exampleTree);
});
