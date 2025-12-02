'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Simular() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('nomeCompleto', nome)
    formData.append('email', email)
    formData.append('telefone', telefone)
    files.forEach(file => formData.append('faturas', file))

    try {
      const res = await fetch('http://localhost:3001/leads/simular', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setSuccess(true)
        setFiles([])
        setNome('')
        setEmail('')
        setTelefone('')
      } else {
        alert('Erro ao enviar simulação')
      }
    } catch (err) {
      alert('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Faça sua simulação</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Simulação enviada com sucesso! Acesse a listagem para ver.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          placeholder="Telefone (com DDD)"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <p className="text-gray-600">
              Arraste suas contas de luz (PDF) aqui ou clique para selecionar
            </p>
          ) : (
            <div>
              <p className="font-medium">{files.length} arquivo(s) selecionado(s)</p>
              <ul className="mt-2">
                {files.map(file => (
                  <li key={file.name} className="text-sm text-gray-700">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || files.length === 0}
          className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 disabled:bg-gray-400 transition"
        >
          {loading ? 'Enviando...' : 'Enviar Simulação'}
        </button>
      </form>
    </div>
  )
}