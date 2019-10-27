import React from "react";
import FilterToDos from "./FilterToDos";

class ToDoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: ""
    };

    this.handleTodoInputChange = this.handleTodoInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTodoInputChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: "" });
    event.preventDefault();
  }

  render() {
    const showComplete = this.props.showComplete;
    const handleCompleteFilter = this.props.handleCompleteFilter;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="TODO..."
            value={this.state.todo}
            onChange={this.handleTodoInputChange}
          ></input>
          <button type="submit">Create</button>
        </form>
        <FilterToDos
          handleCompleteFilter={handleCompleteFilter}
          showComplete={showComplete}
        />
      </div>
    );
  }
}

export default ToDoInput;
