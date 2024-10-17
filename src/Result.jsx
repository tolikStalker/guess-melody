import './App.css'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

export function Result() {
    useEffect(()=> {
        document.title = "Результат";
    },[])

    const [isLoading, setIsLoading] = useState(true);
    const {state} = useLocation()
    const {correctCount,wrongCount} = state;

    useEffect(() => {
        const token = localStorage.getItem('token')

        axios.get('https://16.design.htmlacademy.pro/guess-melody/login', {
            headers: {'X-Token': token}
        })
            .then(() => {
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    if(isLoading) return <div>Загрузка результатов...</div>

    return (
        <>
            <h1>Поздравляем! Вы выиграли!</h1>
            <p style={{color: 'green'}}>Правильных ответов: {correctCount}</p>
            <p style={{color: 'red'}}>Неправильных ответов: {wrongCount}</p>
            <Link to="/game">
            <button>Попробовать ещё раз</button>
            </Link>
        </>
    )
}

