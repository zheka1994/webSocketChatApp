import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WebSocketClient from '../../core/websocketClient/webSocketClient';

//import avatar from '../../img/jpg/avatar.jpg'; // for testing avatar
import Icons from '../../img/svg/icons-sprite.svg';
import * as chatPageActions from './chatPageActions';
import Channel from './components/channel';
import CreateChatModal from './components/createChatModal/createChatModal';
import Friends from './components/friends';
import UserPhotoModal from './components/userPhotoModal';
import UserProfile from './components/userProfile';


export default function ChatPage() {
    const chat = useSelector(store => store.chat);
    const dispatch = useDispatch();
    const websocketClient = useRef();

    useEffect(() => {
        if (!chat.userInfo) {
            dispatch(chatPageActions.initialize());
        }
    }, [chat]);

    useEffect(() => {
        if (chat?.token) {
            console.log('token', chat.token);
            const socketClient = new WebSocketClient({
                url: `ws://${window.location.host}/ws`,
                query: {
                    token: chat.token
                },
                needConsoleLogging: true,
                reconnectTimeout: 500,
                onOpen: () => {
                    socketClient.send(JSON.stringify({
                        type: "userMessage",
                        message: "Hello Eugen",
                        receiver: {
                            name: "zheka",
                            phoneNumber: "+79687987002",
                            email: "zhenya.guziy@gmail.com"
                        }
                    }));
                },
                onMessage: (event) => {
                    console.log("ONMESSAGE");
                    console.log(event.data);
                }

            });
            socketClient.connect();
            websocketClient.current = socketClient;
        }
    }, [chat?.token]);

    console.log(chat);
    const selectedChatIndex = chat?.selectedChatIndex ?? 0;
    return (
        <div className="container">
            <Friends
                friends={chat?.userInfo?.friends}
                suggestFriends={chat?.suggestFriends}
                newFriendSearchQuery={chat?.newFriendSearchQuery ?? ''}
                changeNewFriendSearchQuery={(value) => dispatch(chatPageActions.changeNewFriendSearchQuery(value))}
                findNewFriends={() => dispatch(chatPageActions.findNewFriends())}
                showChatModalVisibility={() => dispatch(chatPageActions.showChatModalVisibility())}
            />
            <Channel selectedChat={chat?.userInfo?.chats?.length ? chat?.userInfo?.chats[selectedChatIndex] : null} />
            <UserProfile
                user={chat?.userInfo?.user}
                setAvatarFile={(file) => dispatch(chatPageActions.setAvatarFile(file))}
                uploadAvatar={() => dispatch(chatPageActions.uploadAvatar())}
                showUserPhotoModalVisibility={() => dispatch(chatPageActions.showUserPhotoModalVisibility())} />
            <CreateChatModal
                visible={chat?.createChatModalVisible}
                friends={chat?.userInfo?.friends}
                hideChatModalVisibility={() => dispatch(chatPageActions.hideChatModalVisibility())} />
            <UserPhotoModal
                visible={chat?.userPhotoModalVisible}
                avatarUri={chat?.userInfo?.user?.avatarUri}
                hideUserPhotoModalVisibility={() => dispatch(chatPageActions.hideUserPhotoModalVisibility())} />
        </div>
    )
}