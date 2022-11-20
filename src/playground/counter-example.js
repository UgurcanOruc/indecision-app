let count = 0;
const addOne = () => {
    count++;
    renderCounterapp();
};
const minusOne = () => {
    count--;
    renderCounterapp();
}
const reset = () => {
    count = 0;
    renderCounterapp();
}

const appRoot = document.getElementById('app');

const renderCounterapp = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>reset</button>
        </div>
    );
    
    ReactDOM.render(templateTwo, appRoot);
};

renderCounterapp();