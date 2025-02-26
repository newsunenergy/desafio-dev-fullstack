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
  formData?: IClient,
  loading: boolean;
  id: string;
}

export interface IConsumptionHistory {
  id: string;
  consumoForaPontaEmKWH: number;
  mesDoConsumo: string;
  unidadeId: string;
}

export interface IConsumerUnit {
  id: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  clientId: string;
  historicoDeConsumoEmKWH: IConsumptionHistory[];
}

export interface IClient {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  unidades?: IConsumerUnit[];
}

