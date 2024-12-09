import { Lead } from './lead';
import { NomeCompleto } from './lead-nome-completo';

describe('Lead', () => {
  it('should be able to create a lead', () => {
    const lead = new Lead({
      nomeCompleto: new NomeCompleto('Leandro Rodrigues'),
      email: 'leandro.rodrigues00@hotmail.com',
      telefone: '11999999999',
    });

    expect(lead).toBeTruthy();
  });
});
