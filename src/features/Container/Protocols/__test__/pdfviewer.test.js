import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import PDFViewer from '../SourcePanel/PdfViewer';
import { summary } from './data';

const mBlob = { size: 841762, type: 'application/pdf' };
const blobN = new Blob(['testing'], { type: 'application/pdf' });

const initialState = {
  protocol: {
    summary: {
      data: summary[0],
      loading: false,
      success: true,
    },
    fileStream: {
      data: mBlob,
      success: true,
      loader: false,
    },
  },
};

const initialStatePdf = {
  protocol: {
    summary: {
      data: summary[1],
      loading: false,
      success: true,
    },
    fileStream: {
      data: blobN,
      success: true,
      loader: false,
    },
  },
};
const initialStateFail = {
  protocol: {
    summary: {
      data: summary[1],
      loading: false,
      success: true,
    },
    fileStream: {
      data: '',
      success: false,
      loader: false,
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
    const lnkAnchorNode = screen.getByTestId('download-doc');
    fireEvent.click(lnkAnchorNode);
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
  test('PDF mouse handlers', async () => {
    render(
      <PDFViewer
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={jest.fn()}
      />,
      {
        initialState: initialStatePdf,
      },
    );
    expect(
      document.getElementsByClassName('document-pdf')[0],
    ).toBeInTheDocument();
    fireEvent.mouseDown(document.getElementsByClassName('document-pdf')[0]);
    fireEvent.mouseUp(document.getElementsByClassName('document-pdf')[0]);
    fireEvent.mouseMove(document.getElementsByClassName('document-pdf')[0]);

    fireEvent.keyDown(document.getElementsByClassName('document-pdf')[0], {
      key: 'PageUp',
      code: 'PageUp',
    });
  });
  test('PDF keydown', () => {
    render(
      <PDFViewer
        page={-1}
        refs={jest.fn()}
        pageRight={0}
        handlePaginationPage={jest.fn()}
      />,
      {
        initialState: initialStatePdf,
      },
    );
    fireEvent.keyDown(document.getElementsByClassName('document-pdf')[0], {
      key: 'PageDown',
      code: 'PageDown',
    });
  });
  test('PDF render fail', () => {
    render(
      <PDFViewer
        page={1}
        refs={jest.fn()}
        pageRight={2}
        handlePaginationPage={jest.fn()}
      />,
      {
        initialState: initialStateFail,
      },
    );
  });
});
