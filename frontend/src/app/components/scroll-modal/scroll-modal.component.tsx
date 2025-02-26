import React from 'react';
import { IScrollModalComponentProps } from "./scroll-modal.interface";
import { ScrollModalView } from "./scroll-modal.view";

export const ScrollModalComponent: React.FC<IScrollModalComponentProps> = (props: IScrollModalComponentProps) => {

    return (
        <ScrollModalView {...props}></ScrollModalView>
    )
}