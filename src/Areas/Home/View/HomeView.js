import React from "react";
import { useNavigate } from "react-router-dom";

const HomeView = ({ lists }) => {
    let navigate = useNavigate();


    const listOnClickhandle = (listId) => {
        let path = "/" + listId;
        navigate(path);
    }

    const itemsToRender = lists.map(list => {
        return (
            <div onClick={() => listOnClickhandle(list.id)} className="listContainer u-hover--sparkle">

                <p>{list.listTitle}</p>
                {
                    <ul className="taskContainerHome">
                        {
                            list.taskDetails.map(task => {
                                return (
                                    <li key={task.index.toString()}>
                                        <span>{task.name}</span>
                                        <span>{task.status}</span>

                                    </li>
                                )
                            })}
                    </ul>
                }
            </div>
        )
    })
    return (
        <React.Fragment>
            {lists.length ? itemsToRender : "Nothing is here yet, Please Create your ToDo lists "}
        </React.Fragment>
    )
}

export default HomeView