import React from 'react';

export default function ModalButton(props) {
    const { value, onClick } = props;

    return (
        <button class="modal__button" onClick={onClick}>
            {value}
        </button>
    );
}