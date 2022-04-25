export function validateName(value) {
    return /[A-ZА-ЯЁ]$/ig.test(value);
}

export function validateEmail(value) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
}

export function validatePhoneNumber(value) {
    return /^(\+[1-9]{1}|[1-9]{1})\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/. test(value);
}

// Пароль должен содержать буквы, не должен начинаться с цифры, не должен содержать пробел и символы "-","(",")","/"
export function validatePassword(value) {
    const beginWithoutDigit = /^\D.*$/
    const withoutSpecialChars = /^[^-() /]*$/
    const containsLetters = /^.*[a-zA-Z]+.*$/

    return beginWithoutDigit.test(value) &&
        withoutSpecialChars.test(value) &&
        containsLetters.test(value);
    
}