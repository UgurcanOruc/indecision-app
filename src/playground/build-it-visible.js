class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      isVisible: false
    };
  }
  toggleVisibility() {
    this.setState((prevState) => {
      return {
        isVisible: !prevState.isVisible
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Visible Toggle</h1>
        <button onClick={this.toggleVisibility}>{this.state.isVisible ? "Hide Details" : "Show Details"}</button>
        {this.state.isVisible && ( <h4>Hey, These are some details you can now see!</h4> )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));

// let isVisible = false;
// const toggleVisiblitity = () => {
//     isVisible = !isVisible;
//     renderApp();
// };

// const appRoot = document.getElementById("app");

// const renderApp = () => {
//   const template = (
//     <div>
//       <h1>Visible Toggle</h1>
//       <button onClick={toggleVisiblitity}>
//         {isVisible ? "Hide Details" : "Show Details"}
//       </button>
//       {isVisible && <h4>Hey, These are some details you can now see!</h4>}
//     </div>
//   );

//   ReactDOM.render(template, appRoot);
// };

// renderApp();
