import { Route, Routes as RoutesDOM } from "react-router-dom";
import Home from "./pages/Home";
import Simulate from "./pages/Simulate";
import Listing from "./pages/Listing";

export function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/simular" element={<Simulate />} />
      <Route path="/listagem" element={<Listing />} />
    </RoutesDOM>
  );
}