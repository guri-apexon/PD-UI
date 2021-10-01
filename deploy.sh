# install dependencies and create
# the react app build
npm install
npm run build


#PM2
if npm run stop; then
    npm run deploy
else
    npm run deploy
fi