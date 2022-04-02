export function buildAuthRequest(loginState) {
    const {lastName, name, phoneNumber} = loginState;
    return {
        lastName,
        name,
        phoneNumber
    };
}

export function buildRegisterRequest(loginState) {
    const {lastName, name, phoneNumber} = loginState;
    return {
        lastName,
        name,
        phoneNumber
    };
}