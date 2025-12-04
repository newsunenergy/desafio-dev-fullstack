import React from "react";
import { Pagination } from "@mui/material";
import { PaginationParams } from "./pagination.params";
import {
  IPaginationComponentProps,
  IPaginationParams,
} from "./pagination.interface";

export const PaginationView: React.FC<IPaginationComponentProps> = (
  props: IPaginationComponentProps
) => {
  const {  }: IPaginationParams = PaginationParams(props);

  return (
    <div
      className={`w-full flex flex-col lg:flex-row items-center justify-between ${props.className}`}
    >
      <div className="flex flex-col lg:flex-row items-center space-x-2">
        <p>
          Mostrando de{" "}
          {props.perPage * ((props.currentPage ? props.currentPage : 1) - 1)} a{" "}
          {props.perPage * props.currentPage < props.total
            ? props.perPage * props.currentPage
            : props.total}{" "}
          do total de {props.total} itens
        </p>
      </div>

      <div className="flex items-center">
        <Pagination
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#050505",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#050505",
              },
            },
          }}
          shape="rounded"
          size="large"
          siblingCount={2}
          page={props.currentPage}
          count={props.countPage}
          onChange={(e, page) => props.onChangeCurrentPage(page)}
        />
      </div>
    </div>
  );
};
