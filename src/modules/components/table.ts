/**
 * @file            components/table.ts
 * @description     Implementation file for data table components.
 */

import { childIndex, clamp } from "../utils.js";

/**
 * Initializes a data table.
 * @param table - table to initialize
 */
export function initialize(table: HTMLElement): void {
    if (
        !(table instanceof HTMLTableElement) ||
        !table.classList.contains("md-table")
    ) {
        return;
    }

    const thead =
        table.getElementsByTagName("thead")[0] ??
        document.createElement("thead");

    if (!thead.parentElement) {
        thead.appendChild(table.getElementsByTagName("tr")[0]);
        table.insertAdjacentElement("afterbegin", thead);
    }

    if (table.dataset.mdSortable == undefined) {
        return;
    }

    const defaultHeading: HTMLElement =
        thead.querySelector("th[data-md-sortable~='default']") ??
        thead.getElementsByTagName("th")[0];

    table.addEventListener("click", (e) => {
        if (
            !(e.target instanceof HTMLElement) ||
            e.target.dataset.mdSortable == undefined
        ) {
            return;
        }

        sort(table, e.target, e.target.dataset.mdOrder == "ascending");
    });

    sort(table, defaultHeading, defaultHeading.dataset.mdOrder == "descending");
}

/**
 * Sorts a table in alphabetical order. This function expects the first row
 * of the table to be the header and excludes it from sorting.
 * @param table - table element to sort
 * @param header - header to sort by
 * @param reverse - whether to sort in reverse order
 */
function sort(
    table: HTMLTableElement,
    header: HTMLElement,
    reverse: boolean
): void {
    const rows = table.getElementsByTagName("tr");

    if (!rows) {
        return;
    }

    const headerRow = rows[0];
    const column = clamp(childIndex(header), 0, headerRow.children.length);
    const sorted = Array.from(rows).slice(1, rows.length);

    sorted.sort((a, b) =>
        a.cells[column].innerText.localeCompare(b.cells[column].innerText)
    );

    if (reverse) {
        sorted.reverse();
    }

    if (table.dataset.mdSortColumn != undefined) {
        const oldColumn = parseInt(table.dataset.mdSortColumn);

        if (oldColumn >= 0 && oldColumn < headerRow.children.length) {
            delete (headerRow.children[oldColumn] as HTMLElement).dataset
                .mdOrder;
        }
    }

    header.dataset.mdOrder = reverse ? "descending" : "ascending";

    const fragment = document.createDocumentFragment();
    fragment.append(...sorted);

    table.tBodies[0].appendChild(fragment);
    table.dataset.mdSortColumn = `${column}`;
}
