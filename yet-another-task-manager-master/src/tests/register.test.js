import React from "react";
import Register from "../components/register";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import UserService from "../services/UserService";
import registerMock from "./mock/register";
import registerFailMock from "./mock/register_fail_400";


const getUserServiceDataMock = jest.spyOn(UserService, "register");

beforeEach(() => {
    getUserServiceDataMock.mockClear();
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Test Register component", () => {

    it("should render register component", () => {
        const component = shallow(<Register/>);
        expect(toJson(component)).toMatchSnapshot();
    });

    it("register component sends data to services", async () => {

        getUserServiceDataMock.mockReturnValueOnce(Promise.resolve(registerMock));

        const component = shallow(<Register/>);
        await component
            .find("form")
            .simulate("submit", {
                preventDefault() {
                }
            });

        expect(getUserServiceDataMock).toHaveBeenCalledTimes(1);

    });

    it("register component displays error when fails", async () => {

        getUserServiceDataMock.mockReturnValueOnce(Promise.resolve(registerFailMock));

        const component = shallow(<Register/>);
        await component
            .find("form")
            .simulate("submit", {
                preventDefault() {
                }
            });

        expect(getUserServiceDataMock).toHaveBeenCalledTimes(1);

        const errorList = component.find(".errors-list");
        expect(errorList.children.length).toBe(registerFailMock.data[0].messages.length);
        expect(errorList.childAt(0).text()).toContain(registerFailMock.data[0].messages[0].message);

    });

    it("register component displays password errors", async () => {


        getUserServiceDataMock.mockReturnValueOnce(Promise.resolve(registerFailMock));

        const component = shallow(<Register/>);
        const input = component.find("input[name='password']");
        input.props();
        input.simulate('change', {
            preventDefault() {
            },
            target: {
                name: 'password',
                value: 'pass 123',
            }
        });

        await component
            .find("form")
            .simulate("submit", {
                preventDefault() {
                }
            });

        expect(getUserServiceDataMock).toHaveBeenCalledTimes(0);

        const errorList = component.find(".errors-list");
        expect(errorList.children.length).toBe(registerFailMock.data[0].messages.length);
        expect(errorList.childAt(0).text()).toContain("Error passwords not match");
    });
});
