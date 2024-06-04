import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Input } from "./Input";
import { ButtonLike } from "./ButtonLike";
import { ButtonFav } from "./ButtonFav";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <Input />
    
  </div>
);

reportWebVitals();
