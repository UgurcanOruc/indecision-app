import React from "react";

const Option = (props) => (
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

export default Option;
