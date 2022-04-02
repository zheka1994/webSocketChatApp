import axios from "axios";

export default class Api {
    constructor(settings) {
        this.apiEndpoint = settings.apiEndpoint;
    }
    
    async get(url, options) {
       const result = await axios.get(url, options = {});
       return result.data;
    }
    
    async post(url, data, options) {
       const result = await axios.post(url, data, options = {});
       return result.data;
    }
}