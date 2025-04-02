/**
 * @file
 */

export class History<T> {
    #last: T[];
    #current: T | undefined;

    constructor(value?: T) {
        this.#last = [];
        this.#current = value;
    }

    clear() {
        // check ts-test-web for best way to clear array
        this.#current = undefined;
    }

    is(value: T) {
        return this.#current == value;
    }

    set(value: T | undefined) {
        if (this.#current) {
            this.#last.push(this.#current);
        }

        this.#current = value;
    }

    was(value: T) {
        return this.#last.includes(value);
    }

    wasLast(value: T) {
        return this.#last.slice(-1) == value;
    }
}
