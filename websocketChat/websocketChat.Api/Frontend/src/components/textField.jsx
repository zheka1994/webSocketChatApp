import React from 'react';
import Icons from '../img/svg/icons-sprite.svg';

export default function TextField(props) {
    const { placeholder, value, onChange, onFocus, onBlur, icon, ...restProps } = props;

    function renderIcon() {
        if (icon) {
            return (
                <svg className="input__icon">
                    <use xlinkHref={`${Icons}#${icon}`} />
                </svg>
            );
        }
        return null;
    }

    return (
        <div className="input">
            <input
                className="input__control"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                {...restProps} />
            {renderIcon()}
        </div>
    );
}