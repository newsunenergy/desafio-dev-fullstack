import {
  createBrowserRouter
} from "react-router-dom";
import { SimularPage } from "./pages/simular/page";
import { ListagemPage } from "./pages/listagem/page";

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

]);