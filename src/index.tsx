import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProductDetailsProvider } from "./hooks/useProduct";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ProductDetailsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductDetailsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
