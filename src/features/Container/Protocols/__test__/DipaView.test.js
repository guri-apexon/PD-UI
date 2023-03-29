import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import DipaView from '../DIPA/DipaView';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

let mockDispatch = '';
let mockDipaViewDataSelector = '';
let mockAllDipaViewDataSelector = '';

beforeEach(() => {
  mockDispatch = jest.fn();
  mockDipaViewDataSelector = {
    message: 'Success',
    data: {
      dipa_resource: [
        {
          category: 'Inclusion Criteria',
          doc_id: 'test_doc_id',
          id: 'test_id',
        },
      ],
    },
  };
  mockAllDipaViewDataSelector = {
    data: {
      dipa_resource: [
        {
          dipa_data: {
            output: [
              {
                name: 'DipaViewStructure',
                child: [
                  {
                    name: 'Section1',
                    child: [
                      { name: 'Subsection1', child: [] },
                      { name: 'Subsection2', child: [] },
                    ],
                  },
                  {
                    name: 'Section2',
                    child: [
                      { name: 'Subsection1', child: [] },
                      { name: 'Subsection2', child: [] },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Render DipaView Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders DipaView component without crashing', () => {
    useSelector.mockReturnValue({});
    useDispatch.mockReturnValue(jest.fn());

    render(<DipaView />);

    expect(screen.getByText('DIPA View')).toBeInTheDocument();
  });

  test('should fetch data on mount', () => {
    useSelector.mockReturnValue(mockDipaViewDataSelector);
    useSelector.mockReturnValue(mockAllDipaViewDataSelector);
    useDispatch.mockReturnValue(mockDispatch);

    render(<DipaView />);
  });
});
