/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/
/**
 * The state of any toggleable element.
 */
export declare enum MaterialState {
    /**
     * An expanded element, such as a tree item or collapsible container.
     */
    Expanded = 0,
    /**
     * A collapsed element, such as a tree item or collapsible container.
     */
    Collapsed = 1,
    /**
     * An enabled element, such as a button or input box.
     */
    Enabled = 2,
    /**
     * A disabled element, such as a button or input box.
     */
    Disabled = 3,
    /**
     * A checked element, usually a checkbox or radio button.
     */
    Checked = 4,
    /**
     * An unchecked element, usually a checkbox or radio button.
     */
    Unchecked = 5,
    /**
     * A selected element, such as a button or tab.
     */
    Selected = 6,
    /**
     * An unselected element, such as a button or tab.
     */
    Unselected = 7
}
/**
 * A base for all custom Material events.
 */
export declare class MaterialEvent extends Event {
    readonly source: Element | null | undefined;
    /**
     * Creates a new MaterialEvent.
     * @param type event name
     * @param source element which triggered the event (not the dispatcher)
     */
    constructor(type: string, source: Element | null | undefined);
}
/**
 * An event type for any element that changes value.
 */
export declare class MaterialChangeEvent<T> extends MaterialEvent {
    readonly oldValue?: T;
    readonly newValue?: T;
    /**
     * Creates a new MaterialChangeEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param oldValue value before change
     * @param newValue value after change
     */
    constructor(source: Element | null | undefined, oldValue?: T, newValue?: T);
}
/**
 * An event type for any element that has changed toggle state.
 */
export declare class MaterialToggleEvent extends MaterialEvent {
    readonly state: MaterialState;
    /**
     * Creates a new MaterialToggleEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param state toggle state of type {@link MaterialState}
     */
    constructor(source: Element | null | undefined, state: MaterialState);
}
