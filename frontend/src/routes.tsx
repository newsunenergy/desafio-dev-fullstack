import { Route, Routes as RoutesDOM } from "react-router-dom";
import Home from "./pages/Home";
import Simulate from "./pages/Simulate";

export function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/simular" element={<Simulate />} />
    </RoutesDOM>
  );
}