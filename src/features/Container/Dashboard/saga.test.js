// import {httpCall as api} from "../../../utils/api";
// import {runSaga} from 'redux-saga';
// import {getSponsor, getIndication, getRecentSearches} from './dashboardSlice';
// import {recentSearchAsyn} from './saga';

// const response = {
//     data:[{id:1,name:'Project'}],
//     message:'Successful'
// }


// describe('Test Suite for Dashboard Saga',()=> {

//     test('Should test getSponsors',async ()=> {
//         const dispatchedActions = [];
//         const mockCallApi = jest
//           .spyOn(recentSearchAsyn, 'recentSearchAsyn')
//           .mockImplementationOnce(() =>
//             Promise.resolve(response),
//           );
//         const fakeStore = {
//           dispatch: (action) => dispatchedActions.push(action),
//         };
//         await runSaga(fakeStore, recentSearchAsyn,{
//             payload:{
//                 userid:'2',
//                 tenantid:'2'
//             },
//             type:''
//         }).toPromise();
//         expect(mockCallApi).toHaveBeenCalledTimes(1);
//         expect(dispatchedActions).toContainEqual(
//             getRecentSearches(response.data)
//         );
//         mockCallApi.mockClear();
//     })

// });