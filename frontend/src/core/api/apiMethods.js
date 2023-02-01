import Api from './api';

export default class ApiMethods {
    constructor() {
        this.apiEndpoint = `${window.location.protocol}//${window.location.host}/api/v1`;
        this.api = new Api({
            apiEndpoint: this.apiEndpoint
        });
    }
    
    async auth(request) {
        const url = this.apiEndpoint + '/user/auth';
        return await this.api.post(url, request);
    }
    
    async oAuth(request) {
        const url = this.apiEndpoint + '/user/oauth';
        return await this.api.post(url, request);
    }
    
    async register(request) {
        const url = this.apiEndpoint + '/user/register';
        return await this.api.post(url, request);
    }

    async getUserInfo(token) {
        const url = this.apiEndpoint + '/user/info';
        return await this.api.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async findNewFriends(token, query) {
        query = encodeURIComponent(query);
        const url = this.apiEndpoint + '/user/friends/new' + `?q=${query}`;
        return await this.api.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    async uploadAvatar(token, data = {}) {
        const url = this.apiEndpoint + '/user/avatar';
        var formData = new FormData();
        formData.append('avatar', data);
        return await this.api.post(url, formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}