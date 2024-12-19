import React from "react";
import "./App.css";
import Movies from "./Components/Movies";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import List from "./Components/List";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </div>
    );
}

export default App;
