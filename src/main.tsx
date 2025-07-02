import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalContext from "./lib/GlobalContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalContext>
    <Toaster/>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode>, */}
  </GlobalContext>
);
