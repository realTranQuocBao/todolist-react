import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStatistic from "./components/TodoStatistic";
import "./CustomStyle.css";
import { useEffect, useState } from "react";

function Todo() {
  const [todoDatas, setTodoDatas] = useState(JSON.parse(localStorage.getItem('todolist-tit')) || []);

  useEffect(() => {
    console.log("TodoApp re-render......");
  }, [todoDatas]);

  return (
      <>
        BảoIT's todolist
        <TodoForm props={{todoDatas, setTodoDatas}} />
        <TodoList props={{todoDatas, setTodoDatas}} />
        <TodoStatistic props={{todoDatas}} />
      </>
  );
}

export default Todo;
