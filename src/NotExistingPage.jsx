import './App.css'
import {useEffect} from "react";
import {Link} from "react-router-dom";

export function NotExistingPage() {
    useEffect(()=> {
        document.title = "Страница не существует";
    },[])

    return (
        <>
            <h1>404 Not Found</h1>
            <p>Страница не найдена</p>
            <Link to="/">Вернуться на главную</Link>
        </>
    )
}

