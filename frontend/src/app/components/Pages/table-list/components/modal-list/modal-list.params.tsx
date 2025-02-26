/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TableListPageService } from "../../table-list.service";
import { ICliente, IModalListParams, ModalListProps } from "./modal-list.interface";

export const ModalListParams = (props: ModalListProps): IModalListParams => {
  const { id } = props;

  const listService = new TableListPageService();

  const [formData, setFormData] = useState<ICliente | undefined>();
  const [loading, setLoading] = useState(false);

  const fethDataID = async () => {
    if (!id) return null;
    try {
      setLoading(true);
      const res = await listService.getClientById(id);

      setFormData(res)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fethDataID();
  }, [id])


  return {
    id,
    formData,
    loading
  };
};
