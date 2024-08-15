export function hasNestedProperty(self, prop="", hasPropCallback=(o, p) => o.hasOwnProperty(p)) {
    if (typeof prop === "string") prop = prop.split(".");
    if (!Array.isArray(prop)) return hasPropCallback(self, prop);

    let obj = self;
    for (let i = 0; i < prop.length; i++) {
        const p = prop[i];
        if (!obj) return false;
        if (!hasPropCallback(obj, p)) return false;

        obj = obj[p];
    }

    return true;
}

export function ext_hasOwnNestedProperty(prop="") {
    return hasNestedProperty(this, prop);
}

export function getAllProperties(self) {
    let allProps = [], curr = self;

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

export function ext_getAllProperties() {
    return getAllProperties(this);
}

export function hasProperty(self, prop) {
    return getAllProperties(self).includes(prop);
}

export function ext_hasProperty(prop) {
    return hasProperty(this, prop);
}

export function ext_hasNestedProperty(prop) {
    return hasNestedProperty(this, prop, (o, p) => hasProperty(o, p));
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