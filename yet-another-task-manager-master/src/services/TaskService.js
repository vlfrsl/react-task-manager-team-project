import BaseService from "./BaseService";

class TaskService extends BaseService {
    async getCards() {
        return await this.get(`cards`);
    }

    async getCard(id) {
        return await this.get(`cards/${id}`);
    }

    async updateCard(id, data) {
        return await this.put(`cards/${id}`, data);
    }

    async createCard(data) {
        return await this.post(`cards/`, data);
    }

    async deleteCard(id) {
        return await this.delete(`cards/${id}`);
    }
}

export default new TaskService()