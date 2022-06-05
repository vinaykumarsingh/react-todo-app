import React from "react";
import ListDetailsView from "../View/ListDetailsView";
import { useSelector, shallowEqual } from "react-redux";
import { useLocation } from 'react-router';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { completeTaskAction, DNDListsAction } from '../../../../Common/Redux/Actions/ListAction'

const ListDetailsController = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();
    let id = location.pathname.substr(1)
    let list = useSelector(state => state.listReducer, shallowEqual).lists.filter(list => {
        return list.id === Number(id)
    })
    const listToRender = Object.assign({}, list[0])

    listToRender.taskDetails.map((task, id) => {
        let givenDate1 = new Date(task.dueDate)
        let diff = new Date().getTime() - givenDate1.getTime();
        const days = diff / (24 * 60 * 60 * 1000);
        if (task.status === 'Completed') {
            task.bgColor = 'green'
        } else if (days > 0 && days <= 1) {
            task.bgColor = 'yellow'
        }
        else if (days > 1) {
            task.bgColor = 'red'
        } else {
            task.bgColor = ''
        }
    })

    if (!listToRender.isDND) {
        listToRender.taskDetails.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
        })
    }



    const handleCompleteTask = (id) => {
        dispatch(completeTaskAction(id));
    }

    const handleDragDrop = (result) => {
        console.log(result);
        if (!result.destination) return; //if no destination exits(cancel event), exit this function
        const [reorderedItem] = listToRender.taskDetails.splice(result.source.index, 1);
        listToRender.taskDetails.splice(result.destination.index, 0, reorderedItem);
        dispatch(DNDListsAction(list));

    }
    const redirectHomePage = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <ListDetailsView list={listToRender} completeTask={handleCompleteTask} handleDND={handleDragDrop} redirectHome={redirectHomePage} />
    )
}
export default ListDetailsController