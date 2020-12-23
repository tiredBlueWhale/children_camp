import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import { ToolBarTitleDetail } from '../../components/Toolbar';

// const selectOptions: IToolbarSelect[] = [
//     { value: 'bought', title: 'Bought' },
//     { value: 'new', title: 'New' },
//     { value: 'old', title: 'Old' },
// ]

const Task = () => {

    return (
        <IonModal
            isOpen
            swipe-to-close>
            <IonHeader>
                <ToolBarTitleDetail title="Task" href="/app/admin" />
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {/* TODO: Delete only yourself || Admin role */}
                    <IonItem>
                        <IonLabel>
                            aogwihgwe
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonModal>
    )
}

export default Task;