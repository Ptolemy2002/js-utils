export function ext_hasNestedProperty(prop="") {
    if (typeof prop === "string") prop = prop.split(".");
    if (!Array.isArray(prop)) return this.hasOwnProperty(prop);

    let obj = this;
    for (let i = 0; i < prop.length; i++) {
        const p = prop[i];
        if (!obj?.hasOwnProperty(p)) return false;
        obj = obj[p];
    }

    return true;
}

export function loadExtension(name, func, base=Object) {
    if (base.prototype.hasOwnProperty(name)) return;

    // eslint-disable-next-line no-extend-native
    Object.defineProperty(base.prototype, name, {
        value: func,
        enumerable: false,
        writable: true,
        configurable: true
    });
}

export function unloadExtension(name, base=Object) {
    // eslint-disable-next-line no-extend-native
    delete base.prototype[name];
}