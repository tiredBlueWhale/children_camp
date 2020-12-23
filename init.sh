#!/bin/sh
source .env
# ROLES
ROLE_ADMIN="ADMIN"
ROLE_GROUP_SUPERVISOR="GROUP_SUPERVISOR"
ROLE_SUPERVISOR="SUPERVISOR"
# DEFAULT ADMIN USER INFO
DEFAUL_USER_NAME="admin"
DEFAUL_USER_PASSWORD="pass"
DEFAUL_USER_TEL="+491751100110"
# TEMPLATES
# user_template='{"name": "%s", "password": "%s", "roles": ["%s"], "type": "user", "tel": "%s"}'
# https://docs.couchdb.org/en/latest/api/database/security.html
# security_template='{"admins":{"names":[],"roles":["%s"]},"members":{"names": [],"roles": ["%s"]}}'
# DEFAULT INPUTS
# DEFAULT_USER=$(printf "$user_template" "$DEFAUL_USER_NAME" "$DEFAUL_USER_PASSWORD" "$ROLE_ADMIN" "$DEFAUL_USER_TEL")

SERVER_UP=404
while [ $SERVER_UP != 200 ]; do
    sleep 1
    SERVER_UP=$(curl -sSL -w '%{http_code}' $CONTAINER_NAME:$PORT/_up)
    echo "TESTING CONNECTION $SERVER_UP"
done

curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/_users;
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/_users/_security -H "Content-Type: application/json" -d '{"admins": { "names": [], "roles": [] }, "members": { "names": [], "roles": ["'"$ROLE_ADMIN"'", "'"$ROLE_GROUP_SUPERVISOR"'"] } }'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/_replicator;
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/_global_changes;
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/config_app;
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/shopping;
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/shopping/_security -H "Content-Type: application/json" -d '{"admins": { "names": [], "roles": [] }, "members": { "names": [], "roles": ["'"$ROLE_ADMIN"'", "'"$ROLE_GROUP_SUPERVISOR"'"] } }'
# https://docs.couchdb.org/en/stable/intro/security.html 1.5.2.2 Creating a New User
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/_users/org.couchdb.user:$DEFAUL_USER_NAME -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "'"$DEFAUL_USER_NAME"'", "password": "'"$DEFAUL_USER_PASSWORD"'", "roles": ["'"$ROLE_ADMIN"'"], "type": "user", "tel": "'"$DEFAUL_USER_TEL"'"}'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/kids
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/kids/_security -H "Content-Type: application/json" -d '{"admins": { "names": [], "roles": [] }, "members": { "names": [], "roles": ["'"$ROLE_ADMIN"'", "'"$ROLE_GROUP_SUPERVISOR"'"] } }'
# Create Index https://docs.couchdb.org/en/stable/api/database/find.html 1.3.7 /db/index   index: { fields: ['name', 'group'] }
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids/_index -H "Content-Type: application/json" -d '{"index": { "fields": ["name", "group"]}, "name": "index-kid" }'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"_id": "1", "name": "Mongul", "group": "3", "address": "Street 123", "tel": "01758030023", "state": 0}'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"_id": "2", "name": "Aaul", "group": "2", "address": "Street 123", "tel": "01758030023", "state": 1}'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"_id": "3", "name": "Paulina", "group": "1", "address": "Street 23", "tel": "01723030023", "state": 1}'
curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"_id": "4", "name": "BXPc", "group": "4", "address": "Street 3", "tel": "01758032023", "state": 0}'

# for i in 1 2 3 4 5 6 7 8 9 
# do
#     curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "Mongul", "group": "3", "address": "Street 123", "tel": "01758030023", "state": "0"}'
#     curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "Aaul", "group": "2", "address": "Street 123", "tel": "01758030023", "state": "1"}'
#     curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "Paulina", "group": "1", "address": "Street 23", "tel": "01723030023", "state": "1"}'
#     curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X POST $CONTAINER_NAME:$PORT/kids -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name": "BXPc", "group": "4", "address": "Street 3", "tel": "01758032023", "state": "0"}'
# done
# curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/shopping;
# curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/dinner;
# curl -sS -u $COUCHDB_USER:$COUCHDB_PASSWORD -X PUT $CONTAINER_NAME:$PORT/activity;
