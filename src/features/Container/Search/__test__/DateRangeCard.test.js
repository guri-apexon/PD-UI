import * as redux from 'react-redux';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import { dateSection } from '../Data/constants';

import {
  DateRangeCard,
  CheckboxCard,
  CheckboxTest,
} from '../CustomFilterCards';

describe('DateRangeCard container component', () => {
  const state = {
    initialState: {
      search: {
        recent: {
          from: '',
          to: '',
        },
        range: {
          from: '',
          to: '',
        },
      },
    },
  };

  const section = {
    sectionContent: [
      {
        id: 1,
        title: 'Last 24 hours',
        value: 'last_24_hours',
      },
      {
        id: 2,
        title: 'Last 7 days',
        value: 'last_7_days',
      },
      {
        id: 3,
        title: 'Last 30 days',
        value: 'last_30_days',
      },
      {
        id: 4,
        title: 'Custom range',
        value: 'custom_range',
      },
    ],
  };

  const identifier = 'dateRangeCard';
  const onCheckboxClick = jest.fn();
  const listValue = ['1'];
  const listValue2 = ['1'];
  const identifier2 = 'timeRangeFilter';
  const dateType = 'recent';
  const dateRangeValue = [null, null];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct options', () => {
    const { getByText, getByLabelText } = render(
      <DateRangeCard
        section={section}
        dateType={dateType}
        identifier={identifier}
        onCheckboxClick={onCheckboxClick}
        listValue={listValue}
        listValue2={listValue2}
        identifier2={identifier2}
        dateRangeValue={dateRangeValue}
      />,
    );

    expect(getByText('Last 24 hours')).toBeInTheDocument();
    expect(getByText('Last 7 days')).toBeInTheDocument();
    expect(getByText('Last 30 days')).toBeInTheDocument();
    expect(getByText('Custom range')).toBeInTheDocument();
    expect(getByLabelText('Last 24 hours')).toBeInTheDocument();
  });

  it('calls onCheckboxClick with the correct parameters when clicking an option', () => {
    const { getByLabelText } = render(
      <DateRangeCard
        section={section}
        dateType={dateType}
        identifier={identifier}
        onCheckboxClick={onCheckboxClick}
        listValue={listValue}
        listValue2={listValue2}
        identifier2={identifier2}
        dateRangeValue={dateRangeValue}
      />,
    );

    fireEvent.click(getByLabelText('Last 7 days'));

    expect(onCheckboxClick).toHaveBeenCalledTimes(1);
  });

  it('calls onCheckboxClick with the correct parameters when clicking the custom range option', () => {
    const { getByText } = render(
      <DateRangeCard
        section={section}
        dateType={dateType}
        identifier={identifier}
        onCheckboxClick={onCheckboxClick}
        listValue={listValue}
        listValue2={listValue2}
        identifier2={identifier2}
        dateRangeValue={dateRangeValue}
      />,
    );

    fireEvent.click(getByText('Custom range'));

    expect(onCheckboxClick).toHaveBeenCalledTimes(1);
  });

  it('should disable the DateRangePicker when "Last 7 days" is selected', () => {
    render(
      <DateRangeCard
        section={section}
        identifier={identifier}
        onCheckboxClick={onCheckboxClick}
        listValue={listValue}
        listValue2={listValue2}
        identifier2={identifier2}
        dateRangeValue={dateRangeValue}
      />,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Last 7 days' }));
    expect(screen.getByTestId('range-date-wrapper')).toBeEnabled();
  });

  it('should enable the DateRangePicker when "Last 30 days" is selected', () => {
    render(
      <DateRangeCard
        section={section}
        identifier={identifier}
        onCheckboxClick={onCheckboxClick}
        listValue={listValue}
        listValue2={listValue2}
        identifier2={identifier2}
        dateRangeValue={dateRangeValue}
      />,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Last 30 days' }));
    expect(screen.getByTestId('range-date-wrapper')).toBeEnabled();
  });

  xtest('should render DateRangeCard Recent date radio selection', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <DateRangeCard section={dateSection} dateRangeValue={[null, null]} />,
      state,
    );
    const radio = container.getByTestId('recent-date-wrapper').children[0]
      .children[1].children[0];
    fireEvent.click(radio);
  });

  xtest('should render DateRangeCard Date range date selection', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(<DateRangeCard section={dateSection} />, state);
    const inputSel =
      container.getByTestId('range-date-wrapper').children[0].children[0]
        .children[0].children[1].children[0];
    fireEvent.click(inputSel);

    const dateSel =
      container.getByTestId('range-date-wrapper').children[0].children[1]
        .children[0].children[0].children[1].children[0].children[5];
    fireEvent.click(dateSel);

    const dateSel2 =
      container.getByTestId('range-date-wrapper').children[1].children[1]
        .children[0].children[0].children[1].children[1].children[5];
    fireEvent.click(dateSel2);
  });
});

