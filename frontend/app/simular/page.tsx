'use client';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function SimularPage() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const removerArquivo = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('nomeCompleto', nomeCompleto);
    formData.append('email', email);
    formData.append('telefone', telefone);
    files.forEach((file) => formData.append('faturas', file));

    try {
      const res = await fetch('http://localhost:3001/leads/simular', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage({ text: 'Simulação enviada com sucesso!', type: 'success' });
        setNomeCompleto('');
        setEmail('');
        setTelefone('');
        setFiles([]);
      } else {
        const erro = await res.text();
        setMessage({ text: erro || 'Erro ao enviar simulação', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erro de conexão com o backend', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Simulação de Compensação Energética
      </h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-white font-medium ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nome completo</label>
          <input
            type="text"
            required
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="João Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="joao@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Telefone</label>
          <input
            type="tel"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="(11) 98765-4321"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contas de energia (PDFs)</label>
          <div
            {...getRootProps()}
            className={`border-4 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-lg text-gray-600">
              {isDragActive ? 'Solte os arquivos aqui...' : 'Arraste suas contas de luz ou clique para selecionar'}
            </p>
            <p className="text-sm text-gray-500 mt-2">Apenas arquivos PDF</p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="font-medium">{files.length} arquivo(s) selecionado(s):</p>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removerArquivo(i)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || files.length === 0}
          className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 disabled:bg-gray-400 transition"
        >
          {loading ? 'Enviando simulação...' : 'Enviar Simulação'}
        </button>
      </form>
    </div>
  );
}