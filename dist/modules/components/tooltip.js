/**
 * @file            components/tooltip.ts
 * @description     Implementation file for Material Design tooltips.
 */
import TimedQueue from "../types/timed-queue.js";
import { getParentByClassName } from "../utils.js";
const queue = new TimedQueue();
/**
 * Moves a tooltip to a location based on its parent.
 * @param parent - element that controls the tooltip
 * @param tooltip - tooltip to move
 * @param inAppBar - whether the parent is inside an app bar
 */
function move(parent, tooltip, inAppBar) {
    const parentRect = parent.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 8;
    const aboveParent = parentRect.top - tooltipRect.height - padding;
    const belowParent = parentRect.bottom + padding;
    // center the tooltip above the parent
    let left = parentRect.left + parentRect.width / 2 - tooltipRect.width / 2;
    let top = inAppBar ? belowParent : aboveParent;
    // if the tooltip is rich, move to the bottom right corner of the parent
    if (tooltip.classList.contains("md-tooltip--rich")) {
        left = parentRect.right + padding;
        top = belowParent;
    }
    // if the tooltip overflows the right side, move it slightly over
    if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - padding;
    }
    // if the tooltip overflows the left side, move it slightly over
    else if (left < 0) {
        left = padding;
    }
    // if the tooltip overflows the bottom, move it to the top
    if (top + tooltipRect.height > window.innerHeight) {
        top = aboveParent;
    }
    // if the tooltip overflows the top, move it to the bottom
    else if (top < 0) {
        top = belowParent;
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}
/**
 * Hides the given tooltip.
 * @param tooltip - tooltip to hide
 * @param immediate - whether to skip delay
 */
export function hide(tooltip, immediate = false) {
    queue.push({
        callback: (item) => {
            if (item.data.dataset.mdHovered == undefined) {
                item.data.classList.remove("md-tooltip--visible");
            }
        },
        delay: immediate ? 0 : 1500,
        data: tooltip,
    });
}
/**
 * Hides all visible tooltips and shows the given tooltip.
 * @param parent - element that controls the tooltip
 * @param tooltip - tooltip to show
 * @param immediate - whether to skip delay
 */
export function show(parent, tooltip, immediate = false) {
    const parentInAppBar = getParentByClassName(parent, "md-app-bar") != null;
    move(parent, tooltip, parentInAppBar);
    queue.clear((item) => item.data.classList.remove("md-tooltip--visible"));
    queue.push({
        callback: (item) => item.data.classList.add("md-tooltip--visible"),
        data: tooltip,
        delay: immediate ? 0 : 500,
    });
}
/**
 * Initializes a tooltip's parent.
 * @param parent - element which controls a tooltip
 */
export function initialize(parent) {
    if (!parent.dataset.mdTooltip) {
        return;
    }
    const tooltip = document.getElementById(parent.dataset.mdTooltip);
    if (!tooltip) {
        return;
    }
    tooltip.addEventListener("mouseenter", () => {
        tooltip.dataset.mdHovered = "";
    });
    tooltip.addEventListener("mouseleave", () => {
        delete tooltip.dataset.mdHovered;
        hide(tooltip);
    });
    parent.addEventListener("mouseenter", () => {
        show(parent, tooltip);
    });
    parent.addEventListener("mouseleave", () => {
        queue.clear();
        hide(tooltip);
    });
}
