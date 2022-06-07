export function getUserNameAbbreviation(name) {
    if (!name) {
        return "";
    }
    return name.slice(0, 2);
}