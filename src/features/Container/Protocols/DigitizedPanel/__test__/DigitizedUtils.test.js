import { toast } from 'react-toastify';
import { scrollToLinkandReference, replaceHtmlTags } from '../utils';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('scrollToLinkandReference', () => {
  it('should scroll to the reference if found', () => {
    const scrollableDiv = document.createElement('div');
    scrollableDiv.classList.add('readable-content-wrapper');
    scrollableDiv.textContent = 'Lorem ipsum reference';
    scrollableDiv.scrollTop = 100;

    const section = document.createElement('div');
    section.classList.add('section-single-content');
    section.appendChild(scrollableDiv);

    document.body.appendChild(section);

    scrollToLinkandReference(0, 'reference');
    expect(scrollableDiv.scrollTop).toBeGreaterThan(0);
  });

  it('should show an error toast if an error occurs', () => {
    const section = document.createElement('div');
    section.classList.add('section-single-content');

    document.body.appendChild(section);

    jest.spyOn(console, 'error').mockImplementation(() => {});
    scrollToLinkandReference(0, 'reference');
    expect(toast.error).toHaveBeenCalledWith('Error while finding refrence');
    console.error.mockRestore();
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
