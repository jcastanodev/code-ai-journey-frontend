import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "../i18n";

import { router } from "./router";
import { saveState, store } from "./store/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

store.subscribe(() => saveState(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<ToastContainer />
		</Provider>
	</React.StrictMode>
);
