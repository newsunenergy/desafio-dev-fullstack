import { createLead } from "@/actions/form";
import MainForm from "@/components/main-form";
import React from "react";

const SimularPage = () => {
  return (
    <div className="grid place-content-center mt-24">
      <MainForm formAction={createLead} />
    </div>
  );
};

export default SimularPage;
