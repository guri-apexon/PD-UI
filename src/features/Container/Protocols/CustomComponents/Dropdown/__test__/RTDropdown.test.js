import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../index';
import ProtocolContext from '../../../ProtocolContext';

document.execCommand = jest.fn();

describe('Dropdown', () => {
  test('Render without error', () => {
    render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <Dropdown
          disabled={false}
          buttonName="H"
          onHeaderSelect={jest.fn()}
          type="header"
        />
      </ProtocolContext.Provider>,
    );
  });

  test('check options in the document', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <Dropdown
          disabled={false}
          buttonName="H"
          onHeaderSelect={jest.fn()}
          type="header"
        />
      </ProtocolContext.Provider>,
    );
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('check list in the document', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <Dropdown
          disabled={false}
          buttonName="H"
          onHeaderSelect={jest.fn()}
          type="list"
        />
      </ProtocolContext.Provider>,
    );
    const list = screen.getAllByTestId('list');
    expect(list.length).toBe(3);
  });

  test('Format content on button click', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <Dropdown
          disabled={false}
          buttonName="H"
          onHeaderSelect={jest.fn()}
          type="header"
        />
      </ProtocolContext.Provider>,
    );
    const list = screen.getByText('H2');
    fireEvent.mouseDown(list);
    expect(document.execCommand).toHaveBeenCalled();
  });

  test('headerSelect on button click', () => {
    const screen = render(
      <ProtocolContext.Provider value={{ dispatchSectionEvent: jest.fn() }}>
        <Dropdown
          disabled={false}
          buttonName="H"
          onHeaderSelect={jest.fn()}
          type="list"
        />
      </ProtocolContext.Provider>,
    );
    const list = screen.getByText('H2');
    fireEvent.click(list);
  });
});
