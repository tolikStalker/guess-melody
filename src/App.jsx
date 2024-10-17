import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Result} from "./Result.jsx";
import {Game} from "./Game.jsx";
import {GameOver} from "./GameOver.jsx";
import {Login} from "./Login.jsx";
import {NotExistingPage} from "./NotExistingPage.jsx";
import {Welcome} from "./Welcome.jsx";
import {useState} from "react";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/game" element={<Game/>} />
                <Route path="/result" element={<Result/>} />
                <Route path="/lose" element={<GameOver/>} />
                <Route path="*" element={<NotExistingPage/>} />
            </Routes>
        </Router>
    )
}

