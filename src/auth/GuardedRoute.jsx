/*
    Sources
    - https://reactrouter.com/web/example/auth-workflow
    - https://ui.dev/react-router-v4-protected-routes-authentication/
    - https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122
*/

import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AppContext } from '../State';

const GuardedRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AppContext);

    return (
        <Route {...rest} render={(props) => (
            state.auth.user
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    );
}

export default GuardedRoute;