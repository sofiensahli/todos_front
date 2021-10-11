import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import SnackbarWrapper from "./components/utils/snackbar";
import { ProvideSnackbar } from "./components/utils/use-snackbar.hook";

ReactDOM.render(
  <RecoilRoot>
    <ProvideSnackbar>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProvideSnackbar>

  </RecoilRoot>,
  document.getElementById("root")
);

reportWebVitals();
