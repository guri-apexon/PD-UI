import React from 'react';
import {render} from '@testing-library/react';
import CustomDropdown from './CustomDropdown'


describe("customDropdown test", ()=>{

    test("customDropdown render test", async () => {
        let formValue={
            label:''
        }
        let sponsor= [
            {sponsor_name: "NVT AG", sponsor_abbreviation: "NVT", id: 2, label: "NVT AG"},
          ]   
        const container = render(
            <CustomDropdown formValue={formValue} sponsor={sponsor}/>
          );
        // debug();
    })
})