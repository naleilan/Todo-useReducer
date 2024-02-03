import React, { useEffect, useReducer, useState } from "react";
import Todo from "./Todo";

export const ACTIONS = {
  TODO_ADD: "add",
  TODO_COMPLETE: "done",
  TODO_DELETE: "delete",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.TODO_ADD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TODO_COMPLETE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.TODO_DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: crypto.randomUUID(), name: name, complete: false };
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todos"));
  //   if (storedTodos) {
  //     dispatch({ type: ACTIONS.TODO_ADD, payload: { name: storedTodos } });
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.TODO_ADD, payload: { name: name } });
    setName("");
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add Todo"
        />
      </form>
      {todos.map((todo) => {
        return <Todo todo={todo} key={todo.id} dispatch={dispatch} />;
      })}
    </div>
  );
}
