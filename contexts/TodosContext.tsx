import { createContext, useContext, useState } from "react";

const TodosContext = createContext(null);

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Städa", description: "Städa beskrivning", done: false },
    { id: "2", title: "Diska", description: "Diska beskrivning", done: false },
  ]);

  const markDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <TodosContext.Provider value={{ todos, markDone, deleteTodo, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
