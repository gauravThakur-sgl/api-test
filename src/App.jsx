import "./App.css";
import { Fetch } from "./Fetch";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./Routes/Root";
import Error from "./Error";
import { Axios } from "./Axios";

// import { Swr } from "./Swr";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "fetch",
          element: <Fetch />
        },
        {
          path: "axios",
          element: <Axios />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
