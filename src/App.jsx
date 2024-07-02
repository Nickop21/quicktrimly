import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import LinkPage from "./pages/LinkPage";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context/context";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
  );
}

export default App;
