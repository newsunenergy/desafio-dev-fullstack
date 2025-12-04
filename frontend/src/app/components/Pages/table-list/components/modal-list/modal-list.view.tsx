import React from "react";
import { IModalListParams, ModalListProps } from "./modal-list.interface";
import { ModalListParams } from "./modal-list.params";
import { ScrollModalComponent } from "@/app/components/scroll-modal";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatPhone } from "@/app/components/utils/formatter.utils";
import { NOT_AVAILABLE } from "../../table-list.constants";

export const ModalListView: React.FC<ModalListProps> = (props) => {
  const { isOpen, onClose } = props;
  const { formData, loading }: IModalListParams = ModalListParams(props);

  return (
    <ScrollModalComponent isOpen={isOpen} handleClose={onClose} title={"Dados do Cliente"}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <Typography><strong>Nome:</strong> {formData?.nome || NOT_AVAILABLE}</Typography>
            <Typography><strong>Email:</strong> {formData?.email || NOT_AVAILABLE}</Typography>
            <Typography><strong>Telefone:</strong> {formatPhone(formData?.telefone || NOT_AVAILABLE)}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>Unidades</Typography>
            {formData?.unidades && formData?.unidades.map((unidade, index) => (
              <Accordion key={unidade.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Unidade {index + 1}: {unidade.codigoDaUnidadeConsumidora}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Modelo Fásico:</strong> {unidade.modeloFasico}</Typography>
                  <Typography><strong>Enquadramento:</strong> {unidade.enquadramento}</Typography>
                  <Typography variant="h6" sx={{ mt: 2 }} className="text-center pb-2">Histórico de Consumo</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Mês do Consumo</strong></TableCell>
                          <TableCell><strong>Consumo Fora Ponta (kWh)</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {unidade.historicoDeConsumoEmKWH.map((historico) => (
                          <TableRow key={historico.id}>
                            <TableCell>{new Date(historico.mesDoConsumo).toLocaleDateString()}</TableCell>
                            <TableCell>{historico.consumoForaPontaEmKWH}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>
    </ScrollModalComponent>
  );
};