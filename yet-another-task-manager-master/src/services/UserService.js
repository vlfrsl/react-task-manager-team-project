import BaseService from "./BaseService";

class UserService extends BaseService {

    async register(data) {
        return this.post(`auth/local/register`, data, false);
    }

    async login(data) {
        return this.post(`auth/local`, data, false);
    }
}

export default new UserService();