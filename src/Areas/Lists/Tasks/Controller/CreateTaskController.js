import React from "react";
import CreateTaskView from "../View/CreateTaskView";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setListsAction } from "../../../../Common/Redux/Actions/ListAction"
import { Navigate } from "react-router-dom"


class CreateTaskController extends React.Component {
  state = {
    id: '',
    taskDetails: [
      {
        index: Math.random(),
        name: "",
        taskDetails: "",
        status: "",
        dueDate: ""
      }
    ],
    listTitle: '',
    redirect: false,
    isFormValid: true,
    invaidFormField: ''
  };

  handleChange = e => {
    if (
      ["name", "taskDetails", "status", "dueDate"].includes(
        e.target.name
      )
    ) {
      let taskDetails = [...this.state.taskDetails];
      taskDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = (e) => {
    const { isFormValid } = this.state;
    let isValid = true

    e.preventDefault();
    const { listTitle, taskDetails } = this.state;
    if (!listTitle.length > 0) {
      isValid = false;
      this.setState(
        {
          isFormValid: false,
          invaidFormField: 'List Title'
        }
      )
      return false;
    }
    taskDetails.forEach(task => {
      for (const entity in task) {
        console.log(entity)
        if (!task[entity]) {
          isValid = false
          this.setState(
            {
              isFormValid: false,
              invaidFormField: entity
            }
          )
          return false
        }
      }
    })

    if (isValid) {
      this.setState({ ['id']: Math.random() }, () => this.props.setListsAction(this.state));
      this.setState(
        { redirect: true }
      )
    }

  }

  addNewRow = e => {
    this.setState(prevState => ({
      taskDetails: [
        ...prevState.taskDetails,
        {
          index: Math.random(),
          name: "",
          taskDetails: "",
          status: "",
          dueDate: ""
        }
      ]
    }));
  };

  deteteRow = index => {
    this.setState({
      taskDetails: this.state.taskDetails.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      taskDetails: this.state.taskDetails.filter(r => r !== record)
    });
  }

  render() {
    let { taskDetails, listTitle, isFormValid, invaidFormField } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1" />
            <div className="col-sm-10">
              <h2 className="text-center"> Create Your TODO</h2>
              <div className="container toDoFormContainer">
                <div className="row headerRow">
                  <div className="col">
                    <label>List Title</label>
                  </div>

                </div>
                <div className="row">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control required"
                      placeholder="List Title"
                      name="listTitle"
                      id={listTitle}
                    />
                  </div>
                </div><br />
                <div className="row headerRow">
                  <div className="col">
                    <label>Task Title</label>
                  </div>
                  <div className="col-4">
                    <label>Task Details</label>
                  </div>
                  <div className="col">
                    <label>Task Status</label>
                  </div>
                  <div className="col">
                    <label>Due Date</label>
                  </div>
                  <div className="col">
                    <label>Action</label>
                  </div>

                </div>
                <div className="row">
                  <CreateTaskView
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    taskDetails={taskDetails}
                  />
                </div>
              </div><br />
              {!isFormValid && <div className="errorContainer">
                {invaidFormField} is req field
              </div>} <br />
              <div>
                <button
                  type="submit"
                  className="btn btn-primary text-center"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
        {this.state.redirect && <Navigate to='/' replace={true} />}
      </div>
    );
  }
}
const mapDispatchToPrps = dispatch =>
  bindActionCreators(
    { setListsAction },
    dispatch
  );

export default connect(null, mapDispatchToPrps)(CreateTaskController);
