/*
  Sources
  - https://ionicframework.com/blog/a-state-management-pattern-for-ionic-react-with-react-hooks/
  - https://stackblitz.com/edit/ionic-react-demo?file=State.jsx
*/

import React, { createContext, useReducer, useEffect } from "react";
import { isPlatform } from "@ionic/react"

const initialState = {
  auth: {
    user: null//process.env.NODE_ENV === 'production' ? undefined : TestUser
  },
  ui: {
    mobile: isPlatform("mobile"),
    ios: isPlatform("ios"),

  },
  setting: {
    edit: false,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

let reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE": {
      console.log('DARK MODE toogle', !state.setting.darkMode);
      return {
        ...state,
        setting: {
          ...state,
          darkMode: !state.setting.darkMode
        }
      }
    }
    case "SETTING_EDIT": {
      return {
        ...state,
        setting: {
          ...state.setting,
          edit: !state.setting.edit
        }
      }
    }
    case "LOGIN": {
      return {
        ...state,
        auth: {
          user: action.user
        }
      }
    }
    case "LOGOUT": {
      console.log('LOGOUT');
      clearLocalData();
      return {
        ...state,
        auth: {
          user: null
        }
      }
    }
    default: {
      console.error('Action Type not supported: ', action.type)
      return state;
    }
  }
};

const clearLocalData = async() => {
  window.localStorage.clear();
  //https://gist.github.com/rmehner/b9a41d9f659c9b1c3340
  const dbs = await window.indexedDB.databases()
  dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })
}

// eslint-disable-next-line
export const AppContext = createContext();


export function AppContextProvider(props) {
  const persistedState = JSON.parse(window.localStorage.getItem('persistedState'));
  const fullInitialState = {
    ...initialState,
    ...persistedState
  }

  let [state, setState] = useReducer(reducer, fullInitialState);
  let value = { state, setState };

  useEffect(() => {
    // Persist any state we want to
    const persistedState = JSON.stringify({
      auth: {
        // ...state.auth.
        user: state.auth.user
      }
    });
    window.localStorage.setItem('persistedState', persistedState)
  }, [state]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}

//export const AppContextConsumer = AppContext.Consumer;
// Same 
// export const changeEdit = { type: "changeEdit" };
export const darkMode = () => ({ type: "DARK_MODE" });
export const changeEdit = () => ({ type: "SETTING_EDIT" });
export const loggedIn = (user) => ({ type: "LOGIN", user });
export const loggedOut = () => ({ type: "LOGOUT" });