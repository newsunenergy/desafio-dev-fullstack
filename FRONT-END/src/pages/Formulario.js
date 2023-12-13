import React from 'react';
import Formulario from '../components/Formulario';

const Simular = () => {
  const handleSubmit = (dadosFormulario) => {
    console.log('Enviando dados para o backend:', dadosFormulario);
  };

  return (
    <div>
      <h1>Simulação de Compensação Energética</h1>
      <Formulario onSubmit={handleSubmit} />
    </div>
  );
};

export default Simular;
