import { useState } from "react";
import { listInPlainEnglish, isNullOrUndefined } from "@ptolemy2002/js-utils";

function App() {
    const [listText, setListText] = useState('');
    const [max, setMax] = useState(undefined);
    const [conjunction, setConjunction] = useState('and');

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
      </div>
    );
}

export default App;
