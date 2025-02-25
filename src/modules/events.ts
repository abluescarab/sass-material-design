/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/

/**
 * The state of any toggleable element.
 */
export enum MaterialState {
    Expanded,
    Collapsed,
    Enabled,
    Disabled,
    Checked,
    Unchecked,
    Selected,
    Unselected,
}

/**
 * A base for all custom Material events.
 */
export class MaterialEvent extends Event {
    element: Element | null | undefined;

    constructor(type: string, element: Element | null | undefined) {
        super(`material:${type}`);
        this.element = element;
    }
}

/**
 * An event type for any element that changes value.
 */
export class MaterialChangeEvent<T> extends MaterialEvent {
    oldValue?: T;
    newValue?: T;

    constructor(
        element: Element | null | undefined,
        oldValue?: T,
        newValue?: T
    ) {
        super("change", element);
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}

/**
 * An event type for any element that has changed toggle state.
 */
export class MaterialToggleEvent extends MaterialEvent {
    state: MaterialState;

    constructor(element: Element | null | undefined, state: MaterialState) {
        super("toggle", element);
        this.state = state;
    }
}
