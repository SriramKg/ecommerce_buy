import {useNavigate} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import "./styles.css";
import "./App.css";
import { useSelector } from "react-redux";

function App() {

  return (
      <AppRouter />
  );
}

export default App;
