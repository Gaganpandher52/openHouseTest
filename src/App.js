import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import CommunityInfo from "./components/communityName/CommunityInfo";

function App() {
  return (
    <div className="App">
      <Header />
      <CommunityInfo />
    </div>
  );
}

export default App;
