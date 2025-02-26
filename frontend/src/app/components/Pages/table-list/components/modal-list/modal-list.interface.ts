/* eslint-disable @typescript-eslint/no-empty-object-type */
import { HTMLAttributes } from "react";

export interface ModalListProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export type ModalListComponentProps = ModalListProps &
  HTMLAttributes<ModalListProps>;

export interface IModalListParams {
  formData?: ICliente,
  loading: boolean;
  id: string;
}

export interface IHistoricoConsumo {
  id: string;
  consumoForaPontaEmKWH: number;
  mesDoConsumo: string;
  unidadeId: string;
}

export interface IUnidadeConsumidora {
  id: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  clientId: string;
  historicoDeConsumoEmKWH: IHistoricoConsumo[];
}

export interface ICliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  unidades: IUnidadeConsumidora[];
}

