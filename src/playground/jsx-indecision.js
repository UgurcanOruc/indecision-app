const app = {
  title: "Indecision App",
  subtitle: "Put your life in the hands of a computer",
  options: [],
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    renderOptions();
  }
};

const listOptions = () =>
  app.options.map((opt, index) => <li key={index}>{opt}</li>);

const removeOpts = () => {
  app.options = [];
  renderOptions();
};

const onMakeDesicion = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.getElementById("app");

const renderOptions = () => {
  const template = (
    <div>
      <h1>{app.title.toUpperCase()}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>
        {app.options.length > 0 ? "Here is your option(s)" : "No options"} -{" "}
        {app.options.length}
      </p>
      <ul>{listOptions()}</ul>
      <button
        onClick={removeOpts}
        style={{ "margin-bottom": "5px", "margin-right": "5px" }}
      >
        Remove All
      </button>
      <button disabled={app.options.length === 0} onClick={onMakeDesicion}>
        What Should I Do?
      </button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"></input>
        <button style={{ "margin-left": "5px" }}>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

renderOptions();
