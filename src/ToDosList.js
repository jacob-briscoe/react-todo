import React from "react";

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

export default ToDosList;
