import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import MedicalTerm from '../EnrichedContent/MedicalTerm';
import store from '../../../../store/store';

describe('MedicalTerm', () => {
  const props = {
    enrichedTarget: 'enrichedTarget',
    expanded: true,
    enrichedText: 'enrichedText',
    clinicalTerms: {},
    linkId: 'linkId',
    docId: 'docId',
  };

  it('renders the MedicalTerm component', () => {
    render(
      <Provider store={store}>
        <MedicalTerm {...props} />
      </Provider>,
    );
    expect(screen.getByTestId('medical-term')).toBeInTheDocument();
  });

  it('handles the pencil click', () => {
    render(
      <Provider store={store}>
        <MedicalTerm {...props} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByTestId('show-icons')).toBeInTheDocument();
  });

  it('handles the cancel click', () => {
    render(
      <Provider store={store}>
        <MedicalTerm {...props} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByTestId('show-icons')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel-icon'));
    expect(screen.queryByTestId('show-icons')).not.toBeInTheDocument();
  });

  it('handles the delete tag', () => {
    render(
      <Provider store={store}>
        <MedicalTerm {...props} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.queryByTestId('child-arr')).not.toBeInTheDocument();
  });

  it('handles the delete', () => {
    render(
      <Provider store={store}>
        <MedicalTerm {...props} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.queryByTestId('child-arr')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-all-icon'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
