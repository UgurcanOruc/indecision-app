import React from "react";
import Option from "./Option";

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button onClick={props.deleteOptions} className="button button--link">
        Remove All
      </button>
    </div>
    {props.options.length === 0 && (
      <p className="widget__message">Please add an option to get started.</p>
    )}
    {props.options.map((option, index) => (
      <Option key={option} option={option} count={index+1} deleteOption={props.deleteOption} />
    ))}
  </div>
);

export default Options;
