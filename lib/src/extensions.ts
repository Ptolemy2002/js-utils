export type Prop = string | PropertyKey[];
export type HasPropCallback = (o: Object, p: PropertyKey) => boolean;

export function hasNestedProperty(
    self: Object,
    prop: Prop = "",
    hasPropCallback: HasPropCallback = (o, p) => o.hasOwnProperty(p)
): boolean {
    if (typeof prop === "string") prop = prop.split(".");
    if (!Array.isArray(prop)) return hasPropCallback(self, prop);

    let obj = self;
    for (let i = 0; i < prop.length; i++) {
        const p: PropertyKey = prop[i];
        if (!obj) return false;
        if (!hasPropCallback(obj, p)) return false;
        obj = obj[p];
    }

    return true;
}

export function ext_hasOwnNestedProperty(this: Object, prop: Prop = ""): boolean {
    return hasNestedProperty(this, prop);
}

export function getAllPropertyNames(self: Object): string[] {
    let allProps: string[] = [], curr = self;

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

export function ext_getAllPropertyNames(this: any): string[] {
    return getAllPropertyNames(this);
}

export function hasProperty(self: Object, prop: PropertyKey): boolean {
    let curr = self;

    do{
        if (curr.hasOwnProperty(prop)) return true;
    } while(curr = Object.getPrototypeOf(curr));

    return false;
}

export function ext_hasProperty(this: Object, prop: PropertyKey): boolean {
    return hasProperty(this, prop);
}

export function ext_hasNestedProperty(this: Object, prop: Prop): boolean {
    return hasNestedProperty(this, prop, (o, p) => hasProperty(o, p));
}

export type ExtensionFunction = (this: Object, ...args: any[]) => any;
export type ObjectWithPrototype = Object & {prototype: Object};
export function loadExtension(
    name: string,
    func: ExtensionFunction,
    base: ObjectWithPrototype = Object
): void {
    if (hasProperty(base.prototype, name)) return;

    // eslint-disable-next-line no-extend-native
    Object.defineProperty(base.prototype, name, {
        value: func,
        enumerable: false,
        writable: true,
        configurable: true
    });
}

export function unloadExtension(name: string, base: ObjectWithPrototype = Object): void {
    // eslint-disable-next-line no-extend-native
    delete base.prototype[name];
}