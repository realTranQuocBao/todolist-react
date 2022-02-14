import "./App.css";
import Todo from "./views/todo/Todo";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function App() {

  return (
      <div className="App">
        <Todo />
      </div>
  );
}

export default App;
