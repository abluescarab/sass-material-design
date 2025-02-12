import { getParentWithClass } from "../utils";
export function initialize(container) {
    container.addEventListener("click", (e) => {
        var _a;
        const button = getParentWithClass(e.target, "material-tabs__nav-button");
        // ensure button is direct child of current tab container
        if (button != null &&
            ((_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) == container) {
            changeTab(container, container.dataset.tab, button.dataset.tab);
        }
    });
}
function changeTab(container, oldTab, newTab) {
    if (newTab == null) {
        return;
    }
    if (oldTab == newTab) {
        return;
    }
    const [oldButton, oldContent] = getTab(container, oldTab);
    const [newButton, newContent] = getTab(container, newTab);
    oldButton === null || oldButton === void 0 ? void 0 : oldButton.classList.remove("current");
    oldContent === null || oldContent === void 0 ? void 0 : oldContent.classList.remove("current");
    newButton === null || newButton === void 0 ? void 0 : newButton.classList.add("current");
    newContent === null || newContent === void 0 ? void 0 : newContent.classList.add("current");
    container.dataset.tab = newTab;
}
function getTab(container, tab) {
    return [
        container.querySelector('.material-tabs__nav-button[data-tab="' + tab + '"]'),
        container.querySelector('.material-tabs__page[data-tab="' + tab + '"]'),
    ];
}
