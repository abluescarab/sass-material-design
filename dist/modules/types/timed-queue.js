/**
 * @file            modules/timed-queue.ts
 * @description     Implements a queue which runs a callback function after a
 *                  given delay.
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimedQueue_queue;
/**
 * A timed queue which runs a callback function after a given delay.
 * @template T
 */
class TimedQueue {
    constructor() {
        _TimedQueue_queue.set(this, []);
        /**
         * Gets the length of the queue.
         * @returns number of items left in the queue
         */
        this.length = () => __classPrivateFieldGet(this, _TimedQueue_queue, "f").length;
    }
    /**
     * Pushes an item or items onto the back of the queue.
     * @param items - items to push
     */
    push(...items) {
        for (const item of items) {
            __classPrivateFieldGet(this, _TimedQueue_queue, "f").push({
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
    pop(front = false) {
        const shiftOrPop = front ? __classPrivateFieldGet(this, _TimedQueue_queue, "f").shift : __classPrivateFieldGet(this, _TimedQueue_queue, "f").pop;
        const item = shiftOrPop();
        clearTimeout(item?.timeout);
        return item?.item;
    }
    /**
     * Clears all items from the queue.
     * @param clearCallback - function run on each cleared item
     * @returns number of cleared items
     */
    clear(clearCallback) {
        const cleared = __classPrivateFieldGet(this, _TimedQueue_queue, "f").length;
        for (const item of __classPrivateFieldGet(this, _TimedQueue_queue, "f")) {
            clearTimeout(item.timeout);
            if (clearCallback) {
                clearCallback(item.item);
            }
        }
        __classPrivateFieldGet(this, _TimedQueue_queue, "f").splice(0, __classPrivateFieldGet(this, _TimedQueue_queue, "f").length);
        return cleared;
    }
    /**
     * Removes an item from the queue.
     * @param item - item to remove
     */
    remove(item) {
        const index = __classPrivateFieldGet(this, _TimedQueue_queue, "f").findIndex((q) => q.item == item);
        if (index > -1) {
            clearTimeout(__classPrivateFieldGet(this, _TimedQueue_queue, "f")[index].timeout);
            __classPrivateFieldGet(this, _TimedQueue_queue, "f").splice(index, 1);
        }
    }
}
_TimedQueue_queue = new WeakMap();
export default TimedQueue;