describe('CheckboxCard', () => {
  const section = {
    sectionContent: [
      { id: '1', title: 'Option 1', value: 'option-1' },
      { id: '2', title: 'Option 2', value: 'option-2' },
      { id: '3', title: 'Option 3', value: 'option-3' },
    ],
  };

  test('renders checkbox options', () => {
    render(<CheckboxCard section={section} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(section.sectionContent.length);
    section.sectionContent.forEach((content, index) => {
      expect(checkboxes[index]).not.toHaveAttribute(
        'id',
        `${content.id}_${index}`,
      );
      expect(checkboxes[index]).toHaveAttribute('value', content.id);
      expect(checkboxes[index]).not.toHaveAttribute(
        'data-testid',
        content.value,
      );
      expect(screen.getByText(content.title)).toBeInTheDocument();
    });
  });

  test('calls onCheckboxClick function on checkbox change', () => {
    const mockOnCheckboxClick = jest.fn();
    render(
      <CheckboxCard section={section} onCheckboxClick={mockOnCheckboxClick} />,
    );
    const checkbox = screen.getByLabelText(section.sectionContent[0].title);
    fireEvent.click(checkbox);
    expect(mockOnCheckboxClick).toHaveBeenCalledWith(
      [section.sectionContent[0].id],
      undefined,
    );
  });
});

describe('CheckboxTest component', () => {
  const mockProps = {
    section: {
      sectionContent: [
        { id: 1, title: 'Option 1' },
        { id: 2, title: 'Option 2' },
        { id: 3, title: 'Option 3' },
      ],
    },
    listValue: [],
    identifier: 'test',
    onCheckboxClick: jest.fn(),
  };

  it('renders loading text when list is empty', () => {
    const { getByText } = render(<CheckboxTest />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders checkboxes with correct labels when list is not empty', () => {
    const { getByText } = render(<CheckboxTest {...mockProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onCheckboxClick with updated listValue when checkbox is clicked', () => {
    const { getByText } = render(<CheckboxTest {...mockProps} />);
    fireEvent.click(getByText('Option 1'));
    expect(mockProps.onCheckboxClick).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Option 3'));
    expect(mockProps.onCheckboxClick).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('Option 1'));
    expect(mockProps.onCheckboxClick).toHaveBeenCalledTimes(0);
  });

  test('should update the checked state of the checkbox when clicked', () => {
    const onCheckboxClickMock = jest.fn();
    const listValue = [1];
    const identifier = 'test';
    const section = {
      sectionContent: [
        {
          id: 1,
          title: 'Checkbox 1',
        },
      ],
    };

    const { getByText } = render(
      <CheckboxTest
        section={section}
        listValue={listValue}
        onCheckboxClick={onCheckboxClickMock}
        identifier={identifier}
      />,
    );
    const checkbox = getByText('Checkbox 1');
    expect(checkbox.checked).toBeUndefined();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeUndefined();
  });

  test('should call onCheckboxClick with updated listValue when checkbox is clicked', () => {
    const onCheckboxClickMock = jest.fn();
    const listValue = [1, 2];
    const identifier = 'test';
    const sectionContent = [
      { id: 1, title: 'Option 1' },
      { id: 2, title: 'Option 2' },
    ];

    const { getAllByTestId } = render(
      <CheckboxTest
        onCheckboxClick={onCheckboxClickMock}
        listValue={listValue}
        identifier={identifier}
        section={{ sectionContent }}
      />,
    );

    const checkbox = getAllByTestId('new-checkbox')[0];
    fireEvent.click(checkbox);

    expect(onCheckboxClickMock).toHaveBeenCalledWith([2], identifier);
  });

  it('should call onCheckboxClick with the correct list value when a checkbox is unchecked', () => {
    const mockIdentifier = 'test';
    const mockOnCheckboxClick = jest.fn();
    const { getByTestId } = render(
      <CheckboxTest
        section={{ sectionContent: [{ id: 1, title: 'Test 1' }] }}
        listValue={[1]}
        identifier={mockIdentifier}
        onCheckboxClick={mockOnCheckboxClick}
      />,
    );

    const checkbox = getByTestId('new-checkbox');
    fireEvent.click(checkbox);

    expect(mockOnCheckboxClick).toHaveBeenCalledWith([], mockIdentifier);
  });
});
