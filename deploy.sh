# install dependencies and create
# the react app build
# /d/UI/pd-ui/

npm install

if npm run build; then
    cp -R /d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui/build /d/UI/pd-ui/
    cp /d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui/package.json /d/UI/pd-ui/
    cp /d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui/server.js /d/UI/pd-ui/
    cp /d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui/.env /d/UI/pd-ui/
    cd /d/UI/pd-ui
    npm install
else
    echo build failed

fi

#PM2
if npm run stop; then
    npm run deploy
else
    npm run deploy
fi