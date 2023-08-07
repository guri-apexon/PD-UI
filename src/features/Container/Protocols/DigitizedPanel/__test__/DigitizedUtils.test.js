import { toast } from 'react-toastify';
import { render } from '@testing-library/react';

import {
  scrollToLinkandReference,
  replaceHtmlTags,
  renderAuditInfo,
  tablePopup,
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

describe('renderAuditInfo', () => {
  it('returns "-----" when item object is undefined', () => {
    const names = { keyName: 'last_reviewed_date' };
    const expected = '-----';
    const result = renderAuditInfo(undefined, names);
    expect(result).toEqual(expected);
  });

  test('renders itemVal when keyName is not "last_reviewed_date"', () => {
    const itemVal = 'Some Value';
    const keyName = 'some_key';
    const { getByText } = render(
      <div>{renderAuditInfo(itemVal, keyName)}</div>,
    );
    expect(getByText(itemVal)).toBeInTheDocument();
  });

  test('renders formatted itemVal when keyName is "last_reviewed_date" and itemVal is valid', () => {
    const itemVal = '2023-05-01T12:34:56Z';
    const keyName = 'last_reviewed_date';
    const { getByText } = render(
      <div>{renderAuditInfo(itemVal, keyName)}</div>,
    );
    const formattedDate = '01-May-2023 08:34'; // Adjust the expected formatted date based on your timezone
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  test('renders "-----" when keyName is "last_reviewed_date" and itemVal is invalid', () => {
    const itemVal = 'Invalid Date';
    const keyName = 'last_reviewed_date';
    const { getByText } = render(
      <div>{renderAuditInfo(itemVal, keyName)}</div>,
    );
    expect(getByText('-----')).toBeInTheDocument();
  });
});

describe('tablePopup', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; // clear body before each test
  });

  test('it should add a div element to the body', () => {
    const mockEvent = {
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
    };
    tablePopup(mockEvent, jest.fn());

    const tableEnrichedPopup = document.querySelector(
      '.table-enriched-place-holder',
    );
    expect(tableEnrichedPopup).toBeInTheDocument();
  });

  test('it should add click event listener to the div element', () => {
    const mockCallback = jest.fn();
    const mockEvent = {
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) },
    };
    tablePopup(mockEvent, mockCallback);

    const tableEnrichedPopup = document.querySelector(
      '.table-enriched-place-holder',
    );
    tableEnrichedPopup.click();

    expect(mockCallback).toHaveBeenCalled();
  });

  test('it should set the correct position for the div element', () => {
    const mockEvent = {
      currentTarget: { getBoundingClientRect: () => ({ left: 100, top: 200 }) },
    };
    tablePopup(mockEvent, jest.fn());

    const tableEnrichedPopup = document.querySelector(
      '.table-enriched-place-holder',
    );
    expect(tableEnrichedPopup.style.position).toBe('absolute');
    expect(tableEnrichedPopup.style.left).toBe('100px');
    expect(tableEnrichedPopup.style.top).toBe('240px');
  });
});
