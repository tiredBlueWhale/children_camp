import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonAlert, IonButton, IonButtons, IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, pencil, trash } from 'ionicons/icons';
import { IToolbarSelect, ToolBarBackButton, ToolbarSearch, ToolbarSelect, ToolBarTitleDetail } from '../../components/Toolbar';
import { createDoc, deleteDoc, filterShoppingItem, updateDoc, useDB } from '../../db/db';
import { ShoppingItem } from '../../models';
import { AppContext } from '../../State';

const selectOptions: IToolbarSelect[] = [
    { value: 'default', title: 'All' },
    { value: 'false', title: 'Buying' },
    { value: 'true', title: 'Purchased' },
]

const Shopping = () => {

    const [searchInput, setSearchText] = useState<string>('');
    const [editItem, setEditItem] = useState<ShoppingItem | undefined>(undefined);
    const [filter, setFilter] = useState<string>('default');
    const [data, setDBFilterState, setOperation] = useDB('shopping', filterShoppingItem());
    const { state } = useContext(AppContext);

    let form: { [key: string]: string } = { amount: '', name: '' };
    const formRef = useRef(null);

    useEffect(() => {
        setDBFilterState(filterShoppingItem(searchInput, filter));
    }, [searchInput, filter])

    useEffect(() => {
        console.log(data);
    }, [data])

    const inputChange = (e: any) => { form[e.target.id] = e.target.value; }

    const onChangePurchase = (item: ShoppingItem) => {
        item.purchased = !item.purchased;
        setOperation(updateDoc(item));
    }

    const updateItem = (item: ShoppingItem) => { setOperation(updateDoc(item)); }
    const deleteItem = (item: ShoppingItem) => { setOperation(deleteDoc(item)); }

    const addItem = (e: any) => {
        e.preventDefault();
        const newItem: ShoppingItem = {
            _id: new Date().toISOString(),
            userId: state.auth.user._id,
            userName: state.auth.user.name,
            amount: +form.amount, 
            name: form.name,
            purchased: false
        }
        setOperation(createDoc(newItem));
    }

    return (
        <IonModal
            isOpen
            swipe-to-close>
            <IonHeader>
                <IonToolbar>
                    <ToolBarBackButton href="/app/admin" />
                    <IonTitle>Shopping</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <ToolbarSearch searchInput={searchInput} setSearchText={setSearchText} />
                    <ToolbarSelect select={filter} setSelect={setFilter} options={selectOptions} />
                </IonToolbar>
                <form onSubmit={addItem} ref={formRef}>
                    <IonToolbar>
                        <IonRow>
                            <IonItem lines="none" style={{ width: '120px' }}>
                                <IonInput id="amount" type="number" placeholder="Amount" value={form.amount} onIonChange={e => inputChange(e)} required>
                                </IonInput>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>X</IonLabel>
                            </IonItem>
                            <IonItem lines="none" style={{ flex: '1 1 0', margin: '0 16px 0 8px' }}>
                                <IonInput id="name" placeholder="Item" value={form.name} onIonChange={e => inputChange(e)} required>
                                </IonInput>
                            </IonItem>
                            {/* TODO: IonFabButton does not support type="submit"*/}
                            {/* <IonFabButton size="small" color="success" type="submit"><IonIcon icon={add} /></IonFabButton> */}
                            <IonButton size="default" shape="round" color="success" type="submit"><IonIcon icon={add} /></IonButton>
                        </IonRow>
                    </IonToolbar>
                </form>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {data.map(function (item: ShoppingItem, index: number) {
                        return (<IonItemSliding key={item._id}>
                            <IonItem
                                button
                                onClick={() => onChangePurchase(item)}>

                                <IonLabel>
                                    <h2 style={{ textDecoration: item.purchased ? 'line-through' : 'none' }}>{item.amount} x {item.name}</h2>
                                    <h3>{item.userName} ({item._id})</h3>
                                </IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption onClick={e => setEditItem(item)}><IonIcon slot="icon-only" icon={pencil} /></IonItemOption>
                                <IonItemOption color="danger" onClick={e => deleteItem(item)}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>)
                    })}
                </IonList>
                <IonAlert
                    isOpen={editItem ? true : false}
                    onDidDismiss={() => setEditItem(undefined)}
                    //   cssClass='my-custom-class'
                    header={'Edit Item'}
                    inputs={[
                        {
                            name: 'amount',
                            type: 'text',
                            label: 'Amount',
                            value: editItem?.amount,
                            checked: true
                        },
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                            value: editItem?.name,
                        },
                        // {
                        //     name: 'purchased',
                        //     type: 'checkbox',
                        //     label: 'Purchased',
                        //     value: editItem?.purchased,
                        // },
                    ]}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Ok',
                            handler: (data) => {
                                if (editItem) {
                                    document.querySelector("ion-item-sliding")?.closeOpened();
                                    editItem.amount = +data.amount;
                                    editItem.name = data.name;
                                    updateItem(editItem);
                                }
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonModal >
    )
}

// disabled={!edit && list}

export default Shopping;