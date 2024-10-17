import './App.css'
import {useEffect} from "react";
import {Link} from "react-router-dom";

export function GameOver() {
    useEffect(()=> {
        document.title = "Конец игры";
    },[])

    return (
        <>
            <h1>Вы проиграли :(</h1>
            <p>Кончились попытки</p>
            <Link to="/game">
                <button>Попробовать ещё раз</button>
            </Link>
        </>
    )
}

