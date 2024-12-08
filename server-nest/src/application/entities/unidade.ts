import { randomUUID } from 'crypto';
import { Lead } from './lead';

export interface UnidadeProps {
  codigoDaUnidadeConsumidora: string;
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';
  leadId?: string;
  lead?: Lead;
}

export class Unidade {
  private _id: string;
  private props: UnidadeProps;

  constructor(props: UnidadeProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get codigoDaUnidadeConsumidora(): string {
    return this.props.codigoDaUnidadeConsumidora;
  }

  public set codigoDaUnidadeConsumidora(codigo: string) {
    this.props.codigoDaUnidadeConsumidora = codigo;
  }

  public get modeloFasico(): 'monofasico' | 'bifasico' | 'trifasico' {
    return this.props.modeloFasico;
  }

  public set modeloFasico(modelo: 'monofasico' | 'bifasico' | 'trifasico') {
    this.props.modeloFasico = modelo;
  }

  public get enquadramento(): 'AX' | 'B1' | 'B2' | 'B3' {
    return this.props.enquadramento;
  }

  public set enquadramento(enquadramento: 'AX' | 'B1' | 'B2' | 'B3') {
    this.props.enquadramento = enquadramento;
  }

  public get leadId(): string | undefined {
    return this.props.leadId;
  }

  public set leadId(leadId: string | undefined) {
    this.props.leadId = leadId;
  }
}
