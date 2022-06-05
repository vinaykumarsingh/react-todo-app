import React from "react";
import { Link } from "react-router-dom";

const HomeView = ({ lists }) => {
    console.log(lists);

    const itemsToRender = lists.map(list => {
        return (
            <Link to={"/" + list.id}>
                <div className="listContainer u-hover--sparkle">

                    <p>{list.listTitle}</p>
                    {
                        <ul className="taskContainerHome">
                            {
                                list.taskDetails.map(task => {
                                    return (
                                        <li>
                                            <span>{task.name}</span>
                                            <span>{task.status}</span>

                                        </li>
                                    )
                                })}
                        </ul>
                    }
                </div>
            </Link>
        )
    })
    return (
        <React.Fragment>
            {lists.length ? itemsToRender : "Nothing is here yet, Please Create your ToDo lists "}
        </React.Fragment>
    )
}

export default HomeView