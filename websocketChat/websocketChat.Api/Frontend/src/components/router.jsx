import React from "react";
import appRoutes from "../pages/appRoutes";
import {BrowserRouter, useRoutes} from "react-router-dom";

export default function Router(props) {
    return (
        <BrowserRouter basename={props.basename}>
            <Routes />
        </BrowserRouter>
    );
}

function Routes() {
    const routes = useRoutes(appRoutes);
    return routes;
}