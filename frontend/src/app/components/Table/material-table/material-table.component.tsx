import React from 'react';
import { IMaterialTableComponentProps } from "./material-table.interface";
import { MaterialTableView } from "./material-table.view";

export const MaterialTableComponent: React.FC<IMaterialTableComponentProps> = (props: IMaterialTableComponentProps) => {

    return (
        <MaterialTableView {...props}></MaterialTableView>
    )
}