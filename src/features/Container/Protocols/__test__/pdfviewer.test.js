import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Pdf from '../SourcePanel/PdfViewer';
import { summary } from './data';

const initialState = {
  protocol: {
    summary: {
      data: summary,
      loading: false,
      success: true,
    },
    fileStream: {
      data: 'file://quintiles.net/enterprise/Services/protdigtest/pilot_iqvxml//574051fb-1cb5-4e6c-816c-f9964090a1e7/Prot_Amend-V3.0-2019-12-10-VER-000001%20(1).pdf',
      success: true,
    },
  },
};

describe('PDF VIEWER', () => {
  test('Load PDF Documnet', () => {
    jest.doMock('react-pdf', () => ({
      pdfjs: { GlobalWorkerOptions: { workerSrc: 'abc' } },
      Document: ({
        // eslint-disable-next-line
        onLoadSuccess = (pdf = { numPages: 4 }) => pdf.numPages,
      }) => {
        return <div>{onLoadSuccess({ numPages: 4 })}</div>;
      },
      Outline: null,
      Page: () => <div>def</div>,
    }));
  });

  test('Zoom Out Counter', () => {
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });
    const zoomOut = screen.getByTestId('zoomOut');
    expect(zoomOut).toBeInTheDocument();
    fireEvent.click(zoomOut);
  });

  test('Zoom In Counter', () => {
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });
    const zoomIn = screen.getByTestId('zoomIn');
    expect(zoomIn).toBeInTheDocument();
    fireEvent.click(zoomIn);
  });

  test('keydown function', () => {
    const handlePaginationPageMock = jest.fn();
    render(
      <Pdf
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={handlePaginationPageMock}
      />,
      {
        initialState,
      },
    );

    const event1 = new KeyboardEvent('keydown', { key: 'PageDown' });
    document.dispatchEvent(event1);

    const event2 = new KeyboardEvent('keydown', { key: 'PageUp' });
    document.dispatchEvent(event2);

    const pdfDocument = screen.getByTestId('protocol-column-wrapper');
    fireEvent.keyDown(pdfDocument);
  });

  test('protocol-column-wrapper', () => {
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });
    const pdfDocument = screen.getByTestId('protocol-column-wrapper');
    expect(pdfDocument).toBeInTheDocument();
    fireEvent.keyDown(pdfDocument);
  });
  xit('changes the page when the pagination is clicked', () => {
    render(<Pdf page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });
    const nextButton = screen.getByText('Page 1 of 1');
    fireEvent.click(nextButton);
    const pageNumberElement = screen.getByText('Page 2 of 2');
    expect(pageNumberElement).toBeInTheDocument();
    expect(
      document.getElementsByClassName('document-pdf')[0],
    ).toBeInTheDocument();
    fireEvent.keyDown(document.getElementsByClassName('document-pdf')[0]);
  });
  it('should display Page 1 by default', () => {
    render(
      <Pdf
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={jest.fn()}
      />,
      { initialState },
    );
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });
  it('should display Page 2 ', () => {
    render(
      <Pdf
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={jest.fn()}
      />,
      { initialState },
    );
    const dropdown = screen.getByTestId('paginaton_1');
    userEvent.type(dropdown, { target: { value: 'Page 1 of 2' } });
  });
  xit('changes the page when the pagination button is clicked', () => {
    const handlePaginationPageMock = jest.fn();
    render(
      <Pdf
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={handlePaginationPageMock}
      />,
      {
        initialState,
      },
    );
    fireEvent.click(screen.getByLabelText('Go to page 2'));
    expect(handlePaginationPageMock).toHaveBeenCalledWith(2);
  });
});
