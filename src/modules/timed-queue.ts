/**
 * @file Implements a queue which runs a callback function after a given delay.
 */

/**
 * An item in a timed queue.
 * @template T
 */
export type TimedQueueItem<T> = {
    callback: (item: TimedQueueItem<T>) => void;
    data: T;
    delay: number;
};

/**
 * A timed queue which runs a callback function after a given delay.
 * @template T
 */
export class TimedQueue<T> {
    #queue: { item: TimedQueueItem<T>; timeout: number }[] = [];

    /**
     * Gets the length of the queue.
     * @returns number of items left in the queue
     */
    length = () => this.#queue.length;

    /**
     * Pushes an item or items onto the back of the queue.
     * @param items - items to push
     */
    push(...items: TimedQueueItem<T>[]): void {
        for (const item of items) {
            this.#queue.push({
                item: item,
                timeout: setTimeout(() => {
                    item.callback(item);
                    this.remove(item);
                }, item.delay ?? 0),
            });
        }
    }

    /**
     * Pops an item from the front or back of the queue.
     * @param front - whether to pop from the front of the queue
     * @returns popped item
     */
    pop(front: boolean = false): TimedQueueItem<T> | undefined {
        const shiftOrPop = front ? this.#queue.shift : this.#queue.pop;
        const item = shiftOrPop();

        clearTimeout(item?.timeout);
        return item?.item;
    }

    /**
     * Clears all items from the queue.
     * @param clearCallback - function run on each cleared item
     * @returns number of cleared items
     */
    clear(clearCallback?: (item: TimedQueueItem<T>) => void): number {
        const cleared = this.#queue.length;

        for (const item of this.#queue) {
            clearTimeout(item.timeout);

            if (clearCallback) {
                clearCallback(item.item);
            }
        }

        this.#queue.splice(0, this.#queue.length);
        return cleared;
    }

    /**
     * Removes an item from the queue.
     * @param item - item to remove
     */
    remove(item: TimedQueueItem<T>): void {
        const index = this.#queue.findIndex((q) => q.item == item);

        if (index > -1) {
            clearTimeout(this.#queue[index].timeout);
            this.#queue.splice(index, 1);
        }
    }
}
