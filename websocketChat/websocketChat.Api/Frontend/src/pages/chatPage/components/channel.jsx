import React from 'react';
import TextField from '../../../components/textField';
import Delimiter from '../../../components/delimiter';
import Icons from '../../../img/svg/icons-sprite.svg';

// TODO сделать скролл и постраничную загрузку истории сообщений
export default function Channel(props) {
    const { selectedChat } = props;

    function renderDialogHeader() {
        return (
            <section className="dialog__header">
                <div className="dialog__caption">
                    <span className="dialog__title">
                        {selectedChat?.name ?? ""}
                    </span>
                </div>
                <div className="dialog__menu">
                    <TextField
                        placeholder="Поиск..."
                        value={selectedChat?.search ?? ""}
                        icon="search"
                    />
                </div>
            </section>
        )
    }

    function renderMessages() {
        const selectedChatCreateDates = [...new Set(selectedChat?.messages?.map(message => message.CreateDate))];
        let currMessageDay = selectedChatCreateDates[0];
        // Если сегодняшняя дата, то писать сегодня и надо писать время сообщения
        return selectedChat?.messages?.map((message, index) => {
            if (index === 0 || currMessageDay !== message.createDate) {
                return (
                    <React.Fragment key={`message__${index}`}>
                        <div className="message-list__date">
                            <span>Monday, October 22nd</span>
                        </div>
                        <div className="message-list__item">
                            <figure className="avatar">
                                <img className="avatar__img" src={""} alt="avatar" />
                            </figure>
                            <div className="message-content">
                                <div className="message-content__header">
                                    <span className="message-content__title">
                                        {message?.user ?? ""}
                                    </span>
                                    <span className="message-content__time">
                                        {message?.createDate ?? "Сюда писать время от даты"}
                                    </span>
                                </div>
                                <p className="message-content__text">
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            return (
                <React.Fragment key={`message__${index}`}>
                    <div className="message-list__date">
                        <span>Monday, October 22nd</span>
                    </div>
                    <div className="message-list__item">
                        <figure className="avatar">
                            <img className="avatar__img" src={""} alt="avatar" />
                        </figure>
                        <div className="message-content">
                            <div className="message-content__header">
                                <span className="message-content__title">
                                    {message?.user ?? ""}
                                </span>
                                <span className="message-content__time">
                                    {message?.createDate ?? "Сюда писать время от даты"}
                                </span>
                            </div>
                            <p className="message-content__text">
                                {message.content}
                            </p>
                        </div>
                    </div>
                </React.Fragment>
            );
        })
    }

    function renderDialogSection() {
        return (
            <section className="dialog__main">
                <div className="message-list">
                    {renderMessages()}
                </div>
            </section>
        );
    }

    function renderDialogFooter() {
        return (
            <section className="dialog__footer">
                <svg className="clip">
                    <use xlinkHref={`${Icons}#clip`} />
                </svg>
                <svg className="microphone">
                    <use xlinkHref={`${Icons}#microphone`} />
                </svg>
                <textarea
                    className="dialog__comment comment"
                    placeholder="Enter message" />
            </section>
        )
    }

    return (
        <main className="dialog">
            {renderDialogHeader()}
            <Delimiter />
            {renderDialogSection()}
            <Delimiter />
            {renderDialogFooter()}
        </main>
    )

}