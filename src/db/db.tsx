import { useContext, useEffect, useRef, useState } from 'react';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import { AppContext, loggedOut } from '../State';
import { DBDocument, IKid } from '../models';

PouchDB.plugin(PouchdbFind);
const couchDBURL = 'http://localhost:5984/'

export const useDB = (urlDB: string, initFilter: any) => {
    const { state, setState } = useContext(AppContext);

    const [dbFilterState, setDBFilterState] = useState<any>(initFilter);
    // TODO: IS THERE A BETTER WAY TO KEEP THE STATE SHARED TO THE SyncHandler
    const dbFilterRef = useRef<PouchDB.Find.FindRequest<{}>>(dbFilterState);
    const [operation, setOperation] = useState<DBOperationCRUD | DBOperationScan>();
    const [data, setData] = useState<any>([]);
    // const [localDB, setLocalDB] = useState<PouchDB.Database<{}>>(new PouchDB(urlDB));
    const localDB = useRef<PouchDB.Database<{}>>(new PouchDB(urlDB)).current;
    // const [remoteDB, setRemoteDB] = useState<PouchDB.Database<{}>>(
    const remoteDB = useRef<PouchDB.Database<{}>>(
        new PouchDB(couchDBURL + urlDB, {
            fetch: (url, opts) => fetch(url, { ...opts, credentials: 'include' /* OR 'same-origin' */ })
                .then((response: Response) => {
                    if (response.status === 401) setState(loggedOut());
                    return response;
                })
                .catch(error => {
                    console.log('ERROR ACCESING DB: ', error);
                    return error;
                })
        })
    ).current;

    const filterDB = () => {
        localDB.find(dbFilterRef.current).then(res => res.docs.length < 1 ? setData([]) : setData(res.docs));
    }

    useEffect(() => {
        const syncHandler = localDB.sync(remoteDB, {
            live: true, // replicate changes in live
            timeout: false, // disable timeout
            retry: true, // retry sync if fail
        });

        syncHandler.on('change', (change) => {
            filterDB();
        }).on("error", (err) => {
            console.error('ERROR SYNC: ', err);
        })

        return () => {
            console.log('Clean UP localDB');
            syncHandler.cancel();
            // localDB.destroy();
        }
    }, [])

    useEffect(() => {
        dbFilterRef.current = dbFilterState;
        filterDB();
    }, [dbFilterState])

    const createDoc = (doc: DBDocument) => {
        localDB.put(doc)
            .then((response) => console.log('Succes: ', response))
            .catch((err) => console.log(err))
    }

    const updateDoc = (doc: DBDocument) => {
        localDB.get(doc._id).then(() => localDB.put(doc))
            .then((response) => console.log('Succes: ', response))
            .catch((err) => console.log(err))
    }

    const deleteDoc = (doc: DBDocument) => {
        localDB.get(doc._id).then(document => localDB.remove(document))
            .then((response) => console.log('Succes: ', response))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        switch (operation?.type) {
            case "CREATE":
                createDoc((operation as DBOperationCRUD).doc);
                break;
            case "UPDATE":
                updateDoc((operation as DBOperationCRUD).doc);
                break;
            case "DELETE":
                deleteDoc((operation as DBOperationCRUD).doc);
                break;
            case "SCAN":
                localDB.get((operation as DBOperationScan)._id).then(doc => localDB.put({
                    ...doc,
                    state: (operation as DBOperationScan).state,
                }));
                break;
            default:
                console.log("Operation not supported: ", operation);
        }

    }, [operation])

    return [data, setDBFilterState, setOperation];
}
interface DBOperation { type: string }
interface DBOperationCRUD extends DBOperation { doc: DBDocument }
interface DBOperationScan extends DBOperation { _id: string, state: number }

export const createDoc = (doc: DBDocument): DBOperationCRUD => ({ type: "CREATE", doc: doc })
export const updateDoc = (doc: DBDocument): DBOperationCRUD => ({ type: "UPDATE", doc: doc })
export const deleteDoc = (doc: DBDocument): DBOperationCRUD => ({ type: "DELETE", doc: doc })
export const scanDoc = (id: string, state: number): DBOperationScan => ({ type: "SCAN", _id: id, state: state })
export const filterKid = (searchInput = '', filter = 'default') => ({
    selector: {
        name: { $regex: RegExp(searchInput, "i") },
        group: filter !== 'default' ? { $eq: filter } : undefined
    },
    sort: [{ name: 'asc' }],
    // use_index: 'index-kid'
});
export const filterShoppingItem = (searchInput = '', filter = 'default') => ({
    selector: {
        name: { $regex: RegExp(searchInput, "i") },
        purchased: filter !== 'default' ? { $eq: filter } : undefined
    },
    // sort: [{ name: 'asc' }],
    // use_index: 'index-kid'
});
