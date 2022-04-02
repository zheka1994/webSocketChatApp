import React from "react";
import classNames from "classnames";

export default function FormBody(props) {
    const {active, children} = props;
    const classes = classNames({
        "auth__form-body": true,
        "auth__form-body_active": active
    });
    
    return (
        <div className={classes}>
            {children}
        </div>
    )
}