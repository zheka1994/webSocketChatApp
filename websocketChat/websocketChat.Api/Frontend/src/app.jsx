import './scss/app.scss';
import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./pages/loginPage/loginPage";
import Router from "./components/router";

ReactDOM.render(
    <Router/>,
    // <LoginPage />,
    document.getElementById("chat-app")
);