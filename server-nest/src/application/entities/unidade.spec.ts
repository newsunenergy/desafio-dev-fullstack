import { Unidade } from './unidade';

describe('Unidade', () => {
  it('should be able to create a unity', () => {
    const unidade = new Unidade({
      modeloFasico: 'trifasico',
      codigoDaUnidadeConsumidora: '0c7efef7-cbbe-46a1-9c0e-67b25ad27933',
      enquadramento: 'B3',
    });

    expect(unidade).toBeTruthy();
  });
});
