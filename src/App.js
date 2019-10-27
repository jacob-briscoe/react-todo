import React from "react";
import ToDoInput from "./ToDoInput";
import ToDosList from "./ToDosList";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      showComplete: false
    };

    this.createToDo = this.createToDo.bind(this);
    this.handleCompleteFilter = this.handleCompleteFilter.bind(this);
    this.handleToDoCompletion = this.handleToDoCompletion.bind(this);
  }

  createToDo(todo) {
    const todos = this.state.todos;

    this.setState({
      todos: todos.concat([
        { id: todos.length, description: todo, complete: false }
      ])
    });
  }

  handleCompleteFilter(event) {
    this.setState({ showComplete: event.target.checked });
  }

  handleToDoCompletion(todoId, isComplete) {
    const todos = this.state.todos;

    this.setState({
      todos: todos.map(item => {
        if (item.id === todoId) item.complete = isComplete;

        return item;
      })
    });
  }

  render() {
    const todos = this.state.todos
      .filter(item => (this.state.showComplete ? true : !item.complete))
      .reverse();
    const showComplete = this.state.showComplete;

    return (
      <div className="App">
        <ToDoInput
          addTodo={this.createToDo}
          handleCompleteFilter={this.handleCompleteFilter}
          showComplete={showComplete}
        />
        <ToDosList
          items={todos}
          handleToDoCompletion={this.handleToDoCompletion}
        />
      </div>
    );
  }
}

export default App;
