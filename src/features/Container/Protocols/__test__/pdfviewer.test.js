import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from 'react';

import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Pdf, { useIntersectionObserver } from '../pdfviewer';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

describe('useIntersectionObserver()', () => {
  const config = {};

  let observe;
  let disconnect;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      global.window.IntersectionObserver = () => {};
      observe = jest.fn();
      disconnect = jest.fn();
      jest
        .spyOn(global.window, 'IntersectionObserver')
        .mockImplementation(() => ({
          observe,
          disconnect,
        }));
    }
  });

  it('does nothing given falsy element', () => {
    const listener = () => {};

    const { result } = renderHook(() =>
      useIntersectionObserver(null, config, listener),
    );

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined(
    'attaches event listener to element properly',
    async () => {
      const element = document.createElement('div');
      const listener = jest.fn();

      renderHook(() => useIntersectionObserver(element, config, listener));

      await new Promise((resolve) => {
        resolve();
      });

      expect(global.window.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(global.window.IntersectionObserver).toHaveBeenCalledWith(
        listener,
        config,
      );

      expect(observe).toHaveBeenCalledTimes(1);
      expect(observe).toHaveBeenCalledWith(element);
    },
  );
});

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
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />);
    const zoomOut = screen.getByTestId('zoomOut');
    expect(zoomOut).toBeInTheDocument();
    fireEvent.click(zoomOut);
  });

  test('Zoom In Counter', () => {
    const screen = render(<Pdf page={1} refs={jest.fn()} pageRight={2} />);
    const zoomIn = screen.getByTestId('zoomIn');
    expect(zoomIn).toBeInTheDocument();
    fireEvent.click(zoomIn);
  });
});
