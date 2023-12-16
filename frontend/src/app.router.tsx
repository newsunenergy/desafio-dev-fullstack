import {
  createBrowserRouter
} from "react-router-dom";
import { SimularPage } from "./pages/simular/page";
import { ListagemPage } from "./pages/listagem/page";
import { Home } from "./pages/home/page";

export const router = createBrowserRouter([
  {
    path: "/simular",
    element: 
      <SimularPage/>
  },
  {
    path: "/listagem",
    element: 
      <ListagemPage/>
  },
  {
    path: "/",
    element: 
      <Home/>
  },

]);