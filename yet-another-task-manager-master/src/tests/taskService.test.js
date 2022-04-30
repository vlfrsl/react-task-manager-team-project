import TaskService from "../services/TaskService";
import getCardsFromService from "./mock/getCardsFromService";
import updateCardFromService from "./mock/updateCardService";
import createTaskFromService from "./mock/createTaskFromService";
import deleteTaskFromService from "./mock/deleteTaskFromService";
import getCardFromService from "./mock/getCardFromService";

describe("test task services", () => {

    global.fetch = jest.fn((url, option) => {
        let result;
        switch (option.method){
            case "GET":
                !url.includes(123) ? result = getCardsFromService : result = getCardFromService;
                break;

            case "PUT":
                result = updateCardFromService;
                break;

            case "POST":
                result = createTaskFromService;
                break;

            case "DELETE":
                result = deleteTaskFromService;
                break;
        }

        return Promise.resolve({
            json: () => Promise.resolve(result),
        })
    });

    it("should return tasks card", async () => {
        const taskList = await TaskService.getCards();
        expect(taskList[0].title).toBe(getCardsFromService[0].title);
    });

    it("should return task card", async () => {
        const taskItem = await TaskService.getCard(123);
        expect(taskItem.title).toBe(getCardFromService.title);
    })

    it("should return update card", async () => {
        const updateTask = await TaskService.updateCard();
        expect(updateTask.title).toBe(updateCardFromService.title);
    });

    it("should return delete card", async () => {
        const deleteTask = await TaskService.deleteCard();
        expect(deleteTask.title).toBe(deleteTaskFromService.title);
    });

    it("should return create card", async () => {
        const createTask = await TaskService.createCard();
        expect(createTask.title).toContain(createTaskFromService.title);
    });
})