import BaseService from "./BaseService";

class StatusService extends BaseService {

    async getStatuses() {
        return await this.get(`statuses`);
    }
}

export default new StatusService();
