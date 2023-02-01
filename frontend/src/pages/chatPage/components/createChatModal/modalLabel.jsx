import React from 'react';

export default function ModalLabel(props) {
    const { forItem, children } = props;
    return (
        <div class="modal__label" for={forItem}>
            {children}
        </div>
    );
}