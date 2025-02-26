/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Box from "@mui/material/Box";
import { FaEye } from "react-icons/fa";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { MdDelete } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { PiNotePencilFill } from "react-icons/pi";
import { ToolbarComponent } from "./components/toolbar";
import TableContainer from "@mui/material/TableContainer";
import { IconButton, TablePagination, Tooltip } from "@mui/material";
import { TableHeadComponent } from "./components/table-head";
import { MaterialTableParams } from "./material-table.params";

import {
  IMaterialTableComponentProps,
  IMaterialTableParams,
} from "./material-table.interface";
import Link from "next/link";

export const MaterialTableView: React.FC<IMaterialTableComponentProps> = (
  props: IMaterialTableComponentProps
) => {
  const {
    loading,
    selected,
    isSelected,
    closeModal,
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
  }: IMaterialTableParams = MaterialTableParams(props);

  const {
    rows,
    link,
    title,
    orderAsc,
    orderBy,
    cells,
    totalPages,
    currentPage,
    isModalOpen,
    removeToolBar,
    ModalComponent,
    setIsModalOpen,
    removeIconAdd,
    removeIconDelete,
    removeIconEdit,
    readOnly,
    addCollectionIcon,
    children,
    pagination = true,
  } = props;

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      margin: "0 auto",
    }}>
      <Paper sx={{ width: "100%", mb: 2 }} elevation={0}>
        {!removeToolBar ? (
          <>
            <ToolbarComponent
              title={title ? title : ""}
              numSelected={selected.length}
              setIsModalOpen={
                setIsModalOpen ? setIsModalOpen : () => { }
              }
              link={link ? link : ""}
              addCollectionIcon={addCollectionIcon}
              removeIconAdd={removeIconAdd}
              removeIconDelete={removeIconDelete}
              onDeleteSelected={handleDeleteSelected}
            />
          </>
        ) : (
          <div></div>
        )}

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}

          >
            <TableHeadComponent
              cells={cells ? cells : []}
              order={orderAsc}
              addCollectionIcon={addCollectionIcon}
              rowCount={0}
              orderBy={orderBy as string}
              numSelected={selected.length}
              activeToolBar={!removeToolBar}
              // onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={cells && cells.length + (!removeToolBar ? 1 : 0)} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <>
                <TableBody>
                  {rows?.length === 0 && children === undefined ? (
                    <TableRow>
                      <TableCell
                        colSpan={
                          cells
                            ? cells.length + (!removeToolBar ? 1 : 0)
                            : [].length + (!removeToolBar ? 2 : 1)
                        }
                        className="text-center"
                      >
                        <Box className="w-full">
                          <Box className=" text-xl">
                            <Box className="font-semibold text-center">
                              Nenhum dado encontrado
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : rows ? (
                    rows.map((row: any, index) => {
                      const isItemSelected = isSelected(String(row.id));
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, String(row.id))}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={`${row.id}${index}`}
                          selected={isItemSelected}
                        >
                          {!removeToolBar && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                onClick={(event) =>
                                  handleClick(event, String(row.id))
                                }
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                          )}

                          {cells &&
                            cells.map((cell, cellIndex) => (
                              <TableCell key={cellIndex} id={labelId} align={cell.numeric ? "right" : "left"}                              >
                                {row[cell.id]}
                              </TableCell>
                            ))}

                          <TableCell align="center">
                            {!removeIconDelete ? (
                              <Tooltip title="Deletar">
                                <IconButton
                                  onClick={() => handleDeleteIndividual(row.id)}
                                >
                                  <MdDelete size={24} />
                                </IconButton>
                              </Tooltip>
                            ) : null}

                            {!removeIconEdit ? (
                              <Tooltip
                                title={readOnly ? "Visualizar" : "Editar"}
                              >
                                {link ? (
                                  <Link
                                    href={{
                                      pathname: `${link}/edit/${row.id}`,
                                    }}
                                  >
                                    <IconButton>
                                      {readOnly ? (
                                        <FaEye size={24} />
                                      ) : (
                                        <PiNotePencilFill size={24} />
                                      )}
                                    </IconButton>
                                  </Link>
                                ) : (
                                  <IconButton
                                    onClick={() => handleUpdateSelected(row.id)}
                                  >
                                    {readOnly ? (
                                      <FaEye size={24} />
                                    ) : (
                                      <PiNotePencilFill size={24} />
                                    )}
                                  </IconButton>
                                )}
                              </Tooltip>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <>
                      {children}
                    </>
                  )}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>

        <div className="p-2 order-2">
          {pagination ? (
            <>
              <TablePagination
                component="div"
                count={totalPages * 5}
                page={currentPage - 1}
                onPageChange={(event, newPage) => props.setCurrentPage(newPage + 1)}
                rowsPerPage={5}
                rowsPerPageOptions={[]}
              />

            </>
          ) : (
            <></>
          )}
        </div>

        {isModalOpen &&
          (ModalComponent ? (
            <>
              <ModalComponent
                isOpen={isModalOpen}
                onClose={() => closeModal()}
                id={selected[0] ? selected[0] : selectedUpdate}
              />
            </>
          ) : (
            <></>
          ))}
      </Paper>
    </Box>
  );
};
