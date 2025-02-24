/*******************************************************************************
 * @file           modules/events.ts
 * @description    Helper file with custom event types.
 *******************************************************************************/

/**
 * The state of any toggleable element.
 */
export enum ToggleState {
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
 * An empty base for all custom Material events.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MaterialEventBase {}

/**
 * An event type for any element that changes value.
 */
export interface MaterialChangeEvent extends MaterialEventBase {
    oldValue?: unknown;
    newValue?: unknown;
}

/**
 * An event type for any element that has changed toggle state.
 */
export interface MaterialToggleEvent extends MaterialEventBase {
    element: Element;
    state: ToggleState;
}

/**
 * Triggers an event on the given element.
 * @param target element that dispatches the event
 * @param name name of the event
 * @param args arguments of any type derived from {@link MaterialEventBase}
 */
export function triggerEvent<T extends MaterialEventBase>(
    target: Element | EventTarget,
    name: string,
    args: T
) {
    target.dispatchEvent(new CustomEvent(name, { detail: args }));
}
