import React from 'react';
import { ITableHeadComponentProps } from "./table-head.interface";
import { TableHeadView } from "./table-head.view";

export const TableHeadComponent: React.FC<ITableHeadComponentProps> = (props: ITableHeadComponentProps) => {

    return (
        <TableHeadView {...props}></TableHeadView>
    )
}