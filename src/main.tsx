import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalContext from "./lib/GlobalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalContext>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode>, */}
  </GlobalContext>
);
