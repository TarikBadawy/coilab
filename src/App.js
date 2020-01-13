import React from "react";
//import GetData from "./GetData";
import Navbar from "./components/Navbar";
import Login from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
