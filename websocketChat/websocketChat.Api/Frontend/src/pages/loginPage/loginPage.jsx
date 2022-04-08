import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as loginPageActions from './loginPageActions';

import TabsItem from './components/tabsItem';
import FormBody from "./components/formBody";
import TextField from "./components/textField";

export default function LoginPage() {
    const login = useSelector(store => store.login);
    const dispatch = useDispatch();
    const activeTabNumber = login?.activeTabNumber ?? 1;
    console.log(login);
    
    function onRegisterButtonClick() {
        dispatch(loginPageActions.registerUser());
    }
    
    function onAuthButtonClick() {
        dispatch(loginPageActions.authUser());
    }
    
    function changeActiveTabNumber(activeTabNumber) {
        dispatch(loginPageActions.changeActiveTabNumber(activeTabNumber));
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
                            onClick={() => changeActiveTabNumber(1)}>
                            Регистрация
                        </TabsItem>
                        <TabsItem
                            active={activeTabNumber === 2}
                            onClick={() => changeActiveTabNumber(2)}>
                            Вход
                        </TabsItem>
                    </div>
                    <FormBody active={activeTabNumber === 1}>
                        <div className="auth__label">
                            Введите имя, email, номер телефона и пароль
                        </div>
                        <TextField
                            fullWidth
                            error={login?.validationResult?.name?.isValid === false}
                            labelMessage={login?.validationResult?.name?.message}
                            onChange={(e) => dispatch(loginPageActions.changeName(e?.target?.value))}
                            value={login?.name ?? ""}
                            type="text"
                            placeholder="Имя" />
                        <TextField
                            fullWidth
                            error={login?.validationResult?.email?.isValid === false}
                            labelMessage={login?.validationResult?.email?.message}
                            onChange={(e) => dispatch(loginPageActions.changeEmail(e?.target?.value))}
                            value={login?.email ?? ""}
                            type="text"
                            placeholder="Email" />
                        <TextField
                            fullWidth
                            error={login?.validationResult?.phoneNumber?.isValid === false}
                            labelMessage={login?.validationResult?.phoneNumber?.message}
                            onChange={(e) => dispatch(loginPageActions.changePhoneNumber(e?.target?.value))}
                            value={login?.phoneNumber ?? ""}
                            type="text"
                            placeholder="Телефон" />
                        <TextField
                            fullWidth
                            error={login?.validationResult?.password?.isValid === false}
                            labelMessage={login?.validationResult?.password?.message}
                            onChange={(e) => dispatch(loginPageActions.changePassword(e?.target?.value))}
                            value={login?.password ?? ""}
                            type="password"
                            placeholder="Пароль"
                            helpMessage="Пароль должен содержать буквы, не должен начинаться с цифры" />
                        <button type="button" className="auth__button" onClick={onRegisterButtonClick}>
                            Далее
                        </button>
                    </FormBody>
                    <FormBody active={activeTabNumber === 2}>
                        <div className="auth__label">
                            Введите имя и пароль
                        </div>
                        <TextField 
                            fullWidth
                            error={login?.validationResult?.name?.isValid === false}
                            labelMessage={login?.validationResult?.name?.message}
                            onChange={(e) => dispatch(loginPageActions.changeName(e?.target?.value))}
                            value={login?.name ?? ""}
                            type="text"
                            placeholder="Имя" />
                        <TextField
                            fullWidth
                            error={login?.validationResult?.password?.isValid === false}
                            labelMessage={login?.validationResult?.password?.message}
                            onChange={(e) => dispatch(loginPageActions.changePassword(e?.target?.value))}
                            value={login?.password ?? ""}
                            type="password"
                            placeholder="Пароль"
                            helpMessage="Пароль должен содержать буквы, не должен начинаться с цифры" />
                        <button type="button" className="auth__button" onClick={onAuthButtonClick}>
                            Далее
                        </button>
                    </FormBody>
                </div>
            </main>
        </>
    );
}
//Пароль должен содержать буквы, не должен начинаться с цифры, не должен содержать пробел и символы -,(,),/