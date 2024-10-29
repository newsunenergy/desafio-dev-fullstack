import { useEffect, useState } from "react";
import axios from "axios"; // Adjust the import path as necessary
import { Lead } from "../leadmodel";

const Listagem = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("http://localhost:3000/lead");
        setLeads(response.data as Lead[]);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Leads List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.nomeCompleto}</td>
              <td>{lead.email}</td>
              <td>{lead.telefone}</td>
              <td>
                {lead.unidades.map((unidade) => (
                  <div key={unidade.id}>
                    <p>Unidade ID: {unidade.id}</p>
                    <p>Código: {unidade.codigoDaUnidadeConsumidora}</p>
                    <p>Modelo Fásico: {unidade.modeloFasico}</p>
                    <p>Enquadramento: {unidade.enquadramento}</p>
                    <p>Histórico de Consumo:</p>
                    <ul>
                      {unidade.historicoDeConsumoEmKWH.map((consumo, index) => (
                        <li key={index}>
                          {consumo.mesDoConsumo.toLocaleDateString()}:{" "}
                          {consumo.consumoForaPontaEmKWH} kWh
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listagem;
