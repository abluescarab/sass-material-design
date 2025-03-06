/**
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 */
import { SwitchOptions } from "./switch.js";
/**
 * Stores options for new checkboxes, usually created with the {@link create()}
 * function.
 */
export interface CheckboxOptions extends SwitchOptions {
    /**
     * Whether the component should be in an indeterminate state.
     */
    indeterminate?: boolean;
}
/**
 * Creates a new checkbox.
 * @param options - options map
 * @returns new checkbox
 */
export declare function create(options?: CheckboxOptions): HTMLElement;
/**
 * Initializes a checkbox.
 * @param checkbox - checkbox to initialize
 */
export declare function initialize(checkbox: Element): void;
