import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as loginPageActions from './loginPageActions';

import TabsItem from './components/tabsItem';
import FormBody from "./components/formBody";

export default function LoginPage(props) {
    const login = useSelector(store => store.login);
    const dispatch = useDispatch();
    const [activeTabNumber, setActiveTab]  = useState(1)
    console.log(login);
    
    function onRegisterButtonClick() {
        dispatch(loginPageActions.registerUser());
    }
    
    function onAuthButtonClick() {
        dispatch(loginPageActions.authUser());
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
                        <TabsItem
                            active={activeTabNumber === 1}
                            onClick={() => setActiveTab(1)}>
                            Вход
                        </TabsItem>
                        <TabsItem
                            active={activeTabNumber === 2}
                            onClick={() => setActiveTab(2)}>
                            Регистрация
                        </TabsItem>
                    </div>
                    <FormBody active={activeTabNumber === 1}>
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
                                onChange={(e) => dispatch(loginPageActions.changePhoneNumber(e.target.value))} />
                        </div>
                        <button type="button" className="auth__button" onClick={onRegisterButtonClick}>
                            Далее
                        </button>
                    </FormBody>
                    <FormBody active={activeTabNumber === 2}>
                        <div className="auth__label">
                            Введите номер телефона
                        </div>
                        <div className="input">
                            <input className="input__control input__control_full-width" type="text" placeholder="Телефон"/>
                        </div>
                        <button type="button" className="auth__button" onClick={onAuthButtonClick}>
                            Далее
                        </button>
                    </FormBody>
                </div>
            </main>
        </>
    );
}