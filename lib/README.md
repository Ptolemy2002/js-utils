# React Library CRA Template
This library contains miscellaneous utilities for JavaScript development.

The functions are not exported as default, so you can import them in one of the following ways:
```
// ES6
import { functionName } from '@ptolemy2002/js-utils';
// CommonJS
const { functionName } = require('@ptolemy2002/js-utils');
```

## Functions
The following functions are available in the library:

### listInPlainEnglish
#### Description
Converts a list of items to plain English, separating them by commas if there are more than two items, and using the conjunction specified in the arguments to separate the last two items. If any of the items end with a quotation mark (double or single), the comma will be placed before the quotation mark.

#### Parameters
- `list` (Array): The list to be converted to plain English.
- `args` (Object): Used to specifiy optional arguments
    - `conjunction` (String): The conjunction to be used in the list. Default is 'and'.
    - `max` (Number): The maximum number of items to be displayed in the list. If the list is longer than this number, the rest of the items will be replaced with a new item "and x more" with x being the number of items that were removed. `undefined` means no limit. Default is `undefined`.

#### Returns
`String` - The list in plain English. 

### isNullOrUndefined
#### Description
Checks if a value is `null` or `undefined`.

#### Parameters
- `value` (Any): The value to be checked.

#### Returns
`Boolean` - `true` if the value is `null` or `undefined`, `false` otherwise.

## Meta
This is a React Library Created by Ptolemy2002's [cra-template-react-library](https://www.npmjs.com/package/@ptolemy2002/cra-template-react-library) template in combination with [create-react-app](https://www.npmjs.com/package/create-react-app). It contains methods of building and publishing your library to npm.
For now, the library makes use of React 18 and does not use TypeScript.

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