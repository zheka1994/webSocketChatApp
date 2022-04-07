export function buildAuthRequest(loginState) {
    const {name, phoneNumber, email, password} = loginState;
    return {
        name,
        phoneNumber,
        email,
        password
    };
}

export function buildRegisterRequest(loginState) {
    const {name, password} = loginState;
    return {
        name,
        password
    };
}