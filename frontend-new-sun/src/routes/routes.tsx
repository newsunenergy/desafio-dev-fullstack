import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { SubmitSimulation } from "../pages/SubmitSimulation";
import { ListSimulations } from "../pages/ListSimulations";

export const router = createBrowserRouter([
  {
    path: '/simular',
    element: <SubmitSimulation />
  },
  {
    path: '/listagem',
    element: <ListSimulations />
  },
  {  path: '/', element: <Home /> }
])