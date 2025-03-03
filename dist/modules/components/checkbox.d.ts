/*******************************************************************************
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 ******************************************************************************/
/**
 * Stores checkbox options for new checkboxes, usually created with the
 * {@link create()} function.
 */
interface CheckboxOptions {
    text?: string;
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
}
/**
 * Creates a new checkbox.
 * @param options options map
 * @returns new checkbox
 */
export declare function create(options?: CheckboxOptions): HTMLElement;
export {};
