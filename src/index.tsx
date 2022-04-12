import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root") as HTMLDivElement;

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
