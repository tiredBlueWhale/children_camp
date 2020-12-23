import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonModal,
    IonItem,
    IonLabel,
    IonHeader,
} from '@ionic/react';
// import { IKid } from './../models/index';
import { useParams } from 'react-router';
import { ToolBarTitleDetail } from '../components/Toolbar';
import { IKid, ISupervisor } from '../models';

const UserDetail = (props: any) => {
    const [user, setUser] = useState<IKid | ISupervisor>();

    // eslint-disable-next-line
    let { id }: any = useParams();

    useEffect(() => {
        setUser(props.location.data);
    }, [props.location])

    return (
        <IonModal
            isOpen
            swipe-to-close>
            <IonHeader>
                <ToolBarTitleDetail title={user?.name} />
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel>
                        {user?.name}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        {user?.address}
                    </IonLabel>
                </IonItem>
            </IonContent>
        </IonModal >
    );
};

export default UserDetail;