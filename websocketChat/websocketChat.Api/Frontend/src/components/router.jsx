import React from "react";
import routes from "../pages/appRoutes";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";

export default function Router() {
    function renderRoutes() {
        return routes?.map((route, index) => {
            return renderRouteWithSubRoutes(route, index);
        });
    }

    function renderRouteWithSubRoutes(route, index) {
        return (
            <Route
                key={`${route}__index`}
                path={route.path}
                element={route.component}
            />
        );
    }
    
    return (
        <BrowserRouter
            basename={window?.location?.pathname}>
            <Routes>
                {renderRoutes()} 
            </Routes>
        </BrowserRouter>
    );
}