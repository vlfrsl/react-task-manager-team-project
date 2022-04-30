import React from "react";
import Login from "../components/login";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import UserService from "../services/UserService";
import resultLoginMock from "./mock/login";
import resultLoginFailMock from "./mock/login_fail_400";


const getUserServiceDataMock = jest.spyOn(UserService, "login");

beforeEach(() => {
    getUserServiceDataMock.mockClear();
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Test Login component", () => {

    it("should render login component", () => {
        const component = shallow(<Login/>);
        expect(toJson(component)).toMatchSnapshot();
    });

    it("login component sends data to services", async () => {

        getUserServiceDataMock.mockReturnValueOnce(Promise.resolve(resultLoginMock));
        const component = shallow(<Login/>);
        await component
            .find("form")
            .simulate("submit", {
                preventDefault() {
                }
            });

        expect(getUserServiceDataMock).toHaveBeenCalledTimes(1);

    });

    it("login component displays error when fails", async () => {

        getUserServiceDataMock.mockReturnValueOnce(Promise.resolve(resultLoginFailMock));

        const component = shallow(<Login/>);
        await component
            .find("form")
            .simulate("submit", {
                preventDefault() {
                }
            });

        expect(getUserServiceDataMock).toHaveBeenCalledTimes(1);

        const errorList = component.find(".errors-list");
        expect(errorList.children.length).toBe(resultLoginFailMock.data[0].messages.length);
        expect(errorList.childAt(0).text()).toContain(resultLoginFailMock.data[0].messages[0].message);

    });


});
