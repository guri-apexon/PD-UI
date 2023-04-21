import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../index';
import * as ProtocolContext from '../../../ProtocolContext';
import { headerList } from '../../FontProperties/constants';

document.execCommand = jest.fn();

describe('Dropdown', () => {
  test('Render without error', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
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
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
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
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="list"
        list={headerList}
      />,
    );
    const list = screen.getAllByTestId('list');
    expect(list.length).toBe(5);
  });

  test('Format content on button click', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="header"
        list={headerList}
      />,
    );
    const list = screen.getByText('H2');
    fireEvent.mouseDown(list);
    expect(document.execCommand).toHaveBeenCalled();
  });

  test('headerSelect on button click', () => {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    const screen = render(
      <Dropdown
        disabled={false}
        buttonName="H"
        onHeaderSelect={jest.fn()}
        type="list"
        list={headerList}
      />,
    );
    const list = screen.getByText('H2');
    fireEvent.click(list);
  });

  it('executes onSymbolSelect function on symbol item click', () => {
    const mockList = [
      { name: 'Option 1' },
      { name: 'Option 2' },
      { name: 'Option 3' },
    ];
    document.execCommand = jest.fn();
    const { getAllByTestId } = render(
      <Dropdown
        buttonName="Dropdown button"
        contentStyle={{ color: 'red' }}
        headerStyle={{ backgroundColor: 'blue' }}
        type="symbol"
        disabled={false}
        list={mockList}
      />,
    );
    fireEvent.mouseDown(getAllByTestId('list')[0]);
    expect(document.execCommand).toHaveBeenCalled();
  });

  it('hides list when clicked outside', () => {
    const mockList = [
      { name: 'Option 1' },
      { name: 'Option 2' },
      { name: 'Option 3' },
    ];
    const { getByTestId } = render(
      <Dropdown
        buttonName="Dropdown button"
        contentStyle={{ color: 'red' }}
        headerStyle={{ backgroundColor: 'blue' }}
        type="symbol"
        disabled={false}
        list={mockList}
      />,
    );
    fireEvent.click(getByTestId('btn'));
    expect(getByTestId('options')).toHaveClass('active-show-list');
    fireEvent.mouseDown(document.body);
    expect(getByTestId('options')).not.toHaveClass('active-show-list');
  });
});
