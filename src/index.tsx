import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://cryptic-lowlands-92637-eaf852f75524.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
