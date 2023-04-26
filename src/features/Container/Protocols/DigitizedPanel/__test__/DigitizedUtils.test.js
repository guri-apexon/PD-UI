import { toast } from 'react-toastify';
import {
  scrollToLinkandReference,
  replaceHtmlTags,
  onBeforeUnload,
} from '../utils';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('scrollToLinkandReference', () => {
  let dvParent;
  let scrollDiv;

  beforeEach(() => {
    dvParent = document.createElement('div');
    dvParent.classList.add('section-single-content');
    document.body.appendChild(dvParent);

    scrollDiv = document.createElement('div');
    scrollDiv.classList.add('readable-content-wrapper');
    dvParent.appendChild(scrollDiv);

    const segment1 = document.createElement('div');
    segment1.classList.add('single-segment');
    segment1.textContent = 'Reference A';

    const segment2 = document.createElement('div');
    segment2.classList.add('single-segment');
    segment2.textContent = 'Reference B';

    const segment3 = document.createElement('div');
    segment3.classList.add('single-segment');
    segment3.textContent = 'Reference C';

    scrollDiv.appendChild(segment1);
    scrollDiv.appendChild(segment2);
    scrollDiv.appendChild(segment3);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('scrolls to matching reference', () => {
    const linkandReference = 'Reference B';

    scrollToLinkandReference(0, linkandReference);

    const matchedSegment = scrollDiv.querySelector(
      '.single-segment:nth-child(2)',
    );
    expect(matchedSegment.scrollIntoView).toBeUndefined();
  });

  test('displays error toast when no matching reference found', () => {
    const linkandReference = 'Reference D';
    const toastErrorSpy = jest.spyOn(toast, 'error');

    scrollToLinkandReference(0, linkandReference);

    expect(toastErrorSpy).toHaveBeenCalledWith('Error while finding refrence');
  });

  test('handles errors when finding references', () => {
    const linkandReference = 'Reference A';
    scrollDiv.querySelectorAll = jest.fn(() => {
      throw new Error('Mock error');
    });
    const toastErrorSpy = jest.spyOn(toast, 'error');

    scrollToLinkandReference(0, linkandReference);

    expect(toastErrorSpy).toHaveBeenCalledWith('Error while finding refrence');
  });
});

describe('replaceHtmlTags', () => {
  it('should replace HTML tags with empty strings', () => {
    const input = '<h1>Title</h1><p>Some text</p>';
    const expectedOutput = 'TitleSome text';
    expect(replaceHtmlTags(input)).toEqual(expectedOutput);
  });

  it('should return the input string if it contains no HTML tags', () => {
    const input = 'Some text';
    expect(replaceHtmlTags(input)).toEqual(input);
  });
});

describe('onBeforeUnload', () => {
  test('adds event listener to document', () => {
    const updateSectionLock = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const cleanup = onBeforeUnload(updateSectionLock);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function),
    );

    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function),
    );
  });

  test('calls updateSectionLock with true when beforeunload event is fired', () => {
    const updateSectionLock = jest.fn();
    onBeforeUnload(updateSectionLock);

    window.dispatchEvent(new Event('beforeunload'));

    expect(updateSectionLock).toHaveBeenCalledTimes(0);
  });

  test('prevents default action of beforeunload event', () => {
    const updateSectionLock = jest.fn();
    const e = new Event('beforeunload');
    const preventDefaultSpy = jest.spyOn(e, 'preventDefault');

    const cleanup = onBeforeUnload(updateSectionLock);

    document.dispatchEvent(e);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);

    cleanup();
  });
});
