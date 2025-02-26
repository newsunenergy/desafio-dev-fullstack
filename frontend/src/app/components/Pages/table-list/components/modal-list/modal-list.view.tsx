import React from "react";
import { IModalListParams, ModalListProps } from "./modal-list.interface";
import { ModalListParams } from "./modal-list.params";
import { ScrollModalComponent } from "@/app/components/scroll-modal";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ModalListView: React.FC<ModalListProps> = (props) => {
  const { isOpen, onClose } = props;
  const { formData, loading }: IModalListParams = ModalListParams(props);

  return (
    <ScrollModalComponent isOpen={isOpen} handleClose={onClose} title={"Visualização de dados"}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <Typography variant="h6">Dados do Cliente</Typography>
            <Typography><strong>Nome:</strong> {formData?.nome}</Typography>
            <Typography><strong>Email:</strong> {formData?.email}</Typography>
            <Typography><strong>Telefone:</strong> {formData?.telefone}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>Unidades</Typography>
            {formData?.unidades && formData?.unidades.map((unidade, index) => (
              <Accordion key={unidade.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Unidade {index + 1}: {unidade.codigoDaUnidadeConsumidora}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Modelo Fásico:</strong> {unidade.modeloFasico}</Typography>
                  <Typography><strong>Enquadramento:</strong> {unidade.enquadramento}</Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>Histórico de Consumo</Typography>
                  {unidade.historicoDeConsumoEmKWH.map((historico) => (
                    <Box key={historico.id} sx={{ mb: 1 }}>
                      <Typography><strong>Mês do Consumo:</strong> {new Date(historico.mesDoConsumo).toLocaleDateString()}</Typography>
                      <Typography><strong>Consumo Fora Ponta (kWh):</strong> {historico.consumoForaPontaEmKWH}</Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>
    </ScrollModalComponent>
  );
};
