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
export default class BiMap {
    /**
     * Creates a new {@link BiMap}.
     * @param entries - entries to add to the map
     */
    constructor(entries) {
        this.keyValues = new Map();
        this.valueKeys = new Map();
        if (entries) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    /**
     * Clears all map entries.
     */
    clear() {
        this.keyValues.clear();
        this.valueKeys.clear();
    }
    /**
     * Deletes an entry from the map.
     * @param entry - key or value to delete
     * @returns whether the entry was deleted
     */
    delete(entry) {
        if (this.keyValues.has(entry)) {
            this.valueKeys.delete(this.keyValues.get(entry));
            this.keyValues.delete(entry);
        }
        else if (this.valueKeys.has(entry)) {
            this.keyValues.delete(this.valueKeys.get(entry));
            this.valueKeys.delete(entry);
        }
        else {
            return false;
        }
        return true;
    }
    /**
     * Gets the keys and values in the map, where the key is always of type
     * {@link K} and the value is always of type {@link V}.
     * @returns key, value iterable
     */
    entries() {
        return this.keyValues.entries();
    }
    /**
     * Gets the key or value associated with an entry in the map.
     * @param entry - key or value to get
     * @returns associated key or value or undefined if not found
     */
    get(entry) {
        return this.keyValues.get(entry) ?? this.valueKeys.get(entry);
    }
    /**
     * Checks whether a key or value exists in the map.
     * @param entry - key or value to check for
     * @returns whether the entry exists in the map
     */
    has(entry) {
        return this.keyValues.has(entry) || this.valueKeys.has(entry);
    }
    /**
     * Sets an entry in the map. If the key and value pair is already in the
     * map, it will be overwritten.
     * @param key - key to associate with a value
     * @param value - value to associate with given key
     */
    set(key, value) {
        this.keyValues.set(key, value);
        this.valueKeys.set(value, key);
    }
    /**
     * Gets the size of the map.
     * @returns size of the primary map (key to value mapping)
     */
    size() {
        return this.keyValues.size;
    }
}
