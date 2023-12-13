// ListagemItem.js
import React from 'react';
import './ListagemItem.css';

const ListagemItem = ({ simulacao }) => {
  return (
    <div className="simulacao-details">
      <table className="consumo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Unidade ID</th>
            <th>Código da Unidade Consumidora</th>
            <th>Modelo Fasico</th>
            <th>Enquadramento</th>
            <th>Mês do Consumo</th>
            <th>Consumo Fora de Ponta (KWH)</th>
          </tr>
        </thead>
        <tbody>
          {simulacao.unidades.map((unidade) => (
            unidade.historicoDeConsumoEmKWH.map((consumo) => (
              <tr key={`${unidade.id}_${consumo.mesDoConsumo}`}>
                <td>{simulacao.id}</td>
                <td>{simulacao.nomeCompleto}</td>
                <td>{simulacao.email}</td>
                <td>{simulacao.telefone}</td>
                <td>{unidade.id}</td>
                <td>{unidade.codigoDaUnidadeConsumidora}</td>
                <td>{unidade.modeloFasico}</td>
                <td>{unidade.enquadramento}</td>
                <td>{consumo.mesDoConsumo}</td>
                <td>{consumo.consumoForaPontaEmKWH}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemItem;
