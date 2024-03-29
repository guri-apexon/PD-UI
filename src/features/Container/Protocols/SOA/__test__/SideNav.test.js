import { render, fireEvent } from '@testing-library/react';
import SideNav from '../SideNav';
import TabelContext from '../Context';

const mockDispatch = jest.fn();
const mockState = {
  settingItems: {
    item1: {
      name: 'Item 1',
      children: [{ name: 'Filter 1' }, { name: 'Filter 2' }],
    },
    item2: {
      name: 'Item 2',
      children: [{ name: 'Filter 3' }, { name: 'Filter 4' }],
    },
  },
  hideGroupsColumns: [],
};
const mockContext = {
  state: mockState,
  dispatch: mockDispatch,
};

describe('SideNav', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    expect(getByTestId('side-nav')).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    const { getAllByTestId } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    const items = getAllByTestId(/item[1-9]/);
    expect(items.length).toBe(2);
  });

  it('should call onChange function when an Accordion is clicked', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    const firstAccordion = getByTestId('side-nav');
    fireEvent.click(firstAccordion);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('should expand accordion on change', () => {
    const { getByText } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    const accordion = document.querySelector('#accordion-1');
    expect(accordion).not.toBeTruthy();

    const summary = getByText('Filter 1');
    fireEvent.click(summary);

    expect(accordion).not.toBeTruthy();
  });

  it('should update expands state when onChange is called', () => {
    const { getByTestId } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    const accordionSummary = getByTestId('Filter 1');
    fireEvent.click(accordionSummary);
    const accordionContent = getByTestId('Filter 1');
    expect(accordionContent).not.toBeVisible();
  });

  it('collapses the item on click', () => {
    const { getByTestId } = render(<SideNav />, {
      wrapper: ({ children }) => (
        <TabelContext.Provider value={mockContext}>
          {children}
        </TabelContext.Provider>
      ),
    });
    const item = getByTestId('item1');
    fireEvent.click(item);
    fireEvent.click(item);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
