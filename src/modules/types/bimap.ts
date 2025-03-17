/**
 * @file            types/bimap.ts
 * @description     Implements a bidirectional map where each key has one value
 *                  and each value has one key.
 */

/**
 * A data structure with a one-to-one mapping between a key and value.
 * @template K - key type
 * @template V - value type
 */
export default class BiMap<K, V> {
    private keyValues: Map<K, V>;
    private valueKeys: Map<V, K>;

    /**
     * Creates a new {@link BiMap}.
     * @param entries - entries to add to the map
     */
    constructor(entries?: readonly (readonly [K, V])[] | null) {
        this.keyValues = new Map<K, V>();
        this.valueKeys = new Map<V, K>();

        if (entries) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }

    /**
     * Clears all map entries.
     */
    clear(): void {
        this.keyValues.clear();
        this.valueKeys.clear();
    }

    /**
     * Deletes an entry from the map.
     * @param entry - key or value to delete
     * @returns whether the entry was deleted
     */
    delete(entry: K | V): boolean {
        if (this.keyValues.has(entry as K)) {
            this.valueKeys.delete(this.keyValues.get(entry as K) as V);
            this.keyValues.delete(entry as K);
        } else if (this.valueKeys.has(entry as V)) {
            this.keyValues.delete(this.valueKeys.get(entry as V) as K);
            this.valueKeys.delete(entry as V);
        } else {
            return false;
        }

        return true;
    }

    /**
     * Gets the keys and values in the map, where the key is always of type
     * {@link K} and the value is always of type {@link V}.
     * @returns key, value iterable
     */
    entries(): MapIterator<[K, V]> {
        return this.keyValues.entries();
    }

    /**
     * Gets the key or value associated with an entry in the map.
     * @param entry - key or value to get
     * @returns associated key or value or undefined if not found
     */
    get(entry: K | V): K | V | undefined {
        return this.keyValues.get(entry as K) ?? this.valueKeys.get(entry as V);
    }

    /**
     * Checks whether a key or value exists in the map.
     * @param entry - key or value to check for
     * @returns whether the entry exists in the map
     */
    has(entry: K | V): boolean {
        return this.keyValues.has(entry as K) || this.valueKeys.has(entry as V);
    }

    /**
     * Sets an entry in the map. If the key and value pair is already in the
     * map, it will be overwritten.
     * @param key - key to associate with a value
     * @param value - value to associate with given key
     */
    set(key: K, value: V): void {
        this.keyValues.set(key, value);
        this.valueKeys.set(value, key);
    }

    /**
     * Gets the size of the map.
     * @returns size of the primary map (key to value mapping)
     */
    size(): number {
        return this.keyValues.size;
    }
}
