import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppContextProvider } from './State';

import Main from './Main';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Custom CSS */
import './styles/main.css';
import './styles/desktop.css';

/* Theme variables */
import './theme/variables.css';
import Login from './Login';
import GuardedRoute from './auth/GuardedRoute';

const App = function () {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/login' component={Login} exact={true} />
            <Route
              exact={true}
              path="/"
              render={() => <Redirect to="/app" />}
            />
          </IonRouterOutlet>
          <GuardedRoute path="/app" component={Main} />
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
};

export default App;
