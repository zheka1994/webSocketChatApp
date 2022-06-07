import React, { useCallback, useRef } from 'react';
import classNames from 'classnames';

export default function Modal(props) {
    const classes = classNames({
        "modal": true,
        "modal_visible": props.visible
    });
    const modalContentRef = useRef(null);

    const onClick = useCallback((event) => {
        if (!modalContentRef?.current?.contains(event.target)) {
            props.onClickOutside();
        }
    }, []);

    return (
        <div className={classes} onClick={onClick}>
            <div
                className="modal__content"
                ref={modalContentRef}>
                {props.children}
            </div>
        </div>
    );
}