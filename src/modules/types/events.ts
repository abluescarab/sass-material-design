/*******************************************************************************
 * @file            modules/events.ts
 * @description     Helper file with custom event types.
 ******************************************************************************/

import { Nullable } from "./index.js";

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
    /**
     * Element which triggered the event (not the dispatcher).
     */
    readonly source: Nullable<Element>;

    /**
     * Creates a new MaterialEvent.
     * @param type event name
     * @param source element which triggered the event (not the dispatcher)
     */
    constructor(type: string, source: Nullable<Element>) {
        super(`material:${type}`);
        this.source = source;
    }
}

/**
 * An event type for any element that changes value.
 */
export class MaterialChangeEvent<T> extends MaterialEvent {
    /**
     * Value before change.
     */
    readonly oldValue?: T;
    /**
     * Value after change.
     */
    readonly newValue?: T;

    /**
     * Creates a new MaterialChangeEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param oldValue value before change
     * @param newValue value after change
     */
    constructor(source: Nullable<Element>, oldValue?: T, newValue?: T) {
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
     * Toggle state of type {@link MaterialState}.
     */
    readonly state: MaterialState;
    /**
     * Other affected elements, usually children of the toggled element.
     */
    readonly elements: Element[];

    /**
     * Creates a new MaterialToggleEvent.
     * @param source element which triggered the event (not the dispatcher)
     * @param state toggle state of type {@link MaterialState}
     * @param elements other toggled elements
     */
    constructor(
        source: Nullable<Element>,
        state: MaterialState,
        elements: Element[]
    ) {
        super("toggle", source);
        this.state = state;
        this.elements = elements;
    }
}
