import React from "react";
import ReactDom from "react-dom";
import CityPicker from "./city-picker/city-picker";
import "./libs/less/style.less";

ReactDom.render(
  <CityPicker />,
  document.getElementById('root')
)