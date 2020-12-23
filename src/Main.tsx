import React, { useContext } from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { scan, list, apps, logOut, settings } from 'ionicons/icons';

import { Route, Redirect, useLocation } from 'react-router';
import { AppContext } from './State';
// Pages
import Scanner from './pages/Scanner';
import KidList from './pages/KidList';
import UserDetail from './pages/UserDetail';
import Admin from './pages/admin/Admin';
import Shopping from './pages/admin/Shopping';
import PageNotFound from './pages/PageNotFound';
import Food from './pages/admin/Food';
import Task from './pages/admin/Task';
import Settings from './pages/Settings';
// Components
import GuardedRoute from './auth/GuardedRoute';


const Main = () => {
    const { state } = useContext(AppContext);
    // const location = useLocation()

    return (
        <IonTabs className={state.ui.mobile ? "" : "tabs_mobile"}>
            <IonRouterOutlet>
                <GuardedRoute path="/app/scanner" component={Scanner} exact={true} />
                {/* <Route path="/kids" render={props => <KidList {...props} />} exact={true} /> */}
                <GuardedRoute path="/app/kids" component={KidList} exact={true} />
                <GuardedRoute path="/app/kids/:id" component={UserDetail} />
                <GuardedRoute path="/app/admin" component={Admin} exact={true} />
                <GuardedRoute path="/app/admin/user/:id" component={UserDetail} />
                <GuardedRoute path="/app/admin/shopping" component={Shopping} />
                <GuardedRoute path="/app/admin/food" component={Food} />
                <GuardedRoute path="/app/admin/tasks" component={Task} />
                <GuardedRoute path="/app/settings" component={Settings} />
                <Route path="/app" render={() => <Redirect to="/app/kids" />} exact={true} />
                <GuardedRoute component={PageNotFound} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="scanner" href="/app/scanner">
                    <IonIcon icon={scan} />
                    <IonLabel>Scanner</IonLabel>
                </IonTabButton>
                <IonTabButton tab="kids" href="/app/kids">
                    <IonIcon icon={list} />
                    <IonLabel>Kids</IonLabel>
                </IonTabButton>
                <IonTabButton tab="admin" href="/app/admin">
                    <IonIcon icon={apps} />
                    <IonLabel>Admin</IonLabel>
                </IonTabButton>
                {!state.ui.mobile && <IonTabButton tab="settings" href="/app/settings">
                    <IonIcon icon={settings} />
                    <IonLabel>Settings</IonLabel>
                </IonTabButton>}
                {!state.ui.mobile && <IonTabButton tab="logout" onClick={() => { console.log('Logout') }}>
                    <IonIcon icon={logOut} />
                    <IonLabel>Logout</IonLabel>
                </IonTabButton>}
                <IonButton>
                    <IonIcon icon={logOut} />
                    <IonLabel>Logout</IonLabel>
                </IonButton>
            </IonTabBar>
        </IonTabs>)
}

export default Main;

