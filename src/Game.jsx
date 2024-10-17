import './App.css'
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export function Game() {
    useEffect(() => {
        document.title = "Игра";
    }, [])

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [errorCount, setErrorCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0); // Счётчик правильных ответов
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
    const token = localStorage.getItem('token')

        if(!token) {
            alert('Необходима авторизация!')
            navigate('/login');
            return
        }

    axios.get('https://16.design.htmlacademy.pro/guess-melody/login', {
        headers: {'X-Token': token}
    })
        .then(() => {
            axios.get('https://16.design.htmlacademy.pro/guess-melody/questions')
                .then(response => {
                    const data=response.data;
                    setQuestions(data);
                    setIsLoading(false);
                    console.log(response.data)
                    setCurrentQuestion(data[currentQuestionIndex]);
                })
                .catch(error => {
                    console.error('Ошибка загрузки вопросов: ', error);
                })

        })
        .catch(error => {
            if (error.status === 401) {
                 navigate('/login');
                return
            }
            console.error('Ошибка авторизации:', error);
        });
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setCorrectCount(correctCount+1);
            goToNextQuestion(correctCount+1,errorCount);
            return;
        }
            alert('Ответ неверный!')
            const newErrorCount = errorCount + 1;
            setErrorCount(a=>a+1);
            if (newErrorCount >= 3) {
                navigate('/lose');
                return;
            }
            goToNextQuestion(correctCount, newErrorCount);
    };

    const goToNextQuestion = (correct, wrong) => {
        const nextQuestionIndex = currentQuestionIndex + 1
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setCurrentQuestion(questions[nextQuestionIndex]);
            return;
        }
            navigate('/result', {
                state: {
                    correctCount: correct,
                    wrongCount: wrong
                }
            });
    };

    if (isLoading) return <div>Загрузка игры...</div>;

    return (
        <>
            <header>
                <Link to="/">На главную</Link>
                <div className="errors">
                    {Array(errorCount).fill('🔴').concat(Array(3 - errorCount).fill('🎵')).join(' ')}
                </div>
                <p>Вопрос № {currentQuestionIndex+1}</p>
            </header>
            <div>
                {currentQuestion.type === 'artist' ? (
                    <ArtistQuestion question={currentQuestion} onAnswer={handleAnswer} />
                    ) : (
                    <GenreQuestion question={currentQuestion} onAnswer={handleAnswer} />
                )}
            </div>
        </>
    );
}

    const ArtistQuestion = ({ question, onAnswer }) => {
        const { song, answers } = question;

        return (
            <div>
                <h2>Угадай исполнителя</h2>
                <audio controls autoPlay src={song.src}></audio>
                <div className="answers">
                    {answers.map((answer, index) => (
                        <button key={index} onClick={() => onAnswer(answer.artist === song.artist)}>
                            <img src={answer.picture} alt={answer.artist} />
                            <span>{answer.artist}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const GenreQuestion = ({ question, onAnswer }) => {
        const {answers, genre} = question;
        const [checkedAnswers, setCheckedAnswers] = useState([]);
        const audioRefs=useRef([]);

        const handleCheck = (index) => {
            setCheckedAnswers((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const isCorrect = checkedAnswers.every((answerIndex) => answers[answerIndex].genre === genre);
            setCheckedAnswers([]);
            onAnswer(isCorrect);
        };

        const handlePlay = (id) => {
            audioRefs.current.forEach((audio, index) => {
                if (audio && index !== id) {
                    audio.pause();
                }
            });
        }

 return (
        <div>
            <h2>Выберите жанр: {genre}</h2>
            <form className="answers" onSubmit={handleSubmit}>
                <ul>
                    {answers.map((answer, index) => (
                        <li key={index}>
                            <audio
                                ref={el => (audioRefs.current[index] = el)}
                                autoPlay={index === 0}
                                onPlay={() => handlePlay(index)}
                                controls
                                src={answer.src}
                            ></audio>
                            <input
                                type="checkbox"
                                checked={checkedAnswers.includes(index)}
                                onChange={() => handleCheck(index)}
                            />
                        </li>
                    ))}
                </ul>
                <button type="submit">Ответить</button>
            </form>
        </div>
 );
    }
