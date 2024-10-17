import './App.css'
import {useEffect} from "react";
import {Link} from "react-router-dom";

export function Welcome() {
    useEffect(()=>{
        document.title = "Приветственный экран";
    },[])

    return (
        <>
            <h1>Угадай мелодию</h1>
            <p>Правила игры: угадывайте исполнителей и жанры песен. У вас есть три попытки на ошибку!</p>
            <Link to="/game">
                <button>Начать игру</button>
            </Link>
        </>
    )
}

