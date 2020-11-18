import React from "react";
import "./assets/css/styles.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import Map from "./Map";
import Table from "./Table";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Map />
        <Table />
      </div>
    </Provider>
  );
}
