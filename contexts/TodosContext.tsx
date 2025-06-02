import { createContext, useContext, useState } from "react";

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Städa", description: "Städa massa skräp", done: false },
    { id: "2", title: "Diska", description: "Diska massa disk", done: false },
    { id: "3", title: "Fiska", description: "Fiska massa fisk", done: false },
  ]);

  const markDone = (id: any) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    );
  };

  const deleteTodo = (id: any) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = (newTodo: any) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleDone = (id: any) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <TodosContext.Provider
      value={{ todos, markDone, deleteTodo, addTodo, toggleDone }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
