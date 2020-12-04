import React from 'react';
import ReactDOM from 'react-dom'
import Protocol from '../Protocols'
import { Provider } from 'react-redux';

it('Renders without Crashing',()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Provider>
        <Protocol />
    </Provider>,div)
})