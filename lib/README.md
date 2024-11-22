# JS Utils
This library contains miscellaneous utilities for JavaScript development.

The functions are not exported as default, so you can import them in one of the following ways:
```javascript
// ES6
import { functionName } from '@ptolemy2002/js-utils';
// CommonJS
const { functionName } = require('@ptolemy2002/js-utils');
```

## Type Reference
```typescript
type ListInPlainEnglishOptions = {
    max?: number;
    conjunction?: string;
};
type Prop = string | PropertyKey[];
type HasPropCallback = (o: Object, p: PropertyKey) => boolean;
type ExtensionFunction = <T>(this: T, ...args: any[]) => any;
type ObjectWithPrototype = Object & {prototype: Object};
```

## Functions
The following functions are available in the library:

### listInPlainEnglish
#### Description
Converts a list of items to plain English, separating them by commas if there are more than two items, and using the conjunction specified in the arguments to separate the last two items. If any of the items end with a quotation mark (double or single), the comma will be placed before the quotation mark.

#### Parameters
- `list` (`string[]`): The list to be converted to plain English.
- `args` (`ListInPlainEnglishOptions`): Used to specifiy optional arguments
    - `conjunction` (`string`): The conjunction to be used in the list. Default is 'and'.
    - `max` (`number`): The maximum number of items to be displayed in the list. If the list is longer than this number, the rest of the items will be replaced with a new item "and x more" with x being the number of items that were removed. `undefined` means no limit. Default is `undefined`.

#### Returns
`string` - The list in plain English. 

### isNullOrUndefined
#### Description
Checks if a value is `null` or `undefined`.

#### Parameters
- `value` (`any`): The value to be checked.

#### Returns
`boolean` - `true` if the value is `null` or `undefined`, `false` otherwise.

### loadExtension
#### Description
This function allows you to add a function to the prototype of any object, making it as if the function was part of the standard library. The property will not be added if it already exists, and it will not be iterated over in for loops, `Object.keys()`, or similar.

#### Parameters
- `name` (`string`): The name of the function to be added to the prototype. This is the name that will be used to access the function.
- `func` (`ExtensionFunction`): The function to be added to the prototype.
- `base` (`ObjectWithPrototype`): The object type to which the function will be added.

#### Returns
None

### unloadExtension
#### Description
This function allows you to remove a function from the prototype of any object, making it as if the function was never part of the standard library.

#### Parameters
- `name` (`string`): The name of the function to be removed from the prototype.
- `base` (`ObjectWithPrototype`): The object type from which the function will be removed.

#### Returns
None

### hasNestedProperty
#### Description
Checks if an object has a property, then that property's value has the next property in the chain, and so on.

#### Parameters
- `self` (`Object`): The object to be checked.
- `prop` (`Prop`): The property chain to be checked. If this is a string, it will be assumed that every key has string type. The string will be split by dots to create an array. Arrays are left as they are. If this value has any other type, the function acts exactly as the `hasPropCallback` function.
- `hasPropCallback` (`HasPropCallback`): A function that checks if a property exists in an object. This is mostly used by the extension functions internally, and the default value is `(o, p) => o.hasOwnProperty(p)`.

#### Returns
`boolean` - `true` if the property chain exists, `false` otherwise.

### ext_hasOwnNestedProperty
#### Description
Use this to implement `hasNestedProperty` as part of a prototype. Note that this function uses `hasOwnProperty`, so doesn't work with inherited properties. Since this is an extension function, it assumes `this` is the object to be checked. It is heavily recommended to register this function with the `loadExtension` function.

### Parameters
- `prop` (`Prop`): The property chain to be checked.

### Returns
`boolean` - `true` if the property chain exists, `false` otherwise.

### getAllPropertyNames
#### Description
Returns all property names of an object, including inherited properties. This is accomplished by following the prototype chain.

#### Parameters
- `self` (`Object`): The object to be checked.

#### Returns
`string[]` - An array of all property names of the object.

### ext_getAllProperties
#### Description
Use this to implement `getAllProperties` as part of a prototype. Since this is an extension function, it assumes `this` is the object to be checked. It is heavily recommended to register this function with the `loadExtension` function.

### Parameters
None

### Returns
`string[]` - An array of all property names of the object.

### hasProperty
#### Description
Checks if an object has a property, including inherited properties.

#### Parameters
- `self` (`Object`): The object to be checked.
- `prop` (`PropertyKey`): The property to be checked.

#### Returns
`boolean` - `true` if the property exists, `false` otherwise. This is a custom Typescript assertion, so it will recognize the property as existing in the object after the function call.

### ext_hasProperty
#### Description
Use this to implement `hasProperty` as part of a prototype. Since this is an extension function, it assumes `this` is the object to be checked. It is heavily recommended to register this function with the `loadExtension` function.

### Parameters
- `prop` (`PropertyKey`): The property to be checked.

### Returns
`boolean` - `true` if the property exists, `false` otherwise.

### ext_hasNestedProperty
#### Description
Use this to implement `hasNestedProperty` as part of a prototype. The difference between this and `ext_hasOwnNestedProperty` is that this function uses `hasProperty` instead of `hasOwnProperty`, supporting the detection of inherited properties. Since this is an extension function, it assumes `this` is the object to be checked. It is heavily recommended to register this function with the `loadExtension` function.

### Parameters
- `prop` (`Prop`): The property chain to be checked.

### Returns
`boolean` - `true` if the property chain exists, `false` otherwise.

## Classes
The following classes are available in the library:

### Callable<Type = void, Args extends any[] = any[]>
#### Description
Inheriting from this class allows you to create instances that can be called as functions. When called, the `__call__` method is executed.

#### Methods
- `__call__(...args: Args): Type` - The method that is executed when the instance is called as a function.

## Peer Dependencies
This project does not have any peer dependencies, so it should work out of the box.

## Commands
The following commands exist in the project:

- `npm run uninstall` - Uninstalls all dependencies for the library
- `npm run reinstall` - Uninstalls and then Reinstalls all dependencies for the library
- `npm run example-uninstall` - Uninstalls all dependencies for the example app
- `npm run example-install` - Installs all dependencies for the example app
- `npm run example-reinstall` - Uninstalls and then Reinstalls all dependencies for the example app
- `npm run example-start` - Starts the example app after building the library
- `npm run build` - Builds the library
- `npm run release` - Publishes the library to npm without changing the version
- `npm run release-patch` - Publishes the library to npm with a patch version bump
- `npm run release-minor` - Publishes the library to npm with a minor version bump
- `npm run release-major` - Publishes the library to npm with a major version bump