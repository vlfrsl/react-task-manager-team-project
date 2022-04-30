import React from "react";
import Modal from "../components/modal";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import TaskService from "../services/TaskService";
import createCardMockData from "./mock/createCard";
import createCardMockFail from "./mock/createCard_fail_400";
import updateCard from "./mock/updateCard";
import StatusService from "../services/StatusService";

import statuses from "./mock/statuses";


const createCardMock = jest.spyOn(TaskService, "createCard");
const updateCardMock = jest.spyOn(TaskService, "updateCard");
const listStatusMock = jest.spyOn(StatusService, "getStatuses");

beforeEach(() => {
    createCardMock.mockClear();
    updateCardMock.mockClear();
    listStatusMock.mockClear();

    listStatusMock.mockReturnValueOnce(Promise.resolve(statuses));
});

describe("Test Modal component", () => {
    it("should render modal component", () => {
        const component = shallow(<Modal/>);
        expect(toJson(component)).toMatchSnapshot();
    });

    it("modal component sends data to services", async () => {
        createCardMock.mockReturnValueOnce(Promise.resolve(createCardMockData));

        const component = shallow(<Modal currentTask={{}}/>);
        await component
            .find("form button[type='submit']")
            .simulate("click", {
                preventDefault() {
                }
            });

        expect(createCardMock).toHaveBeenCalledTimes(1);
    });

    it("modal component displays error when fails", async () => {
        createCardMock.mockReturnValueOnce(Promise.resolve(createCardMockFail));

        const component = shallow(<Modal currentTask={{}}/>);
        await component
            .find("form button[type='submit']")
            .simulate("click", {
                preventDefault() {
                }
            });

        expect(createCardMock).toHaveBeenCalledTimes(1);

        const errorList = component.find(".errors-list");
        expect(errorList.children.length).toBe(createCardMockFail.data.errors.title.length);
        expect(errorList.childAt(0).text()).toContain(createCardMockFail.data.errors.title[0]);
    });

    it("modal component put and update data to services", async () => {
        updateCardMock.mockReturnValueOnce(Promise.resolve(updateCard));

        const component = shallow(<Modal currentTask={
            {
                id: 12,
                title: "React",
                description: "Hello"
            }}
        />);
        await component
            .find("form button[type='submit']")
            .simulate("click", {
                preventDefault() {
                }
            });

        expect(updateCardMock).toHaveBeenCalledTimes(1);
    });


    it("modal component closed on button clicked", async () => {
        const setActiveMock = jest.fn();

        const component = shallow(<Modal currentTask={{}} setActive={setActiveMock} />);
        await component
            .find(".close")
            .simulate("click", {
                preventDefault() {}
            });

        await component
            .find(".btn-secondary")
            .simulate("click", {
                preventDefault() {}
            });

        await component
            .find(".fade")
            .simulate("click", {
                preventDefault() {}
            });

        expect(setActiveMock).toHaveBeenCalledWith(false);
        expect(setActiveMock).toHaveBeenCalledTimes(3);
    });
});
