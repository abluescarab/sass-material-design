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
 * A base for all custom Material events.
 */
export class MaterialEvent extends Event {
    constructor(type, source) {
        super(`material:${type}`);
        this.source = source;
    }
}
/**
 * An event type for any element that changes value.
 */
export class MaterialChangeEvent extends MaterialEvent {
    constructor(source, oldValue, newValue) {
        super("change", source);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
/**
 * An event type for any element that has changed toggle state.
 */
export class MaterialToggleEvent extends MaterialEvent {
    constructor(source, state) {
        super("toggle", source);
        this.state = state;
    }
}
