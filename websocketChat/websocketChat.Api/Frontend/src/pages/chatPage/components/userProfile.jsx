import React from 'react';
import Icons from '../../../img/svg/icons-sprite.svg';

export default function UserProfile(props) {
    const { user } = props;
    return (
        <aside className="current-friend">
            <figure>
                <img src={""} alt="friend" className="current-friend__avatar" />
                <figcaption>
                    <div className="current-friend__name">
                        {user?.name}
                        </div>
                    <div className="current-friend__desc">
                        {user?.about ?? ""}
                    </div>
                </figcaption>
            </figure>
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