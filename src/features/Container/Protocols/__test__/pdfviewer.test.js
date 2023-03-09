import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import PDFViewer from '../SourcePanel/PdfViewer';
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
    const screen = render(
      <PDFViewer page={1} refs={jest.fn()} pageRight={2} />,
      {
        initialState,
      },
    );
    const zoomOut = screen.getByTestId('zoomOut');
    expect(zoomOut).toBeInTheDocument();
    fireEvent.click(zoomOut);
  });

  test('Zoom In Counter', () => {
    const screen = render(
      <PDFViewer page={1} refs={jest.fn()} pageRight={2} />,
      {
        initialState,
      },
    );
    const zoomIn = screen.getByTestId('zoomIn');
    expect(zoomIn).toBeInTheDocument();
    fireEvent.click(zoomIn);
  });

  test('keydown function', () => {
    render(<PDFViewer page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });

    const event1 = new KeyboardEvent('keydown', { key: 'PageDown' });
    document.dispatchEvent(event1);

    const event2 = new KeyboardEvent('keydown', { key: 'PageUp' });
    document.dispatchEvent(event2);

    expect(screen.getByTestId('protocol-column-wrapper')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId('protocol-column-wrapper'));
  });

  test('PDF render', () => {
    render(
      <PDFViewer
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={jest.fn()}
      />,
      {
        initialState,
      },
    );
    expect(
      document.getElementsByClassName('document-pdf')[0],
    ).toBeInTheDocument();
    fireEvent.keyDown(document.getElementsByClassName('document-pdf')[0]);
  });
});
