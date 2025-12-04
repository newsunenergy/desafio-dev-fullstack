import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Home as HomeIcon, FileText, List } from "lucide-react";
import { Home } from "../pages/Home";
import LeadForm from "../pages/Simulate";
import LeadsListPage from "../pages/Listing";
import LeadDetailsPage from "../pages/LeadDetailsPage";

export const routes = {
  home: { path: "/" },
  simulate: { path: "/simular" },
  listing: { path: "/listagem" },
  leadDetails: { path: "/listagem/:id" },
};

export const menuItems = [
  {
    title: "Início",
    path: "/",
    icon: <HomeIcon size={22} />,
  },
  {
    title: "Simulação",
    path: "/simular",
    icon: <FileText size={22} />,
  },
  {
    title: "Listagem",
    path: "/listagem",
    icon: <List size={22} />,
  },
];

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.simulate.path} element={<LeadForm />} />
          <Route path={routes.listing.path} element={<LeadsListPage />} />
        </Route>

        <Route path={routes.leadDetails.path} element={<LeadDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
