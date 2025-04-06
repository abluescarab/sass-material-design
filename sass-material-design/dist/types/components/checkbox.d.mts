/**
 * @file Implementation file for checkbox components.
 */
/**
 * Represents the options given to a styled checkbox in the
 * {@link createStyled()} function.
 */
export interface MaterialStyledCheckboxOptions {
    /**
     * Whether the checkbox should be toggled on.
     */
    checked?: boolean;
    /**
     * Whether the checkbox should be disabled.
     */
    disabled?: boolean;
    /**
     * The ID and name to assign to the checkbox.
     */
    id?: string;
    /**
     * Whether the checkbox should be in an indeterminate state.
     */
    indeterminate?: boolean;
    /**
     * A label element to overwrite with the contents of the checkbox.
     */
    labelElement?: HTMLElement;
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
 * Creates a checkbox that shows the given display element. Unless creating a
 * new component, use the `create()` functions for either the
 * {@link create() checkbox} or [switch](./switch.ts).
 * @param className - wrapper class name
 * @param displayElement - element to display instead of the default checkbox
 * @param options - options map
 * @returns label or wrapper element depending on value of {@link MaterialStyledCheckboxOptions.onlyLabel}
 */
export declare function createStyled(className: string, displayElement: HTMLElement, options?: MaterialStyledCheckboxOptions): HTMLElement;
/**
 * Creates a new checkbox.
 * @param options - options map
 * @returns new checkbox
 */
export declare function create(options?: MaterialStyledCheckboxOptions): HTMLElement;
/**
 * Initializes a checkbox.
 * @param checkbox - checkbox to initialize
 */
export declare function initialize(checkbox: HTMLElement): void;
//# sourceMappingURL=checkbox.d.mts.map