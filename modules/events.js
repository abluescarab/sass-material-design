/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/
/**
 * The state of any toggleable element.
 */
export var MaterialState;
(function (MaterialState) {
    /**
     * An expanded element, such as a tree item or collapsible container.
     */
    MaterialState[MaterialState["Expanded"] = 0] = "Expanded";
    /**
     * A collapsed element, such as a tree item or collapsible container.
     */
    MaterialState[MaterialState["Collapsed"] = 1] = "Collapsed";
    /**
     * An enabled element, such as a button or input box.
     */
    MaterialState[MaterialState["Enabled"] = 2] = "Enabled";
    /**
     * A disabled element, such as a button or input box.
     */
    MaterialState[MaterialState["Disabled"] = 3] = "Disabled";
    /**
     * A checked element, usually a checkbox or radio button.
     */
    MaterialState[MaterialState["Checked"] = 4] = "Checked";
    /**
     * An unchecked element, usually a checkbox or radio button.
     */
    MaterialState[MaterialState["Unchecked"] = 5] = "Unchecked";
    /**
     * A selected element, such as a button or tab.
     */
    MaterialState[MaterialState["Selected"] = 6] = "Selected";
    /**
     * An unselected element, such as a button or tab.
     */
    MaterialState[MaterialState["Unselected"] = 7] = "Unselected";
})(MaterialState || (MaterialState = {}));
/**
 * A base for all custom Material events.
 */
export class MaterialEvent extends Event {
    /**
     * Creates a new MaterialEvent.
     * @param type event name
     * @param source element which triggered the event (not the dispatcher)
     */
    constructor(type, source) {
        super(`material:${type}`);
        this.source = source;
    }
}
/**
 * An event type for any element that changes value.
 */
export class MaterialChangeEvent extends MaterialEvent {
    /**
     * Creates a new MaterialChangeEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param oldValue value before change
     * @param newValue value after change
     */
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
    /**
     * Creates a new MaterialToggleEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param state toggle state of type {@link MaterialState}
     */
    constructor(source, state) {
        super("toggle", source);
        this.state = state;
    }
}
