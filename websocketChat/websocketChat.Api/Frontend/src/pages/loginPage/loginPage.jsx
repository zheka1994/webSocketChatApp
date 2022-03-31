import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import * as loginPageActions from './loginPageActions';

import TabsItem from './components/tabsItem';

export default function LoginPage(props) {
    const navigate = useNavigate();
    const login = useSelector(store => store.login);
    const dispatch = useDispatch();
    
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
                        <TabsItem active>
                            Вход
                        </TabsItem>
                        <TabsItem>
                            Регистрация
                        </TabsItem>
                    </div>
                    <div className="auth__form-body auth__form-body_active">
                        <div className="auth__label">
                            Введите имя, фамилию (по желанию) и номер телефона
                        </div>
                        <div className="input">
                            <input
                                className="input__control input__control_full-width"
                                type="text"
                                placeholder="Имя"
                                value={login?.name ?? ""}
                                onChange={(e) => dispatch(loginPageActions.changeName(e.target.value))} />
                        </div>
                        <div className="input">
                            <input
                                className="input__control input__control_full-width"
                                type="text"
                                placeholder="Фамилия"
                                value={login?.lastName ?? ""}
                                onChange={(e) => dispatch(loginPageActions.changeLastName(e.target.value))} />
                        </div>
                        <div className="input">
                            <input
                                className="input__control input__control_full-width"
                                type="text"
                                placeholder="Телефон"
                                value={login?.phoneNumber ?? ""}
                                onChange={(e) => dispatch(loginPageActions.changephoneNumber(e.target.value))} />
                        </div>
                        <button type="button" className="auth__button">
                            Далее
                        </button>
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