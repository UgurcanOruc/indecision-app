import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./Options";

export default class IndecisionApp extends React.Component {
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
