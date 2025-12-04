/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  ITableHeadComponentProps,
  ITableHeadParams,
} from "./table-head.interface";
import { TableHeadParams } from "./table-head.params";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Checkbox,
  SortDirection,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

export const TableHeadView: React.FC<ITableHeadComponentProps> = (
  props: ITableHeadComponentProps
) => {
  const params: ITableHeadParams = TableHeadParams(props);

  return (
    <TableHead>
      <TableRow>
        {props.activeToolBar ? (
          <>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  props.numSelected > 0 && props.numSelected < props.rowCount
                }
                checked={
                  props.rowCount > 0 && props.numSelected === props.rowCount
                }
                onChange={props.onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
                className="dark:text-white"
              />
            </TableCell>
          </>
        ) : (
          <></>
        )}

        {props.cells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={
              props.orderBy === headCell.id
                ? (props.order as SortDirection)
                : false
            }
            className="dark:text-white"
          >
            <TableSortLabel
              active={props.orderBy === headCell.id}
              direction={
                props.orderBy === headCell.id
                  ? (props.order as "asc" | "desc" | undefined)
                  : "asc"
              }
              // onClick={params.createSortHandler(headCell.id)}
              className="dark:text-white"
            >
              {headCell.label}
              {props.orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {props.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {!props.addCollectionIcon ? (
          <TableCell className="text-center dark:text-white">
            <p>Ações</p>
          </TableCell>
        ) : (
          <></>
        )}
      </TableRow>
    </TableHead>
  );
};
