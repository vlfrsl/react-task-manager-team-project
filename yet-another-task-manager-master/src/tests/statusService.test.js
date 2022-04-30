import statusService from "../services/StatusService";
import statuses from "./mock/statuses";

describe("test status services", () => {
    global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => Promise.resolve(statuses),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("should return status list", async () => {
        const statusList = await statusService.getStatuses();
        expect(typeof statusList).toBe("object");
        expect(statusList[0].title).toBe(statuses[0].title);
    });
})