/**
 * @file
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _History_last, _History_current;
export class History {
    constructor(value) {
        _History_last.set(this, void 0);
        _History_current.set(this, void 0);
        __classPrivateFieldSet(this, _History_last, [], "f");
        __classPrivateFieldSet(this, _History_current, value, "f");
    }
    clear() {
        // check ts-test-web for best way to clear array
        __classPrivateFieldSet(this, _History_current, undefined, "f");
    }
    is(value) {
        return __classPrivateFieldGet(this, _History_current, "f") == value;
    }
    set(value) {
        if (__classPrivateFieldGet(this, _History_current, "f")) {
            __classPrivateFieldGet(this, _History_last, "f").push(__classPrivateFieldGet(this, _History_current, "f"));
        }
        __classPrivateFieldSet(this, _History_current, value, "f");
    }
    was(value) {
        return __classPrivateFieldGet(this, _History_last, "f").includes(value);
    }
    wasLast(value) {
        return __classPrivateFieldGet(this, _History_last, "f").slice(-1) == value;
    }
}
_History_last = new WeakMap(), _History_current = new WeakMap();
//# sourceMappingURL=history.js.map