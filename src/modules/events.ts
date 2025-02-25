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
    source: Element | null | undefined;

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

    constructor(source: Element | null | undefined, state: MaterialState) {
        super("toggle", source);
        this.state = state;
    }
}
