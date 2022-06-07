import React from 'react';
import Icons from '../../../img/svg/icons-sprite.svg';

import { getUserNameAbbreviation } from '../business/userNameBusiness';

export default function UserProfile(props) {
    const { user, setAvatarFile, uploadAvatar } = props;

    function onChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);
        uploadAvatar();
    }

    function renderAvatar() {
        if (user?.avatarUri) {
            return (
                <figure>
                    <img src={user?.avatarUri} alt="friend" className="current-friend__avatar" />
                    <figcaption>
                        <div className="current-friend__name">
                            {user?.name ?? ""}
                        </div>
                        <div className="current-friend__desc">
                            {user?.about ?? ""}
                        </div>
                    </figcaption>
                </figure>
            );
        }
        return (
            <div className="current-friend__avatar-text">
                <div className="current-friend__avatar-text-inner">
                    <label for="files">{getUserNameAbbreviation(user?.name)}</label>
                    <input
                        id="files"
                        type="file"
                        accept=".jpeg,.jpg,.webp"
                        onChange={onChangeAvatar} />
                </div>
            </div>
        );
    }
    
    return (
        <aside className="current-friend">
            {renderAvatar()}
            <div className="current-friend__container">
                <section className="social">
                    <span className="social__icon">
                        <svg className="facebook">
                            <use xlinkHref={`${Icons}#facebook`}></use>
                        </svg>
                    </span>
                    <span className="social__icon">
                        <svg className="twitter">
                            <use xlinkHref={`${Icons}#twitter`}></use>
                        </svg>
                    </span>
                    <span className="social__icon">
                        <svg className="instagramm">
                            <use xlinkHref={`${Icons}#instagramm`}></use>
                        </svg>
                    </span>
                    <span className="social__icon">
                        <svg className="linked-in">
                            <use xlinkHref={`${Icons}#linked-in`}></use>
                        </svg>
                    </span>
                </section>
                <ul className="contacts">
                    <li className="contacts__item">
                        <div className="contacts__caption">
                            Имя профиля
                         </div>
                        <div className="contacts__value">
                            {user?.name}
                        </div>
                    </li>
                    <li className="contacts__item">
                        <div className="contacts__caption">
                            Электронная почта
                            </div>
                        <div className="contacts__value">
                            {user?.email}
                        </div>
                    </li>
                    <li className="contacts__item">
                        <div className="contacts__caption">
                            Номер телефона
                        </div>
                        <div className="contacts__value">
                            {user?.phoneNumber}
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}