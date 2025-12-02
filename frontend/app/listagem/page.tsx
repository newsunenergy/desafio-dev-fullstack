'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  createdAt: string;
  unidades: { codigoDaUnidadeConsumidora: string }[];
}

export default function ListagemPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/leads?filtro=${filtro}`)
      .then(res => res.json())
      .then(setLeads);
  }, [filtro]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Listagem de Simulações</h1>
      <input
        type="text"
        placeholder="Filtrar por nome, email ou código UC"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />
      <div className="grid gap-4">
        {leads.map(lead => (
          <div key={lead.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold">{lead.nomeCompleto}</h2>
            <p>{lead.email} - {lead.telefone}</p>
            <p className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
            <div>Unidades: {lead.unidades.map(u => u.codigoDaUnidadeConsumidora).join(', ')}</div>
          </div>
        ))}
      </div>
      {leads.length === 0 && <p className="text-center">Nenhuma simulação encontrada.</p>}
    </div>
  );
}