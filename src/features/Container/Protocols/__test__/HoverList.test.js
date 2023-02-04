import { render, fireEvent } from '@testing-library/react';
import HoverList from '../CustomComponents/PDTable/Components/HoverList';

describe('HoverList', () => {
  const data = [
    { id: 1, image: '<i class="fas fa-plus"></i>', text: 'Add' },
    { id: 2, image: '<i class="fas fa-minus"></i>', text: 'Remove' },
  ];
  const handleOperation = jest.fn();
  const index = 0;

  it('renders data', () => {
    const { getByText } = render(
      <HoverList data={data} handleOperation={handleOperation} index={index} />,
    );
    data.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });

  it('calls handleOperation on click', () => {
    const { getByText } = render(
      <HoverList data={data} handleOperation={handleOperation} index={index} />,
    );
    fireEvent.click(getByText(data[0].text));
    expect(handleOperation).toHaveBeenCalledWith(data[0].id, index);
  });
});
