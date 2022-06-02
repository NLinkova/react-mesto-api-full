import React from "react";

function Loader(props) {
  return (
    <div className={props.isLoading ? `loader loader_shown` : `loader`}></div>
  );
}

export default Loader;
