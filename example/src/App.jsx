import { useState } from "react";
import isCallable from "is-callable";
import {
    listInPlainEnglish, isNullOrUndefined, Callable, ext_hasOwnNestedProperty, ext_getAllProperties, ext_hasProperty_factory,
    ext_hasNestedProperty_factory, loadExtension
} from "@ptolemy2002/js-utils";

loadExtension("hasOwnNestedProperty", ext_hasOwnNestedProperty, Object);
loadExtension("getAllProperties", ext_getAllProperties, Object);
loadExtension("hasProperty", ext_hasProperty_factory("getAllProperties"), Object);
loadExtension("hasNestedProperty", ext_hasNestedProperty_factory("hasProperty"), Object);

class Func extends Callable {
    offset = 0;

    constructor(offset = 0) {
        super();
        this.offset = offset;
    }

    __call__(a, b) {
        return this.offset + a + b;
    }
}

function App() {
    const [listText, setListText] = useState('');
    const [max, setMax] = useState(undefined);
    const [conjunction, setConjunction] = useState('and');
    const [func, setFunc] = useState(null);
    const [object, setObject] = useState({});
    const [error, setError] = useState(null);
    const [prop, setProp] = useState('');

    const list = listText.split(',').map(v => v.trim()).filter(v => v.length > 0);

    function handleListTextChange(e) {
        setListText(e.target.value);
    }

    function handleMaxChange(e) {
        if (e.target.value === "") return setMax(undefined);
        if (isNaN(e.target.value)) return;
        setMax(parseInt(e.target.value));
    }

    function handleConjunctionChange(e) {
        setConjunction(e.target.value);
    }

    function handleObjectChange(e) {
        try {
            setObject(JSON.parse(e.target.value));
            setError(null);
        } catch (e) {
            setError("Invalid JSON");
        }
    }

    const funcTest = func ? func(1, 2) : null;
    return (
      <div className="App p-3">
            <div className="d-flex flex-row gap-2 mb-1">
                <label>Enter a comma-separated list of items:</label>
                <input className="flex-grow-1" type="text" value={listText} onChange={handleListTextChange} />
            </div>

            <div className="d-flex flex-row gap-2 mb-1">
                <label>Max items to show (leave blank to show all):</label>
                <input type="text" value={max} onChange={handleMaxChange} />
            </div>

            <div className="d-flex flex-row gap-2 mb-2">
                <label>Conjunction:</label>
                <input type="text" value={conjunction} onChange={handleConjunctionChange} />
            </div>

            <p>
                Total Number of items: {list.length} <br />
                In Plain English: {listInPlainEnglish(list, {max, conjunction})}
            </p>

            <p>
                isNullOrUndefined(null): {isNullOrUndefined(null).toString()} <br />
                isNullOrUndefined(undefined): {isNullOrUndefined(undefined).toString()} <br />
                isNullOrUndefined(0): {isNullOrUndefined(0).toString()} <br />
                isNullOrUndefined(''): {isNullOrUndefined('').toString()} <br />
                isNullOrUndefined([]): {isNullOrUndefined([]).toString()} <br />
                isNullOrUndefined({"{}"}): {isNullOrUndefined({}).toString()}
            </p>

            <h2>Callable Test</h2>
            {
                func && <p>
                    isCallable pass: {isCallable(func) ? "Yes" : "No"} <br />
                    Result Test: {(funcTest === 4) ? "Pass" : "Fail. Expected 4, got " + funcTest}
                </p>
            }
            <button className="mb-1" onClick={
                // Specifying the Func instance directly will cause React errors as React will treat it as a setter function.
                () => setFunc(() => new Func(1))
            }>(Re)create Callable</button> <br />
            <button onClick={() => setFunc(null)}>Clear Callable</button> <br /> <br />

            <h2>hasOwnProperty Test</h2>
            <div className="d-flex flex-row gap-2 mb-1">
                <label>Enter a JSON object:</label>
                <input className="flex-grow-1" type="text" defaultValue="{}" onChange={handleObjectChange} />
            </div>

            <div className="d-flex flex-row gap-2 mb-1">
                <label>Enter a property path (separated by dots):</label>
                <input type="text" value={prop} onChange={e => setProp(e.target.value)} />
            </div>

            {error && <p className="text-danger">{error}</p>}

            {
                !error && <p>
                    hasOwnNestedProperty: {object.hasOwnNestedProperty(prop).toString()} <br />
                    hasProperty: {object.hasProperty(prop).toString()} <br />
                    hasNestedProperty: {object.hasNestedProperty(prop).toString()} <br />
                    allProperties: {object.getAllProperties().join(", ")}
                </p>
            }
      </div>
    );
}

export default App;
