export function ext_hasOwnNestedProperty(prop="") {
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

export function ext_getAllProperties() {
    let allProps = [], curr = this;

    do{
        let props = Object.getOwnPropertyNames(curr);
        props.forEach(function(prop){
            if (allProps.indexOf(prop) === -1) {
                allProps.push(prop)
            }
        });
    } while(curr = Object.getPrototypeOf(curr));

    return allProps;
}

export function ext_hasProperty_factory(allPropertiesName) {
    return function(prop) {
        return this[allPropertiesName]().includes(prop);
    }
}

export function ext_hasNestedProperty_factory(hasPropertyName) {
    return function(prop) {
        if (typeof prop === "string") prop = prop.split(".");
        if (!Array.isArray(prop)) return this[hasPropertyName](prop);

        let obj = this;
        for (let i = 0; i < prop.length; i++) {
            const p = prop[i];
            if (!obj) continue;
            if (!obj[hasPropertyName](p)) return false;
            obj = obj[p];
        }

        return true;
    }
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