import React from "react";
import { IHomeProps } from "./home.interface";
import { HomeParams } from "./home.params";
import { MaterialSnackbarComponent } from "../../material-snackbar";
import { Box, Button, DialogActions, TextField, Paper, Typography } from "@mui/material";

export const HomeView: React.FC<IHomeProps> = (props: IHomeProps) => {
  const params: any = HomeParams(props);


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", p: 3 }}>
      <MaterialSnackbarComponent
        open={params.open}
        message={params.message}
        setOpen={params.setOpen}
        severity={params.severity}
      />

      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2} color="primary">
          Novo Cadastro
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome"
            name="nome"
            value={params.formData.nome}
            onChange={params.handleChange}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="E-mail"
            name="email"
            type="email"
            value={params.formData.email}
            onChange={params.handleChange}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="Telefone"
            name="telefone"
            type="tel"
            value={params.formData.telefone}
            onChange={params.handleChange}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />

          <Button
            variant="contained"
            component="label"
            sx={{ textTransform: "none", borderRadius: 2, bgcolor: "#1976D2", color: "white" }}
          >
            Anexar PDF
            <input
              type="file"
              accept="application/pdf"
              hidden
              multiple
              onChange={params.handleFileChange}
            />
          </Button>

          {params.selectedFile?.length > 0 && (
            <Box>
              {params.selectedFile.map((file: File, index: number) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
              ))}
            </Box>
          )}

          <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={params.handleSubmit}
              sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
            >
              Enviar
            </Button>
          </DialogActions>
        </Box>
      </Paper>
    </Box>
  );
};
