import React from 'react';
import {
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon
} from '@ionic/react';
// import { useHistory } from 'react-router';

export const ToolBarTitleDetail = (props: { title: string | undefined, href?: string }) => {
    return (
        <IonToolbar>
            <ToolBarBackButton href={props.href} />
            <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
    );
}

export const ToolBarBackButton = (props: { href?: string }) => (
    <IonButtons slot="start">
        <IonBackButton defaultHref={props.href ?? "/app"} />
    </IonButtons>
)

export const ToolbarSearch = (props: { searchInput: string, setSearchText: any }) => {
    return (
        <IonSearchbar slot="start"
            value={props.searchInput}
            onIonChange={e => props.setSearchText(e.detail.value)}>
        </IonSearchbar>
    );
}

export interface IToolbarSelect {
    value: string,
    title: string
}

export const ToolbarSelect = (props: { select: string, setSelect: any, options: IToolbarSelect[] }) => {
    return (
        <IonSelect slot="end" interface="popover" interfaceOptions={{ cssClass: 'select_popover' }} value={props.select} onIonChange={e => props.setSelect(e.detail.value)}>
            {props.options.map((option, index) => <IonSelectOption key={index} value={option.value}>{option.title}</IonSelectOption>)}
        </IonSelect>
    )
}

export enum EnumSort {
    group = 'group',
    asc = 'asc',
    dec = 'dec'
}

// export const getToolbarSelectDefault = () => {
//     return ToolbarSelect({sort: 'asc', sort: 'dec'});
// }

// export const ToolbarButton = (props) => {
//     return (
//         <IonButton
//             color={state.setting.edit ? "primary" : "medium"}
//             onClick={() => props.dispatch({ type: 'setEdit', edit: !state.setting.edit })}>
//             <IonIcon slot="icon-only" icon={options} />
//         </IonButton>
//     )
// }