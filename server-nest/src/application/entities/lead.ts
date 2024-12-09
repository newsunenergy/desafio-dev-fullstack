import { randomUUID } from 'node:crypto';
import { NomeCompleto } from './lead-nome-completo';
import { Unidade } from '@prisma/client';

export interface LeadProps {
  nomeCompleto: NomeCompleto;
  telefone: string;
  email: string;
  unidades?: Unidade[];
}

export class Lead {
  private _id: string;
  private props: LeadProps;

  constructor(props: LeadProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public set nomeCompleto(nomeCompleto: NomeCompleto) {
    this.props.nomeCompleto = nomeCompleto;
  }

  public get nomeCompleto(): NomeCompleto {
    return this.props.nomeCompleto;
  }

  public set telefone(telefone: string) {
    this.props.telefone = telefone;
  }

  public get telefone() {
    return this.props.telefone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email() {
    return this.props.email;
  }
}
