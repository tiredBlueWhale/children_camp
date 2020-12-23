import React, { useContext, useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  // IonTitle,
  IonToolbar,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  // IonNav,
} from '@ionic/react';
// import { options } from 'ionicons/icons';
import { IKid, KidState } from '../models';
import { AppContext } from '../State';
import { IToolbarSelect, ToolbarSearch, ToolbarSelect } from '../components/Toolbar';
import { person, earth } from 'ionicons/icons';
import { filterKid, updateDoc, useDB } from '../db/db';

const dummyData = [
  { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 2 },
//   { name: "Hans", address: "Street123", state: 2 },
//   { name: "Hans", address: "Street123", state: 2 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 0 },
//   { name: "Hans", address: "Street123", state: 0 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 0 },
//   { name: "Hans", address: "Street123", state: 1 },
//   { name: "Hans", address: "Street123", state: 1 },
]

// const sortOptions: IToolbarSelect[] = [
//   { value: 'group', title: 'Group' },
//   { value: 'asc', title: 'Asc' },
//   { value: 'dec', title: 'Dec' }
// ];

const filterOptions: IToolbarSelect[] = [
  { value: 'default', title: 'All' },
  { value: '1', title: 'Group 1' },
  { value: '2', title: 'Group 2' },
  { value: '3', title: 'Group 3' }
];

const KidList = (props: any) => {
  // console.log(props);
  const [searchInput, setSearchText] = useState<string>('');
  const [sort, setSort] = useState<string>('group');
  const [filter, setFilter] = useState<string>('default');
  const [data, setDBFilterState, setOperation] = useDB('kids', filterKid());

  // console.log(data);

  useEffect(() => {
    // console.log(searchInput);
    setDBFilterState(filterKid(searchInput, filter));
    // searchInput ? setDBState(searchData(searchInput)) : setDBState(allData())
  }, [searchInput, filter])

  // useEffect(() => {
  //   // console.log(searchInput);
  //   // setDBState(searchData(searchInput))
  //   // searchInput ? setDBState(searchData(searchInput)) : setDBState(allData())
  // }, )

  useEffect(() => {
    // console.log(searchInput);
    console.log(data)
  },[data])


  // const { state, setState } = useContext(AppContext);

  const setRowColor = (kid: IKid) => {
    switch (kid.state) {
      case KidState.OUT: { return "danger"; }
      case KidState.IN: { return "success"; }
      case KidState.ACTIVITY: { return "warning"; }
      default: { return '' }
    }
  }

  const changeKidState = (kid: IKid) => {
    // console.log(kid);
    kid.state = kid.state < KidState.ACTIVITY ? kid.state + 1 : 0;
    console.log(kid.state);
    setOperation(updateDoc(kid));
    // 
  }

  const pushDetail = (e: any, kid: IKid) => {
    e.stopPropagation();
    props.history.push({ pathname: props.match.path + '/' + kid.name, data: kid })
  }

  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>Kidsss</IonTitle>
         
        </IonToolbar> */}
        <IonToolbar>
          <ToolbarSearch searchInput={searchInput} setSearchText={setSearchText} />
          {/* <ToolbarSelect select={sort} setSelect={setSort} options={sortOptions} /> */}
          <ToolbarSelect select={filter} setSelect={setFilter} options={filterOptions} />
          {/* <IonButtons slot="end">
            <IonButton
              color={state.setting.edit ? "primary" : "medium"}
              onClick={() => setState(changeEdit())}>
              <IonIcon slot="icon-only" icon={options} />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {// TODO: SearchBar does not display
        /* <IonHeader collapse="condense" >
          <IonToolbar>
            <IonTitle size="large">Kids</IonTitle>
            <IonButtons collapse slot="end">
              <IonButton
                color={state.setting.edit ? "primary" : "medium"}
                onClick={() => dispatch({ type: 'setEdit', edit: !state.setting.edit })}>
                <IonIcon slot="icon-only" icon={options} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <ToolbarSearch searchText={searchText} setSearchText={setSearchText} />
            <ToolbarSelect sort={sort} setSort={setSort} />
          </IonToolbar>
        </IonHeader> */}

        <IonList>
          <IonItemGroup>
            <IonItemDivider sticky>
              <IonLabel>
                Group 1
              </IonLabel>
            </IonItemDivider>
            {data.map(function (kid: IKid, index: number) {
              return (
                <IonItemSliding key={index}>
                  <IonItem
                    lines="inset"
                    color={setRowColor(kid)}
                    button
                    onClick={(e) => changeKidState(kid)}
                    // onClick={(e) => { state.setting.edit ? changeKidState(kid) : props.history.push({ pathname: props.match.path + '/' + kid.name, data: kid }); }}
                    // detail={!state.setting.edit}
                  >
                    {/* detail={!edit}> */}
                    <IonAvatar slot="start">
                      <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" alt="Avatar" />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{kid.name}</h2>
                      <h3>{kid.address} {kid.group}</h3>
                    </IonLabel>
                    <IonButton slot="end" size="large" fill="clear" onClick={e => pushDetail(e, kid)}><IonIcon slot="icon-only" icon={person}/></IonButton>
                  </IonItem>
                  {/* <IonItemOptions side="end">
                    <IonItemOption onClick={() => console.log('favorite clicked')}>Activity</IonItemOption>
                    {!state.setting.edit && <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Share</IonItemOption>}
                  </IonItemOptions> */}
                  <IonItemOptions side="end">
                    <IonItemOption onClick={() => console.log('favorite clicked')}><IonIcon slot="icon-only" icon={earth} /></IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>)
            })}
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default KidList;
