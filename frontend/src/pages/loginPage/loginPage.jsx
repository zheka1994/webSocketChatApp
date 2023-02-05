import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as loginPageActions from './loginPageActions';
import { getCurrentRoot } from "../../core/utils/urlExtensions";

import TabsItem from './components/tabsItem';
import FormBody from "./components/formBody";
import TextField from "./components/textField";
import Icons from "../../img/svg/icons-sprite.svg";

export default function LoginPage() {
    const login = useSelector(store => store.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeTabNumber = login?.activeTabNumber ?? 1;
    
    function onRegisterButtonClick() {
        dispatch(loginPageActions.registerUser(navigate));
    }
    
    function onAuthButtonClick() {
        dispatch(loginPageActions.authUser(navigate));
    }
    
    function onVkOAuthButtonClick() {
        const redirectUri = `${getCurrentRoot()}/oauth-redirect?auth_type=vk`;
        window.location = `https://oauth.vk.com/authorize?client_id=${OAUTH_VK_CLIENT_ID}&display=page&redirect_uri=${redirectUri}&scope=email&response_type=code&v=5.131`;
    }

    function onGoogleOAuthButtonClick() {
        const redirectUri = `${getCurrentRoot()}/oauth-redirect?auth_type=google`;
        const clientId = OAUTH_GOOGLE_CLIENT_ID;
        window.location = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email&response_type=code`;
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
                            key="reg_name"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.name?.isValid === false}
                            labelMessage={login?.validationResult?.name?.message}
                            onChange={(e) => dispatch(loginPageActions.changeName(e?.target?.value))}
                            value={login?.name ?? ""}
                            type="text"
                            placeholder="Имя" />
                        <TextField
                            key="reg_email"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.email?.isValid === false}
                            labelMessage={login?.validationResult?.email?.message}
                            onChange={(e) => dispatch(loginPageActions.changeEmail(e?.target?.value))}
                            value={login?.email ?? ""}
                            type="text"
                            placeholder="Email" />
                        <TextField
                            key="reg_phone"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.phoneNumber?.isValid === false}
                            labelMessage={login?.validationResult?.phoneNumber?.message}
                            onChange={(e) => dispatch(loginPageActions.changePhoneNumber(e?.target?.value))}
                            value={login?.phoneNumber ?? ""}
                            type="text"
                            placeholder="Телефон" />
                        <TextField
                            key="reg_pwd"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.password?.isValid === false}
                            labelMessage={login?.validationResult?.password?.message}
                            onChange={(e) => dispatch(loginPageActions.changePassword(e?.target?.value))}
                            value={login?.password ?? ""}
                            type="password"
                            placeholder="Пароль"
                            helpMessage="Пароль должен содержать буквы, не должен начинаться с цифры" />
                        <button type="button" className="auth__button auth__button_jwt" onClick={onRegisterButtonClick}>
                            Далее
                        </button>
                    </FormBody>
                    <FormBody active={activeTabNumber === 2}>
                        <div className="auth__label">
                            Введите имя и пароль
                        </div>
                        <TextField
                            key="auth_name"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.name?.isValid === false}
                            labelMessage={login?.validationResult?.name?.message}
                            onChange={(e) => dispatch(loginPageActions.changeName(e?.target?.value))}
                            value={login?.name ?? ""}
                            type="text"
                            placeholder="Имя" />
                        <TextField
                            key="auth_pwd"
                            fullWidth
                            autoFocus
                            error={login?.validationResult?.password?.isValid === false}
                            labelMessage={login?.validationResult?.password?.message}
                            onChange={(e) => dispatch(loginPageActions.changePassword(e?.target?.value))}
                            value={login?.password ?? ""}
                            type="password"
                            placeholder="Пароль"
                            helpMessage="Пароль должен содержать буквы, не должен начинаться с цифры" />
                        <button type="button" className="auth__button auth__button_jwt" onClick={onAuthButtonClick}>
                            Далее
                        </button>
                        <div className="auth__social">
                            <div className="auth__social-title">
                                Авторизоваться через:
                            </div>
                            <div className="auth__social-container">
                                <div className="auth__svg-container auth__svg-container_vk" onClick={onVkOAuthButtonClick}>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" className="input__help-icon">
                                        <use xlinkHref={`${Icons}#vk`}/>
                                    </svg>
                                </div>
                                <div className="auth__svg-container auth__svg-container_google" onClick={onGoogleOAuthButtonClick}>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" className="input__help-icon">
                                        <use xlinkHref={`${Icons}#google`}/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </FormBody>
                </div>
            </main>
        </>
    );
}