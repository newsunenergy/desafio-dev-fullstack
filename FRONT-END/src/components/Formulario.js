import React, { useState } from 'react';
import './Formulario.css';

const Formulario = ({ onSubmit }) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [codigoDaUnidadeConsumidora, setCodigoDaUnidadeConsumidora] = useState('');
  const [modeloFasico, setModeloFasico] = useState('monofasico');
  const [enquadramento, setEnquadramento] = useState('AX');
  const [historicoDeConsumoEmKWH, setHistoricoDeConsumoEmKWH] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosFormulario = {
      nomeCompleto,
      email,
      telefone,
      unidades: [
        {
          codigoDaUnidadeConsumidora,
          modeloFasico,
          enquadramento,
          historicoDeConsumoEmKWH: [
            { consumoForaPontaEmKWH: parseInt(historicoDeConsumoEmKWH), mesDoConsumo: '2022-12-01' },
          ],
        },
      ],
    };

    onSubmit(dadosFormulario);
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2 className="titulo">Formulário de Simulação</h2>

      <div className="input-container">
        <label className="label-titulo">Nome Completo:</label>
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          className="input-campo"
        />
      </div>

      <div className="input-container">
        <label className="label-titulo">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-campo"
        />
      </div>

      <div className="input-container">
        <label className="label-titulo">Telefone:</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="input-campo"
        />
      </div>

      <div className="input-container">
        <label className="label-titulo">Código da Unidade Consumidora:</label>
        <input
          type="text"
          value={codigoDaUnidadeConsumidora}
          onChange={(e) => setCodigoDaUnidadeConsumidora(e.target.value)}
          className="input-campo"
        />
      </div>

      <div className="input-container">
        <label className="label-titulo">Modelo Fásico:</label>
        <select
          value={modeloFasico}
          onChange={(e) => setModeloFasico(e.target.value)}
          className="input-campo"
        >
          <option value="monofasico">Monofásico</option>
          <option value="bifasico">Bifásico</option>
          <option value="trifasico">Trifásico</option>
        </select>
      </div>

      <div className="input-container">
        <label className="label-titulo">Enquadramento:</label>
        <select
          value={enquadramento}
          onChange={(e) => setEnquadramento(e.target.value)}
          className="input-campo"
        >
          <option value="AX">AX</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
        </select>
      </div>

      <div className="input-container">
        <label className="label-titulo">Histórico de Consumo (Fora de Ponta) em kWh:</label>
        <input
          type="number"
          value={historicoDeConsumoEmKWH}
          onChange={(e) => setHistoricoDeConsumoEmKWH(e.target.value)}
          className="input-campo"
        />
      </div>

      <button type="submit" className="botao-submeter">
        Submeter
      </button>
    </form>
  );
};

export default Formulario;
