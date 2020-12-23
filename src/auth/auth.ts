import { ISupervisor, PlatformUser, User } from "../models";

const Auth = {
    login: async (name: string, password: string): Promise<any> => {
        const url = 'http://localhost:5984/_session';
        const credentials = JSON.stringify({ "name": name, "password": password });
        return getRequest(url, 'POST', credentials)
            .then((res: User) => res.roles.includes('_admin') ? res : Auth.userInfo(name))
            .catch(error => console.error('ERROR LOGIN: ', error))
    },
    userInfo: async (name: string): Promise<PlatformUser | undefined> => {
        const url = `http://localhost:5984/_users/org.couchdb.user:${name}`;
        return getRequest(url, 'GET')
    },
}

function getRequest<T>(url: string, method: string, credentials?: string): Promise<User | PlatformUser> {
    let header = new Headers();
    header.set("Content-Type", "application/json");
    return fetch(url, {
        method: method,
        headers: header,
        body: credentials,
        redirect: 'follow',
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(error => {
            console.error('ERROR', error.url, error)
            return error;
        })
}

export default Auth;


// export const TestUser: ISupervisor = { name: 'TestUser', superviseGroup: 4 }