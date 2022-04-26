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
}