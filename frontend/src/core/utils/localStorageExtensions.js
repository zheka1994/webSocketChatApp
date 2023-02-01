export function saveToLocalStorage(key, value) {
    if (key && value) {
        window.localStorage.setItem(key, value);
    }
}

export function restoreFromLocalStorage(key) {
    if (key) {
        return window.localStorage.getItem(key);
    }
}