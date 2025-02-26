import React from 'react';
import { IMaterialSnackbarComponentProps } from "./material-snackbar.interface";
import { MaterialSnackbarView } from "./material-snackbar.view";

export const MaterialSnackbarComponent: React.FC<IMaterialSnackbarComponentProps> = (props: IMaterialSnackbarComponentProps) => {

    return (
        <MaterialSnackbarView {...props}></MaterialSnackbarView>
    )
}