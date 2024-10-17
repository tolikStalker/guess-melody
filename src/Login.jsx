import './App.css'
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export function Login() {
    useEffect(()=> {
        document.title = "Логин";
    },[])

    const navigate=useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const email=e.target.email.value
        const password=e.target.password.value
        axios.post('https://16.design.htmlacademy.pro/guess-melody/login', {email,password})
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate('/game');
            })
            .catch(error => {
                console.error('Ошибка авторизации: ', error);
            });
    };

    return (
        <>
            <h1>Авторизация</h1>
            <form className="form-auth" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </>
    )
}

