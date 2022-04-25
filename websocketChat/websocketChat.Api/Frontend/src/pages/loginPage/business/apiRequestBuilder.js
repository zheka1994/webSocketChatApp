export function buildAuthRequest(loginState) {
    const { name, password } = loginState;
    return {
        name,
        password
    };
}

export function buildRegisterRequest(loginState) {
    const { name, phoneNumber, email, password } = loginState;

    return {
        name,
        phoneNumber,
        email,
        password
    };
}