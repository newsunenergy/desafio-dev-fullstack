/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  IMaterialTableParams,
  IMaterialTableProps,
} from "./material-table.interface";

export const MaterialTableParams = (
  props: IMaterialTableProps
): IMaterialTableParams => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [selectedRemove, setSelectedRemove] = useState<string>("");
  const [selectedUpdate, setSelectedUpdate] = useState<string>("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    setLoading(props.loading ?? false);
  }, [props.loading]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = props.orderBy === property && props.orderAsc === "asc";
    props.setOrderAsc(isAsc ? "desc" : "asc");
    props.setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.rows && event.target.checked) {
      const newSelected = props.rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selected.length > 0) {
      setIsConfirmationModalOpen(true);
    }
  };

  const handleDeleteIndividual = (id: string) => {
    setIsConfirmationModalOpen(true);
    setSelectedRemove(id);
  };

  const handleUpdateSelected = (id: string) => {
    if (props.setIsModalOpen) {
      props.setIsModalOpen(true);
    }
    if(id){  
      setSelectedUpdate(id);
    }
  };

  const handleConfirmDelete = () => {
    if (selected) {
      selected.forEach((id) => {
        if (props.remove) {
          props.remove(id);
        }
      });
    }
    if (selectedRemove && props.remove) {
      props.remove(selectedRemove);
    }
    setSelected([]);
    setIsConfirmationModalOpen(false);
  };

  const closeModal = () => {
    if (props.setIsModalOpen) {
      props.setIsModalOpen(false);
    }
    setSelected([]);
    setSelectedUpdate("");
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };


  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return {
    loading,
    selected,
    closeModal,
    isSelected,
    handleClick,
    selectedUpdate,
    handleRequestSort,
    handleConfirmDelete,
    handleSelectAllClick,
    handleUpdateSelected,
    handleDeleteSelected,
    closeConfirmationModal,
    handleDeleteIndividual,
    isConfirmationModalOpen,
  };
};
