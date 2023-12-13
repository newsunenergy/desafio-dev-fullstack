// components/ListagemItemDetalhes.js
import React from 'react';
import ListagemItem from './ListagemItem';

const ListagemItemDetalhes = ({ simulacao }) => {
  return (
    <div>
      <ListagemItem simulacao={simulacao} />
    </div>
  );
};

export default ListagemItemDetalhes;
