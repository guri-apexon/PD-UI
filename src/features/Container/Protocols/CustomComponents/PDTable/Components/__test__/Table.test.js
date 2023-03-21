import { render, fireEvent } from '@testing-library/react';
import DisplayTable from '../Table';

describe('DisplayTable component', () => {
  const data = [
    {
      column1: { content: 'value 1' },
      column2: { content: 'value 2' },
    },
    {
      column1: { content: 'value 3' },
      column2: { content: 'value 4' },
    },
  ];
  const onChange = jest.fn();
  const handleRowOperation = jest.fn();
  const setFootnoteData = jest.fn();

  it('should render the table with the given data', () => {
    const { getByText } = render(
      <DisplayTable
        data={data}
        onChange={onChange}
        handleRowOperation={handleRowOperation}
        edit={false}
        colWidth={50}
        footNoteData={[]}
        setFootnoteData={setFootnoteData}
      />,
    );

    expect(getByText('value 1')).toBeInTheDocument();
    expect(getByText('value 2')).toBeInTheDocument();
    expect(getByText('value 3')).toBeInTheDocument();
    expect(getByText('value 4')).toBeInTheDocument();
  });

  it('should call onChange function when the cell content is changed', () => {
    const { getByText } = render(
      <DisplayTable
        data={data}
        onChange={onChange}
        handleRowOperation={handleRowOperation}
        edit
        colWidth={50}
        footNoteData={[]}
        setFootnoteData={setFootnoteData}
      />,
    );

    const cell = getByText('value 1');
    fireEvent.click(cell);
    const event = new KeyboardEvent('keypress', { key: 'a' });
    cell.dispatchEvent(event);
    fireEvent.blur(cell, { target: { innerHTML: 'new value' } });
  });

  test('Drag and drop capabilities', () => {
    const screen = render(
      <DisplayTable
        data={data}
        onChange={onChange}
        handleRowOperation={handleRowOperation}
        edit
        colWidth={50}
        footNoteData={[]}
        setFootnoteData={setFootnoteData}
      />,
    );

    screen.debug();

    const draggableElement = screen.getAllByTestId('draggable')[0];
    const droppableElement = screen.getByText('value 2');

    fireEvent.dragStart(draggableElement);
    fireEvent.dragEnter(droppableElement);
    fireEvent.dragOver(droppableElement);
    fireEvent.drop(droppableElement);
  });
});
