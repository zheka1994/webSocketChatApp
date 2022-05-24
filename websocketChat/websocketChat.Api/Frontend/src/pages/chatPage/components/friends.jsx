import React, { useEffect } from 'react';
import TextField from '../../../components/textField';

export default function Friends(props) {
    const { friends, suggestFriends, newFriendSearchQuery, changeNewFriendSearchQuery, findNewFriends } = props;

    useEffect(() => {
        if (newFriendSearchQuery?.length > 3) {
            findNewFriends(newFriendSearchQuery);
        }
    }, [newFriendSearchQuery]);

    function onChangeNewFriendQuery(event) {
        changeNewFriendSearchQuery(event.target.value);
    }

    function renderFriendsHeader() {
        const title = suggestFriends?.length ? 'Возможные друзья' : 'Друзья';
        const countFriends = suggestFriends?.length ? suggestFriends.length : friends?.length
        return (
            <div className="friends__header">
                <span className="friends__title">{title}</span>
                <span className="friends__count">{countFriends ?? 0}</span>
            </div>
        );
    }

    function renderFriendSearch() {
        return (
            <div className="friends__search">
                <TextField
                    placeholder="Поиск..."
                    value={newFriendSearchQuery}
                    onChange={onChangeNewFriendQuery}
                    icon="search" />
            </div>
        )
    }

    function renderFriendList(items) {
        return items.map((friend, index) => (
            <li key={`friend__${index}`} className="friends__list-item friends__list-item_online">
                <figure className="avatar">
                    <img className="avatar__img" src={""} alt="avatar" />
                    <figcaption className="avatar__caption">
                        {friend.name}
                    </figcaption>
                </figure>
            </li>
        ));
    }

    function renderFriends() {
        if (!friends?.length && !suggestFriends?.length) {
            return null;
        }

        const items = suggestFriends?.length ? suggestFriends : friends;

        if (!items?.length) {
            return null;
        }

        return (
            <ul className="friends__list">
                {renderFriendList(items)}
            </ul>
        );
    }

    return (
        <aside className="friends">
            {renderFriendsHeader()}
            {renderFriendSearch()}
            {renderFriends()}
        </aside>
    )

}