import LoginPage from "./loginPage/loginPage";
import ChatPage from "./chatPage/chatPage";

const routes = [
    {
        path: "/",
        component: <LoginPage />
    },
    {
        path: "/chat",
        component: <ChatPage />
    }
];

export default routes;