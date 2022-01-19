import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStatistic from "./components/TodoStatistic";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "./components/CustomStyle.css";
import { useEffect, useState, createContext } from "react";

function App() {
  const [todoDatas, setTodoDatas] = useState(JSON.parse(localStorage.getItem('todolist-tit')) || []);

  useEffect(() => {
    console.log("App re-render......");
  }, [todoDatas]);

  return (
      <div className="App">
        BảoIT's todolist
        <TodoForm props={{todoDatas, setTodoDatas}} />
        <TodoList props={{todoDatas, setTodoDatas}} />
        <TodoStatistic props={{todoDatas, setTodoDatas}} />
      </div>
  );
}

export default App;
