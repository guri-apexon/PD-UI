import { renderHook } from '@testing-library/react-hooks';
import { useState, fireEvent } from 'react';
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

      await new Promise((resolve) => resolve());

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

function Testing() {
  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Pdf
      value={(numPages, pageNumber)}
      setValue={(setNumPages, setPageNumber)}
      onDocumentLoadSuccess={numPages}
      setNumPages={numPages}
    />
  );
}

function Testing2() {
  return <Pdf />;
}

describe('pdfviewer component', () => {
  test('should show Pdf', () => {
    render(<Testing />);
  });
});

describe('Onload', () => {
  test('Document load Success', () => {
    render(<Testing2 />);
  });
  test('Zoom Out Counter', () => {
    const screen = render(<Pdf />);
    const zoomOut = screen.getByRole('zoomOut');
    expect(zoomOut).toBeInTheDocument('pageScale');
    fireEvent.click(zoomOut);
  });

  test('Zoom In Counter', () => {
    const screen = render(<Pdf />);
    const zoomIn = screen.getByRole('zoomIn');
    expect(zoomIn).toBeInTheDocument('pageScale');
    fireEvent.click(zoomIn);
  });
});
