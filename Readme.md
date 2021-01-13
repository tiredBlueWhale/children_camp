### Features

#### Front-End
- [x] Scan QrCodes
- [] Change kid state
  - [x] Checkin/ Out via list
  - [x] Checkin/ Out via Scanner
  - [] Checkin/ Out to Activity
- [x] CRUD shopping
- [] CRUD dinner
- [] CRUD tasks
- [] Activity
  - [] Create Activity
  - [] CRUD kids to Activity
  - [] Add map to Activity
  - [] Track Supervisor via GPS
- [] Admin View
  - [] CRUD kids to system
  - [] CRUD supervisors to system
    - [] Assign supervisors to group
- []

#### Back-End
- [] Refactor init script (change to python, maybe?). Something that supported JSON, Strings better
- []

#### Overall
- [x] Sync db entries
- [x] Authentication/Authorization
- []

### Bugs/Erros

#### Warning Can't perform a React state update on an unmounted component
##### Why
Tabs initalise useStates 
-> If Tab does not get opened 
-> Component is unmounted
-> Results in Error

##### Solution
-> Change nothing since it does not break anything
-> Change App routing to have tabs on bottom of UI stack
-> Decouple Login & App (Same result as above tabs would be on bottom of stack)


### Local Development

#### Pre Requirements

1. [Docker](https://www.docker.com/products/docker-desktop)
2. [npm](https://www.npmjs.com/)
3. `npm install` 

##### OSX
- Docker needs access to project folder

#### Front-End
Chrome(Port:5000) `mpn run chrome`
Default Browser `ionic serve`

#### Back-End Port:5984
Start: `docker-compose up` || `make start`
Stop: `make stop`
Reseting and Restarting `make`. Deleted container && couchdb volume && restart

#### User
##### Admin User DB
username: `god`
passowrd: `secret`
Can be used to log into DB `localhost:5984/_utils`. Use incognito tab, since cookie is used for authorization.

##### Admin User Platform
username: `admin`
password: `pass`

#### Insert via browser
```json
{
  "_id": "9f4f9a184ffb26f1951329bfbf000f53"
  "name": "testKid"
  "address": "testStreet123"
  "tel": "+7368220344"
  "state": 0
}
```
