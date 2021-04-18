import React from "react";
import ReactDOM from "react-dom";

import CharacterCreation from "./CharacterCreation";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CharacterCreation />
  </React.StrictMode>,
  rootElement
);
