import React from "react";
import CreateTaskView from '../View/CreateTaskView';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Create Task', () => {
    test('Render Create Task Component', () => {
        let props = {
            "taskDetails": [
                {
                    "index": 0.9777250691653807,
                    "name": "w",
                    "taskDetails": "e",
                    "status": "Not Started",
                    "dueDate": ""
                }
            ]
        }

        const { container, getAllByRole } = render(<CreateTaskView {...props} />)

        const textboxs = getAllByRole('textbox')
        expect(textboxs).toHaveLength(2)

        const comboboxs = getAllByRole('combobox')
        expect(comboboxs).toHaveLength(1)

        const buttons = getAllByRole('button')
        expect(buttons).toHaveLength(1)

    });

    test('Render Create Task Component', () => {
        const add = jest.fn();
        let props = {
            "taskDetails": [
                {
                    "index": 0.9777250691653807,
                    "name": "w",
                    "taskDetails": "e",
                    "status": "Not Started",
                    "dueDate": ""
                }
            ],
            'add':add
        }

        const { container, getAllByRole, getByRole } = render(<CreateTaskView {...props} />) 

        const buttons = getAllByRole('button')
        expect(buttons).toHaveLength(1)

        fireEvent.click(getByRole('button'))
        expect(props.add).toHaveBeenCalledTimes(1)

    });
})