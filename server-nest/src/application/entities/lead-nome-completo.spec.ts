import { NomeCompleto } from './lead-nome-completo';

describe('Lead full name', () => {
  it('should be able to create a lead full name', () => {
    const nomeCompleto = new NomeCompleto('Leandro Rodrigues');

    expect(nomeCompleto).toBeTruthy();
  });

  it('should not be able to create a lead full name whit less than 2 words', () => {
    expect(() => new NomeCompleto('Leandro')).toThrow();
  });

  it('should not be able to create a lead full name with numbers', () => {
    expect(() => new NomeCompleto('a12 123')).toThrow();
  });
});
