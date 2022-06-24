import React from 'react';
import ListDetailsView from "../View/ListDetailsView";
import * as reactRedux from 'react-redux';
import ListDetailsController from "../Controller/ListDetailsController";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe("ListDetailsView works", () => {
    test('render ListDetail View component', () => {
        const list = {
            "id": 1,
            "listTitle": "Team 1",
            "taskDetails": [
                {
                    "dueDate": "2021-10-20",
                    "index": 0.4653066358719222,
                    "name": "Attend annual apprisal meeting",
                    "status": "Completed",
                    "taskDetails": "Attend annual apprisal meeting and send the updated report",
                    "backgroundColor": "green",
                    "bgColor": "green"
                }
            ],
            "isDND": true
        }

        const { getAllByRole, getByText } = render(<ListDetailsView list={list} />)
        expect(getByText('Team 1')).toBeInTheDocument();
        expect(getByText('Expired')).toBeInTheDocument();
        expect(getByText('Expiring Today')).toBeInTheDocument();
        expect(getAllByRole('list')).toHaveLength(2)
        expect(getAllByRole('listitem')).toHaveLength(5)
        expect(getByText('Home')).toBeInTheDocument();
    })

    test('Home Button click on the component', async () => {
        const list = {
            "id": 1,
            "listTitle": "Team 1",
            "taskDetails": [
                {
                    "dueDate": "2021-10-20",
                    "index": 0.4653066358719222,
                    "name": "Attend annual apprisal meeting",
                    "status": "Completed",
                    "taskDetails": "Attend annual apprisal meeting and send the updated report",
                    "backgroundColor": "green",
                    "bgColor": "green"
                }
            ],
            "isDND": true
        }
        const redirectHome = jest.fn();
        const { getAllByRole, getByText } = render(<ListDetailsView list={list} redirectHome={redirectHome} />)
        expect(getByText('Home')).toBeInTheDocument();
        fireEvent.click(getByText('Home'))
        await waitFor(() => {
            expect(redirectHome).toBeCalledTimes(1);
        });
    })

    test('Complete Button click on the Component', async () => {
        const list = {
            "id": 0.3783657097783595,
            "taskDetails": [
                {
                    "index": 0.8849852316391573,
                    "name": "Task title 31",
                    "taskDetails": "Task 1 Details",
                    "status": "Not Started",
                    "dueDate": "2022-06-30",
                    "bgColor": ""
                }
            ],
            "listTitle": "tesk titletesk titletesk titletesk titletesk titletesk titletesk titletesk titletesk title",
            "redirect": true,
            "isFormValid": true,
            "invaidFormField": ""
        }
        const completeTask = jest.fn();
        const { getAllByRole, getByText } = render(<ListDetailsView list={list} completeTask={completeTask} />)
        expect(getByText('Complete')).toBeInTheDocument();
        fireEvent.click(getByText('Complete'))
        await waitFor(() => {
            expect(completeTask).toBeCalledTimes(1);
        });
    })

})