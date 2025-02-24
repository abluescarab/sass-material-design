/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/
/**
 * The state of any toggleable element.
 */
export var ToggleState;
(function (ToggleState) {
    ToggleState[ToggleState["Expanded"] = 0] = "Expanded";
    ToggleState[ToggleState["Collapsed"] = 1] = "Collapsed";
    ToggleState[ToggleState["Enabled"] = 2] = "Enabled";
    ToggleState[ToggleState["Disabled"] = 3] = "Disabled";
    ToggleState[ToggleState["Checked"] = 4] = "Checked";
    ToggleState[ToggleState["Unchecked"] = 5] = "Unchecked";
    ToggleState[ToggleState["Selected"] = 6] = "Selected";
    ToggleState[ToggleState["Unselected"] = 7] = "Unselected";
})(ToggleState || (ToggleState = {}));
/**
 * Triggers an event on the given element.
 * @param target element that dispatches the event
 * @param name name of the event
 * @param args arguments of any type derived from {@link MaterialEventBase}
 */
export function triggerEvent(target, name, args) {
    target.dispatchEvent(new CustomEvent(name, { detail: args }));
}
