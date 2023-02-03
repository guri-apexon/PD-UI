import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../index';
import ProtocolContext from '../../../ProtocolContext';

document.execCommand = jest.fn();

describe('Dropdown', () => {
  test('Render without error', () => {
    render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
      />,
    );
  });

  test('check options in the document', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
      />,
    );
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('check list in the document', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="list"
      />,
    );
    const list = screen.getAllByTestId('list');
    expect(list.length).toBe(3);
  });

  test('Format content on button click', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
      />,
    );
    const list = screen.getByText('H2');
    fireEvent.mouseDown(list);
    expect(document.execCommand).toHaveBeenCalled();
  });

  test('headerSelect on button click', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="list"
      />,
    );
    const list = screen.getByText('H2');
    fireEvent.click(list);
  });
});
