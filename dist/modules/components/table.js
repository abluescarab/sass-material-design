/**
 * @file            components/table.ts
 * @description     Implementation file for data table components.
 */
import { childIndex, clamp } from "../utils.js";
/**
 * Initializes a data table.
 * @param table - table to initialize
 */
export function initialize(table) {
    if (!(table instanceof HTMLTableElement) ||
        !table.classList.contains("md-table")) {
        return;
    }
    if (table.dataset.mdSortable == undefined) {
        return;
    }
    const defaultHeading = table.querySelector("th[data-md-sortable~='default']") ??
        table.getElementsByTagName("th")[0];
    table.addEventListener("click", (e) => {
        if (!(e.target instanceof HTMLElement) ||
            e.target.dataset.mdSortable == undefined) {
            return;
        }
        sort(table, e.target, e.target.dataset.mdOrder == "ascending");
    });
    sort(table, defaultHeading, defaultHeading.dataset.mdOrder == "descending");
}
/**
 * Sorts a table in alphabetical order.
 * @param table - table element to sort
 * @param header - header to sort by
 * @param reverse - whether to sort in reverse order
 */
function sort(table, header, reverse) {
    const rows = table.getElementsByTagName("tr");
    if (!rows) {
        return;
    }
    const headerRow = table.getElementsByClassName("md-table__header")[0];
    const column = clamp(childIndex(header), 0, headerRow.children.length);
    const sorted = Array.from(rows);
    if (headerRow instanceof HTMLTableRowElement) {
        sorted.splice(sorted.indexOf(headerRow), 1);
    }
    sorted.sort((a, b) => a.cells[column].innerText.localeCompare(b.cells[column].innerText));
    if (reverse) {
        sorted.reverse();
    }
    if (table.dataset.mdSortColumn != undefined) {
        const oldColumn = clamp(parseInt(table.dataset.mdSortColumn), 0, headerRow.children.length);
        delete headerRow.children[oldColumn].dataset.mdOrder;
    }
    header.dataset.mdOrder = reverse ? "descending" : "ascending";
    const fragment = document.createDocumentFragment();
    fragment.append(...sorted);
    table.tBodies[0].appendChild(fragment);
    table.dataset.mdSortColumn = `${column}`;
}
