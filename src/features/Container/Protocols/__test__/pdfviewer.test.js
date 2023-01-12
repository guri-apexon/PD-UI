import {
  render,
  fireEvent,
  renderHook,
} from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Pdf, { useIntersectionObserver } from '../SourcePDFPanel/pdfviewer';
import { summary } from './data';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

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

// describe('useIntersectionObserver()', () => {
//   const config = {};

//   let observe;
//   let disconnect;

//   beforeEach(() => {
//     if (typeof window !== 'undefined') {
//       global.window.IntersectionObserver = () => {};
//       observe = jest.fn();
//       disconnect = jest.fn();
//       jest
//         .spyOn(global.window, 'IntersectionObserver')
//         .mockImplementation(() => ({
//           observe,
//           disconnect,
//         }));
//     }
//   });

//   // it('does nothing given falsy element', () => {
//   //   const listener = () => {};

//   //   const { result } = renderHook(() =>
//   //     useIntersectionObserver(null, config, listener),
//   //   );

//   //   expect(result.current).toBe(undefined);
//   // });

//   // itIfDocumentDefined(
//   //   'attaches event listener to element properly',
//   //   async () => {
//   //     const element = document.createElement('div');
//   //     const listener = jest.fn();

//   //     renderHook(() => useIntersectionObserver(element, config, listener));

//   //     await new Promise((resolve) => {
//   //       resolve();
//   //     });

//   //     expect(global.window.IntersectionObserver).toHaveBeenCalledTimes(1);
//   //     expect(global.window.IntersectionObserver).toHaveBeenCalledWith(
//   //       listener,
//   //       config,
//   //     );

//   //     expect(observe).toHaveBeenCalledTimes(1);
//   //     expect(observe).toHaveBeenCalledWith(element);
//   //   },
//   // );
// });

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
});
