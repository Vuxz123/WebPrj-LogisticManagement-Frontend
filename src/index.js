import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-universal-hooks"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Staff} from "./staff";

const router = createBrowserRouter([
    {
        path: "/staff",
        element: <Staff/>,
    },
    {
        path: "/",
        element: <div>Home</div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
