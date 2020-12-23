import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Camera from '../components/Camera';
import { filterKid, scanDoc, useDB } from '../db/db';

const activites = ['asf', 'asd', 'sadfa'];

const Scanner = () => {
  const [showPopover, setShowPopover] = useState<any>({ open: false, event: undefined });
  const [activeButton, setactiveButton] = useState<number>(0);
  const [activity, setActivity] = useState<any>('asf');
  const [qrCode, setQRCode] = useState<string|undefined>(undefined);

  const [data, setDBFilterState, setOperation] = useDB('kids', filterKid());

  const buttonClick = (button: number) => {
    setactiveButton(button);
  }

  useEffect(() => {
    console.log(qrCode);
    if (qrCode && +qrCode > 0 && +qrCode < 500) {
      setOperation(scanDoc(qrCode, activeButton));
    }
  }, [qrCode])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{qrCode ?? 'No QRCode'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="no_scroll">
        {/* <IonToolbar slot="fixed">
          <h1 style={{ textAlign: 'center' }}>{qrCode}</h1>
        </IonToolbar> */}
        { /* TODO::Ionic Segment? https://ionicframework.com/docs/api/segment*/}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
          <Camera setQRCode={setQRCode} />
        </div>
        
        <IonRow slot="fixed" className="ion-justify-content-center" style={{ bottom: '30px', left: '0', right: '0' }}>
          <IonButton className="button_scan" color={activeButton === 0 ? "danger" : "medium"} onClick={() => buttonClick(0)}>
            OUT
          </IonButton>
          <IonButton className="button_scan" color={activeButton === 1 ? "success" : "medium"} onClick={() => buttonClick(1)}>
            IN
          </IonButton>
          <IonButton className="button_scan" color={activeButton === 2 ? "primary" : "medium"}
            onClick={(e) => {
              buttonClick(2);
              setShowPopover({ open: true, event: e.nativeEvent })
            }}>
            {activity}
          </IonButton>
          <IonPopover
            isOpen={showPopover.open}
            event={showPopover.event}
            onDidDismiss={e => setShowPopover({ open: false, event: undefined })}>
            <IonList>
              {activites.map((activity, index) =>
                <IonItem
                  key={index}
                  button
                  onClick={(e) => {
                    setActivity(activity)
                    setShowPopover({ open: false, event: undefined })
                  }}>
                  <IonLabel>{activity}</IonLabel>
                </IonItem>)}
            </IonList>
          </IonPopover>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
