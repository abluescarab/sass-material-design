/*******************************************************************************
 * @file            modules/events.ts
 * @description     Helper file with custom event types.
 ******************************************************************************/
import { Nullable } from "./types.js";
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
    /**
     * Element which triggered the event (not the dispatcher).
     */
    readonly source: Nullable<Element>;
    /**
     * Creates a new MaterialEvent.
     * @param type event name
     * @param source element which triggered the event (not the dispatcher)
     */
    constructor(type: string, source: Nullable<Element>);
}
/**
 * An event type for any element that changes value.
 */
export declare class MaterialChangeEvent<T> extends MaterialEvent {
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
    constructor(source: Nullable<Element>, oldValue?: T, newValue?: T);
}
/**
 * An event type for any element that has changed toggle state.
 */
export declare class MaterialToggleEvent extends MaterialEvent {
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
    constructor(source: Nullable<Element>, state: MaterialState, elements: Element[]);
}
