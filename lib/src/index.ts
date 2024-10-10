type ListInPlainEnglishOptions = {
    max?: number;
    conjunction?: string;
};

export function listInPlainEnglish(
    list: string[],
    {max, conjunction = "and"}: ListInPlainEnglishOptions={}
): string {
    if (max === undefined) max = list.length;

    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} ${conjunction} ${list[1]}`;

    list = list.map((v, i) => {
        if (i === list.length - 1) return v;
        
        if (v.endsWith(`"`)) {
            return v.slice(0, -1) + `," `;
        } else if (v.endsWith(`'`)) {
            return v.slice(0, -1) + `,' `;
        } else {
            return v + ', ';
        }
    })

    if (list.length > max) {
        return `${list.slice(0, max).join('')}${conjunction} ${list.length - max} more`;
    } else {
        return `${list.slice(0, -1).join('')}${conjunction} ${list[list.length - 1]}`;
    }
}

export function isNullOrUndefined(v: any): boolean {
    return v === null || v === undefined;
}

// This class allows defining a class that can be called like a function.
export class Callable<Type = void, Args extends any[] = any[]> extends Function {
    __self__: Callable<Type, Args>;

    constructor() {
        super('...args', 'return this.__self__.__call__(...args)');
        let self = this.bind(this);
        this.__self__ = self;
        return self;
    }

    // This should be overridden by the subclass
    __call__(..._: Args): Type { return; }
}

export * from './extensions';