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
    private keyValues;
    private valueKeys;
    /**
     * Creates a new {@link BiMap}.
     * @param entries - entries to add to the map
     */
    constructor(entries?: readonly (readonly [K, V])[] | null);
    /**
     * Clears all map entries.
     */
    clear(): void;
    /**
     * Deletes an entry from the map.
     * @param entry - key or value to delete
     * @returns whether the entry was deleted
     */
    delete(entry: K | V): boolean;
    /**
     * Gets the keys and values in the map, where the key is always of type
     * {@link K} and the value is always of type {@link V}.
     * @returns key, value iterable
     */
    entries(): MapIterator<[K, V]>;
    /**
     * Gets the key or value associated with an entry in the map.
     * @param entry - key or value to get
     * @returns associated key or value or undefined if not found
     */
    get(entry: K | V): K | V | undefined;
    /**
     * Checks whether a key or value exists in the map.
     * @param entry - key or value to check for
     * @returns whether the entry exists in the map
     */
    has(entry: K | V): boolean;
    /**
     * Sets an entry in the map. If the key and value pair is already in the
     * map, it will be overwritten.
     * @param key - key to associate with a value
     * @param value - value to associate with given key
     */
    set(key: K, value: V): void;
    /**
     * Gets the size of the map.
     * @returns size of the primary map (key to value mapping)
     */
    size(): number;
}
