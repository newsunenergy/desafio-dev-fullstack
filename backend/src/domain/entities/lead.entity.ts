import { Unidade } from './unidade.entity';

export class Lead {
  constructor(
    public id: string,
    public nomeCompleto: string,
    public email: string,
    public telefone: string,
    public unidades: Unidade[],
  ) {}
}
