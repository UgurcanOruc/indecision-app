import React from 'react';

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOption} onClick={props.pickOption}>
        What Should I Do?
      </button>
    </div>
  );
};

export default Action;