import React, { useEffect } from 'react';
import TextField from '../../../components/textField';

import { getUserNameAbbreviation } from '../business/userNameBusiness';

export default function Friends(props) {
    const { chats, friends, suggestFriends, newFriendSearchQuery, changeNewFriendSearchQuery, findNewFriends, showChatModalVisibility } = props;

    useEffect(() => {
        if (newFriendSearchQuery?.length > 3) {
            findNewFriends(newFriendSearchQuery);
        }
    }, [newFriendSearchQuery]);

    function onChangeNewFriendQuery(event) {
        changeNewFriendSearchQuery(event.target.value);
    }

    function renderSearch() {
        return (
            <div className="aside__search">
                <TextField
                    placeholder="Поиск..."
                    value={newFriendSearchQuery}
                    onChange={onChangeNewFriendQuery}
                    icon="search" />
            </div>
        )
    }

    function renderChatsHeader() {
        return (
            <div className="channels__header">
                <span className="channels__title">Чаты</span>
                <span className="channels__count">{chats?.length ?? 0}</span>
            </div>
        );
    }

    function renderChatList(items) {
        return items.map((chat, index) => (
            <li key={`chat__${index}`} className="channels__list-item">
                #{chat.name}
            </li>
        ));
    }

    function renderChats() {
        if (!chats?.length) {
            return null;
        }

        const items = suggestChats;

        return (
            <ul className="channels__list">
                {renderChatList(items)}
            </ul>
        );
    }

    function renderFriendsHeader() {
        const title = suggestFriends?.length ? 'Возможные друзья' : 'Друзья';
        const countFriends = suggestFriends?.length ? suggestFriends.length : friends?.length;
        return (
            <div className="friends__header">
                <span className="friends__title">{title}</span>
                <span className="friends__count">{countFriends ?? 0}</span>
            </div>
        );
    }

    function renderFriendAvatar(friend) {
        if (friend.avatarUri) {
            return (
                <figure className="avatar">
                    <img className="avatar__img" src={friend.avatarUri} alt="avatar" />
                    <figcaption className="avatar__caption">
                        {friend.name}
                    </figcaption>
                </figure>
            );
        }
        return (
            <div class="friends-text">
                <div className="friends-text__logo">
                    {getUserNameAbbreviation(friend.name)}
                </div>
                <span className="friends-text__desc">
                    {friend.name}
                </span>
            </div>
        );
    }

    function renderFriendList(items) {
        return items.map((friend, index) => (
            <li key={`friend__${index}`} className="friends__list-item friends__list-item_online">
                {renderFriendAvatar(friend)}
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
        <aside className="aside aside_left">
            {renderSearch()}
            <div className="channels">
                {renderChatsHeader()}
                {renderChats()}
            </div>
            <div className="friends">
                {renderFriendsHeader()}
                {renderFriends()}
            </div>
            <div className="aside__add">
                <button
                    type="button"
                    className="aside__button aside__button_add"
                    onClick={showChatModalVisibility}>
                </button>
                <span className="aside__add-title">
                    Создать канал
                </span>
            </div>
        </aside>
    )

}