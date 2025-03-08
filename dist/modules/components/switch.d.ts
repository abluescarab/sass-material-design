/**
 * @file            components/switch.ts
 * @description     Implementation file for switch components.
 */
/**
 * Stores options for new switches, usually created with the {@link create()}
 * function.
 */
export interface SwitchOptions {
    /**
     * Whether the component should be toggled on.
     */
    checked?: boolean;
    /**
     * Whether the component should be disabled.
     */
    disabled?: boolean;
    /**
     * The ID and name to assign to the component.
     */
    id?: string;
    /**
     * Whether to return only the label or include the wrapper.
     */
    onlyLabel?: boolean;
    /**
     * The text inside the label.
     */
    text?: string;
}
/**
 * Creates a new switch.
 * @param options - options map
 * @returns new switch
 */
export declare function create(options?: SwitchOptions): HTMLElement;
/**
 * Initializes a switch.
 * @param switchElement - switch to initialize
 */
export declare function initialize(switchElement: Element): void;
