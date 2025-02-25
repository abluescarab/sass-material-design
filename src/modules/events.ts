/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/

/**
 * The state of any toggleable element.
 */
export enum MaterialState {
    /**
     * An expanded element, such as a tree item or collapsible container.
     */
    Expanded,
    /**
     * A collapsed element, such as a tree item or collapsible container.
     */
    Collapsed,
    /**
     * An enabled element, such as a button or input box.
     */
    Enabled,
    /**
     * A disabled element, such as a button or input box.
     */
    Disabled,
    /**
     * A checked element, usually a checkbox or radio button.
     */
    Checked,
    /**
     * An unchecked element, usually a checkbox or radio button.
     */
    Unchecked,
    /**
     * A selected element, such as a button or tab.
     */
    Selected,
    /**
     * An unselected element, such as a button or tab.
     */
    Unselected,
}

/**
 * A base for all custom Material events.
 */
export class MaterialEvent extends Event {
    source: Element | null | undefined;

    /**
     * Creates a new MaterialEvent.
     * @param type event name
     * @param source element which triggered the event (not the dispatcher)
     */
    constructor(type: string, source: Element | null | undefined) {
        super(`material:${type}`);
        this.source = source;
    }
}

/**
 * An event type for any element that changes value.
 */
export class MaterialChangeEvent<T> extends MaterialEvent {
    oldValue?: T;
    newValue?: T;

    /**
     * Creates a new MaterialChangeEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param oldValue value before change
     * @param newValue value after change
     */
    constructor(
        source: Element | null | undefined,
        oldValue?: T,
        newValue?: T
    ) {
        super("change", source);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}

/**
 * An event type for any element that has changed toggle state.
 */
export class MaterialToggleEvent extends MaterialEvent {
    state: MaterialState;

    /**
     * Creates a new MaterialToggleEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param state toggle state of type {@link MaterialState}
     */
    constructor(source: Element | null | undefined, state: MaterialState) {
        super("toggle", source);
        this.state = state;
    }
}
