"use client"
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Leads List</h1>
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome Completo</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Telefone</th>
            <th className="py-2 px-4 border-b">Unidades</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{lead.id}</td>
              <td className="py-2 px-4 border-b">{lead.nomeCompleto}</td>
              <td className="py-2 px-4 border-b">{lead.email}</td>
              <td className="py-2 px-4 border-b">{lead.telefone}</td>
              <td className="py-2 px-4 border-b">
                {lead.unidades.map((unidade) => (
                  <div key={unidade.id} className="mb-2">
                    <p>Unidade ID: {unidade.id}</p>
                    <p>Código: {unidade.codigoDaUnidadeConsumidora}</p>
                    <p>Modelo Fásico: {unidade.modeloFasico}</p>
                    <p>Enquadramento: {unidade.enquadramento}</p>
                    <p>Histórico de Consumo:</p>
                    <ul className="list-disc list-inside">
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
