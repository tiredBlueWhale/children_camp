import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';


const PageNotFound = function () {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Page Not Found</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonTitle slot="fixed" className="title_page_not_found ion-text-center">
                    <h1>Sorry, this page does not exist!</h1>
                    <p><a href="/scanner">Scanner</a> <a href="/kids">Kids</a> <a href="/admin">Admin</a></p>
                </IonTitle>
            </IonContent>
        </IonPage>
    )
}

export default PageNotFound;