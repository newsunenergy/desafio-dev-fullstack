'use client'

import { useEffect, useState } from 'react'

interface Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: string
  enquadramento: string
}

interface Lead {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
  createdAt: string
  unidades: Unidade[]
}

export default function Listagem() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/leads')
      .then(res => res.json())
      .then(data => setLeads(data))
  }, [])

  const leadsFiltrados = leads.filter(lead =>
    lead.nomeCompleto.toLowerCase().includes(filtro.toLowerCase()) ||
    lead.email.toLowerCase().includes(filtro.toLowerCase()) ||
    lead.unidades.some(u => u.codigoDaUnidadeConsumidora.includes(filtro))
  )

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Minhas Simulações</h2>

      <input
        type="text"
        placeholder="Buscar por nome, e-mail ou código da UC..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="w-full max-w-2xl mx-auto px-6 py-3 border rounded-lg text-lg"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leadsFiltrados.map(lead => (
          <div key={lead.id} className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-bold text-xl">{lead.nomeCompleto}</h3>
            <p className="text-gray-600">{lead.email}</p>
            <p className="text-gray-600">{lead.telefone}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <div className="mt-4">
              <p className="font-medium text-sm">Unidades ({lead.unidades.length})</p>
              {lead.unidades.map(u => (
                <div key={u.id} className="text-xs bg-gray-100 p-2 rounded mt-1">
                  {u.codigoDaUnidadeConsumidora} • {u.enquadramento} • {u.modeloFasico}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {leadsFiltrados.length === 0 && (
        <p className="text-center text-gray-500 text-xl">Nenhuma simulação encontrada</p>
      )}
    </div>
  )
}