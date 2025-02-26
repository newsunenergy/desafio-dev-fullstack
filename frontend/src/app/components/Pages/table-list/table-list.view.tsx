/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ITableListProps } from "./table-list.interface";
import { HomeParams } from "./table-list.params";
import { MaterialTableComponent } from "../../Table/material-table";
import { cellsTableList } from "./components/render-table";
import { TextField, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { ModalList } from "./components/modal-list";

export const TableListView: React.FC<ITableListProps> = (props: ITableListProps) => {
  const params: any = HomeParams(props);


  return (
    <div className=" h-screen p-4 items-center">
      <Box className="items-center">
        <div className="md:flex max-md:mt-10 max-md:space-x-2 gap-4 mb-4 w-full justify-center p-4 ">
          <TextField
            label="Buscar cliente por nome, e-mail ou unidade consumidora..."
            variant="outlined"
            size="small"
            value={params.search}
            onChange={(e) => params.setSearch(e.target.value)}
            className="w-1/4"
          />

          <FormControl variant="outlined" size="small" className="w-1/6">
            <InputLabel>Filtrar por</InputLabel>
            <Select
              value={params.filter}
              onChange={(e) => params.setFilter(e.target.value)}
              label="Filtrar por"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="monofasico">Monofásico</MenuItem>
              <MenuItem value="bifasico">Bifásico</MenuItem>
              <MenuItem value="trifasico">Trifásico</MenuItem>
            </Select>
          </FormControl>
        </div>

        <MaterialTableComponent
          title=""
          rows={params.rows}
          orderAsc={params.orderAsc}
          loading={params.loading}
          setOrderBy={params.setOrderBy}
          totalPages={params.totalPages}
          orderBy={String(params.orderBy)}
          currentPage={params.currentPage}
          isModalOpen={params.isModalOpen}
          setOrderAsc={params.setOrderAsc}
          cells={cellsTableList}
          readOnly={true}
          removeIconAdd={true}
          removeIconDelete={true}
          removeToolBar={true}
          setIsModalOpen={params.setIsModalOpen}
          setCurrentPage={params.setCurrentPage}
          ModalComponent={ModalList}
        />
      </Box>
    </div>

  );
};
