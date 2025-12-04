import React from 'react';
import { ModalListView } from './modal-list.view';
import { ModalListComponentProps } from './modal-list.interface';


export const ModalList: React.FC<ModalListComponentProps> = (props: ModalListComponentProps) => {

    return (
        <ModalListView {...props}></ModalListView>
    )
}