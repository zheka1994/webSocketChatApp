export function getCurrentRoot() {
    return `${getProtocol()}//${getDomain()}`;
}

export function getProtocol() {
    return window.location.protocol;
}

export function getDomain() {
    return window.location.host;
}

export function getPath() {
    return window.location.pathname;
}

export function getQueryParamsObject() {
    const search = window.location.search;
    if (search) {
        const queryParams = {};
        search.replace('?', '')
            ?.split('&')
            ?.forEach(queryParam => {
                const splitedObj = queryParam?.split('=');
                if (splitedObj?.length) {
                    queryParams[`${splitedObj[0]}`] = splitedObj[1];
                }
            });
        return queryParams;
    }
    return null;
}