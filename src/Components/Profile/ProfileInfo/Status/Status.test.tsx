import React from "react";
import {create, ReactTestInstance} from "react-test-renderer";
import {Status} from "./Status";

describe("Status component", () => {
    test("status in Status should be correct", () => {
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={() => {
        }}/>);
        const instance = component.getInstance();
        if (instance)
            expect(instance.props.status).toBe("MaBoyyy");
    });
    test("<span> should be displayed", () => {
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={() => {
        }}/>);
        const instance = component.root;

        const span = instance.findByType('span')
        expect(span).toBeDefined();
    });
    test("<span> should be displayed with correct status", () => {
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={() => {
        }}/>);
        const instance = component.root;

        const span = instance.findByType('span')
        expect(span.children[0]).toBe("MaBoyyy");
    });
    test("<span> should be changed with <input> after double click", () => {
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={() => {
        }}/>);
        const instance = component.root;
        const span = instance.findByType('span')
        span.props.onDoubleClick()
        const input = instance.findByType('input')
        expect(input.props.value).toBe("MaBoyyy");
    });
    test(" <input> shouldn't be defined", () => {
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={() => {}}/>);
        const instance = component.root;
        expect(() => {
            const input = instance.findByType('input')
        }).toThrow();
    });
    test("Status's callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<Status status={"MaBoyyy"} updateStatusThunk={mockCallback}/>);
        const instance = component.getInstance() as ReactTestInstance & {activateViewMode: () => void}
        instance.activateViewMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    });

});