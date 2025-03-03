/*******************************************************************************
 * @file            components/checkbox.ts
 * @description     Implementation file for checkbox components.
 ******************************************************************************/
interface CheckboxOptions {
    text?: string;
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
}
export declare function create(options?: CheckboxOptions): HTMLElement;
export {};
