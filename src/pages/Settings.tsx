import React, { useContext } from 'react';
import { IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonList, IonToolbar, IonPage, IonTitle, IonItemGroup, IonItemDivider, IonToggle } from '@ionic/react';
import { AppContext, darkMode } from '../State';

const Settings = () => {

    const { state, setState } = useContext(AppContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>
                                General
                            </IonLabel>
                        </IonItemDivider>
                        <IonItem>
                            <IonLabel>Check all out: </IonLabel>
                            <IonDatetime display-format="HH:mm" picker-format="h:mm" value="1990-02-19T20:00Z"></IonDatetime>
                        </IonItem>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>
                                Personal
                            </IonLabel>
                        </IonItemDivider>
                        <IonItem>
                            <IonLabel>Dark Mode</IonLabel>
                            <IonToggle color="primary" checked={state.setting.darkMode} onIonChange={(e) => {
                                setState(darkMode());
                                //TODO:: Dark Mode toggle
                                document.body.classList.toggle('dark', e.detail.checked);
                                // const color_schema = document.querySelector('meta[name="color-scheme"]');
                                // console.log(color_schema);
                                // // color_schema?.toggleAttribute('content', e.detail.checked);
                                // console.log(color_schema);
                                //  .setAttribute("content", _desc);
                                // document.getElementsByName('color-scheme').forEach(element => {
                                //     console.log(element);
                                //     element.toggleAttribute('dark', e.detail.checked)
                                // })
                                // document.getElementsByTagName('meta').toggle('dark', );
                                }}/>
                        </IonItem>
                    </IonItemGroup>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Settings;