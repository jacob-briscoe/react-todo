import React from "react";
import "./App.css";

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

const FilterToDos = props => {
  return (
    <div>
      <input
        type="checkbox"
        id="showComplete"
        checked={props.showComplete}
        onChange={props.handleCompleteFilter}
      ></input>
      <label htmlFor="showComplete">Show Complete</label>
    </div>
  );
};

const ToDosList = props => {
  const items = props.items.map(item => (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.complete}
        onChange={event =>
          props.handleToDoCompletion(item.id, event.target.checked)
        }
      ></input>
      {item.description}
    </li>
  ));

  return <ol>{items}</ol>;
};

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
