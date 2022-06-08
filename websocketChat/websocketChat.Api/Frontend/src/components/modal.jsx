import React, { useCallback, useRef } from 'react';
import classNames from 'classnames';

export default function Modal(props) {
    const modalClasses = classNames({
        "modal": true,
        "modal_visible": props.visible,
        "modal_closable": props.closable
    });

    const modalContentClasses = classNames({
        "modal__content": true,
        "modal__content_no-padding": props.noPadding
    });

    const modalContentRef = useRef(null);

    const onClick = useCallback((event) => {
        if (!modalContentRef?.current?.contains(event.target)) {
            props.onClickOutside();
        }
    }, []);

    return (
        <div className={modalClasses} onClick={onClick}>
            <div
                className={modalContentClasses}
                ref={modalContentRef}>
                {props.children}
            </div>
        </div>
    );
}