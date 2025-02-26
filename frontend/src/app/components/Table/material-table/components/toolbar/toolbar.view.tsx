import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IToolbarComponentProps, IToolbarParams } from "./toolbar.interface";
import { ToolbarParams } from "./toolbar.params";

export const ToolbarView: React.FC<IToolbarComponentProps> = (
  props: IToolbarComponentProps
) => {
  const params: IToolbarParams = ToolbarParams(props);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "flex-end",
        ...(props.numSelected > 0 && {
        }),
      }}
    >
      {props.numSelected > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {props.numSelected} Selecionados
          </Typography>
          <Tooltip title="Deletar">
            <IconButton onClick={props.onDeleteSelected}>
              {props.removeIconDelete ? (
                ""
              ) : (
                <MdDelete size={24} />
              )}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {props.title ? props.title : ""}
          </Typography>
          <Tooltip title="Adicionar">
            {props.link ? (
              <div>
                {props.removeIconAdd ? (
                  ""
                ) : (
                  <Link href={`${props.link}/create`}>
                    <IconButton>
                      {<FaPlus />}
                    </IconButton>
                  </Link>
                )}
              </div>
            ) : (
              <div>
                {props.removeIconAdd ? (
                  ""
                ) : (
                  <IconButton onClick={() => props.setIsModalOpen(true)}>
                    <FaPlus />
                  </IconButton>
                )}
              </div>
            )}
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};
