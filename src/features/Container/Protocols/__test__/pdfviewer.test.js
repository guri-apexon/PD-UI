import { render, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Pdf from '../SourcePDFPanel/pdfviewer';
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

  test('Zoom In Counter', () => {
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />, {
      initialState,
    });
    const pdfKeyDown = screen.getByTestId('protocol-column-wrapper');
    expect(pdfKeyDown).toBeInTheDocument();
    fireEvent.keyDown(pdfKeyDown);
  });
});
