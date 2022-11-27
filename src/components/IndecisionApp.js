import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./Options";
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    subtitle: "Put your life in the hands of a computer",
    options: [],
    selectedOption: undefined,
  };

  deleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  deleteOption = (option) => {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((opt) => opt !== option),
      };
    });
  }

  pickOption = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }

  clearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
    
  }

  addOption = (option) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists.";
    }

    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
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

  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <div className="container">
          <Action
            hasOption={this.state.options.length > 0}
            pickOption={this.pickOption}
          />
          <div className="widget">
            <Options
              deleteOptions={this.deleteOptions}
              deleteOption={this.deleteOption}
              options={this.state.options}
            />
            <AddOption addOption={this.addOption} />
          </div>
          <OptionModal
            selectedOption={this.state.selectedOption}
            clearSelectedOption={this.clearSelectedOption}
          />
        </div>
      </div>
    );
  }
}
