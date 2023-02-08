import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Pizza from "./features/pizza/Pizza";
import Pokemon from "./features/pokemon/Pokemon";
import Paper from "@mui/material/Paper";
import Layout from "./Layout/Layout";
import { app } from "../firebaseConfig";

function App() {
  return (
    <Layout />
    // <div className="App">
    //   <Paper>
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <Pizza />
    //     <Pokemon />
    //   </Paper>
    // </div>
  );
}

export default App;
