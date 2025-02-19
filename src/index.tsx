import React from "react";
import ReactDOM from "react-dom/client";
import GridExample from "./GridExample";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GridExample />
  </React.StrictMode>
);
