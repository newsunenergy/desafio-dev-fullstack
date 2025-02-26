import { ICliente } from "../modal-list/modal-list.interface";
import { HeadCell } from "../../../../Table/material-table/material-table.interface";
import { NOT_AVAILABLE } from "../../table-list.constants";

export const cellsTableList: HeadCell[] = [
  {
    id: "nome",
    numeric: false,
    label: "Cliente",
  },
  {
    id: "telefone",
    numeric: false,
    label: "Telefone",
  },
  {
    id: "email",
    numeric: false,
    label: "E-mail",
  },
  {
    id: "unidadeConsumidora",
    numeric: false,
    label: "Unidade Consumidora",
  },
  {
    id: "modeloFasico",
    numeric: false,
    label: "modelo Fasico",
  },

];

function createListData(client: ICliente) {
  return {
    id: client.id,
    nome: client.nome || NOT_AVAILABLE,
    telefone: client.telefone || NOT_AVAILABLE,
    email: client.email || NOT_AVAILABLE,
    unidadeConsumidora: client.unidades[0].codigoDaUnidadeConsumidora || NOT_AVAILABLE,
    modeloFasico: client.unidades[0].modeloFasico || NOT_AVAILABLE
  };
}

export function renderRowsList(lists: ICliente[]) {
  return lists.map((list) => createListData(list));
}
