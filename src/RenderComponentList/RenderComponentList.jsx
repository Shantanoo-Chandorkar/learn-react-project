import React from "react";
import ComponentList from "./component-list";
import "./style.css";

const RenderComponentList = () => {
  return (
    <div className="render-component-list-outer-component">
      {ComponentList.map((item, index) => (
        <button key={index} className="render-component-list-button">
          {item}
        </button>
      ))}
    </div>
  )
}

export default RenderComponentList;