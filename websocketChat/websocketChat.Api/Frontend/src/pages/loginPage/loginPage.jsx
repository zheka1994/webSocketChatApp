import React from "react";
import {useNavigate} from "react-router";

export default function LoginPage(props) {
    const navigate = useNavigate();
    
    function onButtonClick() {
        console.log("Go to chat page");
        navigate("/chat");
    }
    
    return (
        <>
            <header className="auth__header" />
            <main className="auth__main">
                <div className="auth__form">
                    <div className="auth__form-header">
                        Чат
                    </div>
                    <div className="tabs">
                        <div className="tabs__item tabs__item_active">
                            Вход
                        </div>
                        <div className="tabs__item">
                            Регистрация
                        </div>
                    </div>
                    <div className="auth__form-body auth__form-body_active">
                        <div className="auth__label">
                            Введите имя, фамилию (по желанию) и номер телефона
                        </div>
                        <div className="input">
                            <input className="input__control input__control_full-width" type="text" placeholder="Имя"/>
                        </div>
                        <div className="input">
                            <input className="input__control input__control_full-width" type="text" placeholder="Фамилия"/>
                        </div>
                        <div className="input">
                            <input className="input__control input__control_full-width" type="text" placeholder="Телефон"/>
                        </div>
                        <button type="button" className="auth__button">Далее</button>
                    </div>
                    <div className="auth__form-body">
                        <div className="auth__label">
                            Введите номер телефона
                        </div>
                        <div className="input">
                            <input className="input__control input__control_full-width" type="text" placeholder="Телефон"/>
                        </div>
                        <button type="button" className="auth__button" onClick={onButtonClick}>
                            Далее
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}