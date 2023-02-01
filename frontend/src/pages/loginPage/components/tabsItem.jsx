import React from 'react';
import classNames from 'classnames';

export default function TabsItem(props) {
    const {active, onClick, children} = props;

    const classes = classNames({
        'tabs__item': true,
        'tabs__item_active': active
    });

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
}