import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  
  handleAddOption = (e) => {
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