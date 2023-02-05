import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../index';
import { headerList, mathSymbols } from '../../FontProperties/constants';

document.execCommand = jest.fn();

describe('Dropdown', () => {
  test('Render without error  when type is header', () => {
    render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
        list={headerList}
        setSaveEnabled={jest.fn()}
      />,
    );
  });

  test('check options in the document when type is header', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
        list={headerList}
        setSaveEnabled={jest.fn()}
      />,
    );
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
    const options = screen.getByTestId('options');
    expect(options).toBeInTheDocument();
  });

  test('check list in the document when type is header', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
        list={headerList}
        setSaveEnabled={jest.fn()}
      />,
    );
    const list = screen.getAllByTestId('list');
    expect(list.length).toBe(5);
  });

  test('Format content on button click when type is header', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
        list={headerList}
        setSaveEnabled={jest.fn()}
      />,
    );
    const list = screen.getByText('H2');
    fireEvent.mouseDown(list);
    expect(document.execCommand).toHaveBeenCalled();
  });

  test('onSymbolSelect on click when type is symbols', () => {
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="M"
        onHeaderSelect={jest.fn()}
        type="symbols"
        list={mathSymbols}
        setSaveEnabled={jest.fn()}
      />,
    );
    const list = screen.getByText('∅');
    fireEvent.mouseDown(list);
    expect(document.execCommand).toHaveBeenCalledWith('insertText', false, '∅');
  });
});
