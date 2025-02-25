/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/
/**
 * The state of any toggleable element.
 */
export var MaterialState;
(function (MaterialState) {
    MaterialState[MaterialState["Expanded"] = 0] = "Expanded";
    MaterialState[MaterialState["Collapsed"] = 1] = "Collapsed";
    MaterialState[MaterialState["Enabled"] = 2] = "Enabled";
    MaterialState[MaterialState["Disabled"] = 3] = "Disabled";
    MaterialState[MaterialState["Checked"] = 4] = "Checked";
    MaterialState[MaterialState["Unchecked"] = 5] = "Unchecked";
    MaterialState[MaterialState["Selected"] = 6] = "Selected";
    MaterialState[MaterialState["Unselected"] = 7] = "Unselected";
})(MaterialState || (MaterialState = {}));
/**
 * Triggers an event on the given element.
 * @param target element that dispatches the event
 * @param name name of the event
 * @param args arguments of any type derived from {@link MaterialEventBase}
 */
export function triggerEvent(target, name, args) {
    target.dispatchEvent(new CustomEvent(name, { detail: args }));
}
