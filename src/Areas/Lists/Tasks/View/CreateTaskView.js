import React from "react";

const CreateTaskView = props => {
    return props.taskDetails.map((val, idx) => {
        let name = `name-${idx}`,
            taskDetails = `taskDetails-${idx}`,
            dueDate = `dueDate-${idx}`,
            status = `status-${idx}`
            
        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Task Title"
                        name="name"
                        data-id={idx}
                        id={name}
                    />
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Task Details"
                        name="taskDetails"
                        id={taskDetails}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    <select className="form-control" name="status" id={status} data-id={idx}>
                        <option>Select</option>
                        <option>Not Started</option>
                    </select>
                </div>
                <div className="col">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Enter Date"
                        name="dueDate"
                        id={dueDate}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    {idx === 0 ? (
                        <button onClick={() => props.add()} type="button" className="btn btn-primary text-center"> Add </button>
                    ) : (
                        <button className="btn btn-danger" onClick={() => props.delete(val)}> Remove </button>
                    )}
                </div>
            </div>
        );
    });
};
export default CreateTaskView;
