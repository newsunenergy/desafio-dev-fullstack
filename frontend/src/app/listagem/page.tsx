import LeadList from "@/components/lead-list";
import SearchInput from "@/components/search-input";
import React from "react";

const ListagemPage = ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams;

  return (
    <div className="mt-24">
      <SearchInput />
      <LeadList filter={q} />
    </div>
  );
};

export default ListagemPage;
