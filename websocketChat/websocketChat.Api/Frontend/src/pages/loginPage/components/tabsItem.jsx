import React from 'react';
import classNames from 'classnames';

export default function TabsItem(props) {
    const {active, children} = props;

    const classes = classNames({
        'tabs__item': true,
        'tabs__item_active': active
    });

    return (
        <div className={classes}>
            {children}
        </div>
    );
}