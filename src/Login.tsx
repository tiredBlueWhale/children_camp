import React, { useContext, useRef, useState } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonLoading } from '@ionic/react';
import { AppContext, loggedIn } from './State';
import Auth from './auth/auth'
import { useHistory } from 'react-router';
// import { testDB } from './db/db-setup';

const Login = () => {

    // const { state, setState } = useContext(AppContext);
    let history = useHistory();

    // testDB()

    const { setState } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    let form: { [key: string]: string } = { name: '', password: '' };

    const formRef = useRef(null);

    const inputChange = (event: any) => {
        const id = event.target.id //as String;
        const value = event.target.value;
        form[id] = value;
    }

    const submit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await Auth.login(form.name, form.password);
            if (user) {
                // Auth.userInfo(form.name);
                setState(loggedIn(user));
                history.replace("/app");
            } else {
                history.replace("/login");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonLoading isOpen={loading} message="Logging in..." onDidDismiss={() => setLoading(false)} />
                <div slot="fixed" style={{ display: 'flex', flexDirection: 'column', top: 0, bottom: 0, left: 0, right: 0 }} className='ion-justify-content-center ion-align-items-center'>
                    <h1>
                        Login Ponde
                    </h1>
                    <form onSubmit={submit} ref={formRef}>
                        <IonItem>
                            <IonLabel position="floating">User Name</IonLabel>
                            {/* <IonInput id="name" value={form.name} onIonChange={e => inputChange(e)} required> */}
                            <IonInput id="name" value={form.name} onIonChange={e => inputChange(e)}>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            {/* <IonInput type="password" id="password" value={form.password} onIonChange={e => inputChange(e)} minlength="5" required> */}
                            <IonInput type="password" id="password" value={form.password} onIonChange={e => inputChange(e)}>
                            </IonInput>
                        </IonItem>
                        <IonButton type="submit" style={{ width: '300px', marginTop: '30px' }}>
                            Login
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage >
    )
}

export default Login;