// cd C:/reactCourse/indecision-app
// yarn run serve
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// babel src/playground/.js --out-file=public/scripts/app.js --presets=env,react --watch

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.deleteOptions = this.deleteOptions.bind(this);
    this.pickOption = this.pickOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.state = {
      subtitle: "Put your life in the hands of a computer",
      options: [],
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  deleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  deleteOption(option) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((opt) => opt !== option),
      };
    });
  }

  pickOption() {
    this.setState((prevState) => {
      var index = Math.floor(Math.random() * prevState.options.length);
      return prevState.options[index];
    });
  }

  addOption(option) {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists.";
    }

    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
  }

  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <Action
          hasOption={this.state.options.length > 0}
          pickOption={this.pickOption}
        />
        <Options
          deleteOptions={this.deleteOptions}
          deleteOption={this.deleteOption}
          options={this.state.options}
        />
        <AddOption addOption={this.addOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision",
};

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOption} onClick={props.pickOption}>
        What Should I Do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.deleteOptions} style={{ "margin-top": "5px" }}>
        Remove All
      </button>
      {props.options.length === 0 && <p>Please add an option to get started.</p>}
      {props.options.map((option) => (
        <Option
          key={option}
          option={option}
          deleteOption={props.deleteOption}
        />
      ))}
      <Option />
    </div>
  );
};

const Option = (props) => {
  return (
    <div style={{ "margin-top": "5px" }}>
      <label>{props.option}</label>
      {props.option && (
        <button
          onClick={(e) => {
            props.deleteOption(props.option);
          }}
          style={{ "margin-left": "5px" }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.addOption(option);
    this.setState(() => ({ error: error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"></input>
          <button style={{ "margin-left": "5px" }}>Add Option</button>
        </form>
        {this.state.error && <span>{this.state.error}</span>}
      </div>
    );
  }
}

// const User = (props) => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };
// <User name="Ugur" age="26"/>

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
