import React from 'react';

import Modal from '../../../../components/modal';
import TextField from '../../../../components/textField';
import ModalFormField from './modalFormField';
import ModalLabel from './modalLabel';
import Delimiter from "../../../../components/delimiter";
import ModalButton from './modalButton';

export default function CreateChatModal(props) {
    const { visible, friends, hideChatModalVisibility } = props;

    function renderFriends() {
        return friends.map(friend => (
            <li key={`friend__${friend.phoneNumber}`} className="friends__list-item">
                <figure className="avatar">
                    <img className="avatar__img" src="" alt="avatar" />
                    <figcaption className="avatar__caption">
                        {friend.name}
                    </figcaption>
                </figure>
            </li>
        ));
    }

    function renderFriendList() {
        if (!friends?.length) {
            return null;
        }
        return (
            <div className="friends">
                <ul className="friends__list modal__list">
                    {renderFriends()}
                </ul>
            </div>
        );
    }

    return (
        <Modal
            visible={visible}
            onClickOutside={hideChatModalVisibility}>
            <ModalFormField>
                <ModalLabel forItem="input-1">
                    Введите название группы
                </ModalLabel>
                <TextField id="input-1" />
            </ModalFormField>
            <ModalFormField>
                <ModalLabel forItem="input-2">
                    Выберите участников
                </ModalLabel>
                <TextField
                    placeholder="Поиск..."
                    icon="search"
                    id="input-2" />
            </ModalFormField>
            {renderFriendList()}
            <Delimiter />
            <div className="modal__buttons">
                <ModalButton
                    value="Отменить"
                    onClick={hideChatModalVisibility} />
                <ModalButton
                    value="Создать"
                    onClick={() => { }} />
            </div>
        </Modal>
    );
}