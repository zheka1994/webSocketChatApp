export default class WebSocketClient {
    constructor(options) {
        this.options = options;
    }

    buildUrl = () => {
        if (!this.options.url) {
            throw Error("Необходимо задать url!");
        }

        let url = "";
        url += this.options.url;

        let query = this.options?.query;
        if (query && typeof query === "object") {
            let queryStr = "";
            const queryKeys = Object.keys(query);
            queryKeys.forEach((key, index) => {
                queryStr += `${key}=${query[key]}`;

                if (index < queryKeys.length - 1) {
                    queryStr += "&";
                }
            });
            url += `?${queryStr}`;
        }
        return url;
    }

    connect = () => {
        this.ws = new WebSocket(this.buildUrl());
        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
        this.ws.onmessage = this.onMessage;
    }

    reconnect = () => {
        setTimeout(() => {
            this.connect();
        }, this.options.reconnectTimeout || 1000);
    }

    onOpen = () => {
        if (this.options.needConsoleLogging) {
            console.log("open connection");
        }
        
        if (typeof this.options?.onOpen === "function") {
            this.options.onOpen();
        }
    }

    onMessage = (event) => {
        if (typeof this.options?.onMessage === "function") {
            this.options.onMessage(event);
        }
    }

    onError = (error) => {
        if (this.options.needConsoleLogging) {
            console.log(`Error ${error.message}`);
        }
        
        if (typeof this.options?.onError === "function") {
            this.options.onError(error);
        }
    }

    onClose = (event) => {
        if (typeof this.options?.onError === "function") {
            this.options.onError(error);
        }

        if (this.options.needConsoleLogging) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        }

        this.reconnect();

    }

    send = (data) => {
        this.ws.send(data);
    }
}