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
export declare class TimedQueue<T> {
    #private;
    /**
     * Gets the length of the queue.
     * @returns number of items left in the queue
     */
    length: () => number;
    /**
     * Pushes an item or items onto the back of the queue.
     * @param items - items to push
     */
    push(...items: TimedQueueItem<T>[]): void;
    /**
     * Pops an item from the front or back of the queue.
     * @param front - whether to pop from the front of the queue
     * @returns popped item
     */
    pop(front?: boolean): TimedQueueItem<T> | undefined;
    /**
     * Clears all items from the queue.
     * @param clearCallback - function run on each cleared item
     * @returns number of cleared items
     */
    clear(clearCallback?: (item: TimedQueueItem<T>) => void): number;
    /**
     * Removes an item from the queue.
     * @param item - item to remove
     */
    remove(item: TimedQueueItem<T>): void;
}
//# sourceMappingURL=timed-queue.d.ts.map