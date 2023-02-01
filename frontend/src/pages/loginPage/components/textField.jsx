import React from 'react';
import classNames from "classnames";
import Icons from "../../../img/svg/icons-sprite.svg";

export default function TextField(props) {
    const {fullWidth, error, labelMessage, onChange, value, helpMessage, ...restProps} = props;
    const inputControlClasses = classNames({
        'input__control': true,
        'input__control_full-width': fullWidth,
        'input__control_error': error
    });
    
    function renderInput() {
        return (
            <>
                <input
                    className={inputControlClasses}
                    value={value ?? ""}
                    onChange={onChange}
                    {...restProps} />
                {renderHelpMessage()}
            </>
        );
    }
    
    function renderHelpMessage() {
        if (helpMessage) {
            return (
                <div className="input__help">
                    <div className="input__help-icon-container">
                        <svg width="100%" height="100%" viewBox="0 0 28 28" className="input__help-icon">
                            <use xlinkHref={`${Icons}#help`}/>
                        </svg>
                        <div className="input__help-tooltip">
                            {helpMessage}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
    
    function renderInputContent() {
        if (error) {
            return (
                <label className="input__label input__label_error">
                    <div className="input__label-text">
                        {labelMessage}
                    </div>
                    {renderInput()}
                </label>
            );
        }
        return renderInput();
    }
    
    return (
        <div className="input">
            {renderInputContent()}
        </div>
    );
}