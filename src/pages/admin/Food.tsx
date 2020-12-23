import React from 'react';
import { IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import { ToolBarTitleDetail } from '../../components/Toolbar';

// const selectOptions: IToolbarSelect[] = [
//     { value: 'bought', title: 'Bought' },
//     { value: 'new', title: 'New' },
//     { value: 'old', title: 'Old' },
// ]

const Food = () => {

    return (
        <IonModal
            isOpen
            swipe-to-close>
            <IonHeader>
                <ToolBarTitleDetail title="Food" href="/app/admin" />
                <IonToolbar>
                    <IonRow>
                        {/* TODO: Autocomplete */}
                        <IonItem lines="none" style={{ flex: '1 1 0', margin: '0 8px' }}>
                            <IonInput placeholder="Name" >
                            </IonInput>
                        </IonItem>
                        <IonFabButton size="small"><IonIcon icon={add} /></IonFabButton>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {/* TODO: Delete only yourself || Admin role */}
                    <IonItem>
                        <IonLabel>
                            Hans Schubert der |||
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonModal>
    )
}

export default Food;