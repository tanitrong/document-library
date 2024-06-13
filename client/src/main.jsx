import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { SoketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={Store}>
    <SoketContextProvider>
      <App />
    </SoketContextProvider>
  </Provider>
  // </React.StrictMode>,
);
