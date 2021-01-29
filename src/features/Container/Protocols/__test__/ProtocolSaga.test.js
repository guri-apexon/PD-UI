
import { runSaga } from "redux-saga";
import * as api from "../../../../utils/api";

import {parsedData} from '../saga';


describe("Protocol Saga Unit Test", () => {
    test('should run parsedData function', ()=>{
        let obj={
            id:'1'
        }
        parsedData(JSON.stringify(JSON.stringify(obj)));
    });
})


