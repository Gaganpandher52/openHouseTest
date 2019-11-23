import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import MainRender from "./components/communityName";

function App() {
  return (
    <div className="App">
      <Header />
      <MainRender/>
    </div>
  );
}

export default App;
