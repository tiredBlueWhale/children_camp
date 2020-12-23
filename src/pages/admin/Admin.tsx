import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonRow,
  IonButtons,
  IonAlert,
  //LifeCycle
  useIonViewWillEnter
} from '@ionic/react';
import { person, cart, restaurant, add, clipboard, logOut } from 'ionicons/icons';
import { IAdminButton } from '../../models/button.model';

const buttons: IAdminButton[] = [
  { url: '/user/', icon: person, id: '12' },
  { url: '/shopping', icon: cart },
  { url: '/food', icon: restaurant },
  { url: '/tasks', icon: clipboard },
]

const Admin = function (props: any) {
  const [logout, setLogout] = useState(false);
  const [activity, setActivity] = useState(false);

  useIonViewWillEnter(() => {
    setContentWidth();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => setLogout(!logout)}>
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow id="ion_row_admin" className="ion-justify-content-start ion-wrap">
          {buttons.map((button, index) => {
            return (
              <IonButton
                key={index}
                className="button_grid"
                onClick={() => { props.history.push(props.match.path + button.url + (button.id ?? '')); }}>
                <IonIcon slot="icon-only" icon={button.icon}></IonIcon>
              </IonButton>
            )
          })}
          <IonButton
            key="add_activity"
            className="button_grid"
            onClick={() => { setActivity(!activity) }}>
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>
        </IonRow>
        <IonAlert
          isOpen={logout}
          onDidDismiss={() => setLogout(!logout)}
          header={'Logout'}
          subHeader={'Are you sure?'}
          buttons={[
            'Cancel',
            {
              text: 'Ok',
              cssClass: 'warning',
              handler: () => {
                props.history.push('/login')
              }
            }
          ]} />
        <IonAlert
          isOpen={activity}
          onDidDismiss={(e) => {
            setActivity(!activity);
            let title = e.detail.data.values.activityTitle;
            if (!e.detail.role && title) props.history.push('/admin/activity/' + title);
          }}
          header={'Create Activity'}
          subHeader={'Are you sure?'}
          inputs={[
            {
              name: 'activityTitle',
              type: 'text',
              placeholder: 'Activity Name '
            },
          ]}
          buttons={['Cancel', 'Ok']} /> 
      </IonContent>
    </IonPage>
  );
};

// UI

/* Set margin-left -> so ion_row_admin is in center || Button width = 160px*/
function setContentWidth() {
  let row_admin = document.getElementById("ion_row_admin");
  let content = row_admin?.parentElement;
  if (row_admin && content) row_admin.style.marginLeft = content.clientWidth % 160 / 2 + 'px';
}


export default Admin;
