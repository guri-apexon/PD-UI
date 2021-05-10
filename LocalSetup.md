## Run Below Commands

1. git clone https://gitlabrnds.quintiles.com/protocol-dig/pd-ui.git
2. cd PD-UI
3. npm install

### Changes Require in local setup

## Server.js
Change port to 4000

## src\utils\api.js
Change
export const SSO_ENABLED = true;
To
export const SSO_ENABLED = false;

## src\App.js

comment below Code inside useEffect
        axios
        .get("/session")
        .then((res) => {
          if (Object.keys(res.data).length) {
            dispatch(setUserDetails(res.data));
          }
        })
        .catch((err) => console.log(err));

## src\features\Container\Search\saga.js

inside `getSearchData` function

comment 
const url = `/elastic?${action.payload}`;

uncomment
const url = `http://localhost:4000/elastic?${action.payload}`;



## Run Application
npm run dev

#### Note 
Please undo the above local changes before pushing your code to git.

## For Coverage
yarn test -- --coverage --watchAll=false

