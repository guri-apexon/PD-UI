// __tests__/fetch.test.js
import React from 'react'
import { render,fireEvent,act, screen } from '../../../../test-utils/test-utils'
import '@testing-library/jest-dom/extend-expect'
import  AddProtocol from './AddProtocol'
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { initialFormErrorValues, initialFormValues, documentStatusList, amendmentNumber } from "./constants";
import Plus from "apollo-react-icons/Plus";
import * as redux from "react-redux";
const state={
    custom:true
}
test('renders learn react link', () => {
    const { getByText } = render(
          <AddProtocol state={state}/> ,{
            initialState: {},
          });
  });

  
 
  test('renders learn react link', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { getByText, debug } = render(
          <AddProtocol state={state}/> ,{
            initialState: {
               dashboard: {
                addProtocolData: {
                    sponsor: [
                      {sponsor_name: "NVT AG", sponsor_abbreviation: "NVT", id: 2, label: "NVT AG"},
                    ],
                    indication: [{indication_name: "indication1", indication_description: "Indication1 Description", id: 1, label: "Indication1 Description"}],
                    amendmentNumber:[{label: "Y", value: "Yes"}],
                    documentState:[{label: "Draft", value: "draft"}]
                  },
                  addProtocolModal: true,
                  isLoading: false
               }
              },
          });
    debug();
  });

// test('loads and displays greeting', async () => {
//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })
