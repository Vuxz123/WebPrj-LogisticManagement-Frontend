import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-universal-hooks"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css"
import {Staff} from "./staff";
import App from "./user/App"

const router = createBrowserRouter([
    {
        path: "/staff",
        element: <Staff/>,
    },
    {
        path: "/",
        element: <App/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
