import React from 'react';

import Modal from '../../../components/modal';

export default function UserPhotoModal(props) {
    const { visible, hideUserPhotoModalVisibility, avatarUri } = props;

    return (
        <Modal
            visible={visible && avatarUri}
            closable
            noPadding
            onClickOutside={hideUserPhotoModalVisibility}>
            <div className="photo-modal">
                <img src={avatarUri} alt="current user" className="photo-modal__avatar" />
            </div>
        </Modal>
    )
}