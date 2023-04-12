/* eslint-disable */
import { render, fireEvent } from '@testing-library/react';
import CustomFileUpload from './CustomFileUpload';

jest.useFakeTimers();
describe('customDropdown test', () => {
  test('Should render CustomFileUplaod', async () => {
    const container = render(<CustomFileUpload />);
  });
  test('Should Delete File in Custom File', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.doc', {
      type: 'application/msword',
    });
    const formFile = [file];
    const setUploadFile = jest.fn();
    const handleFileUploadError = jest.fn();
    const container = render(
      <CustomFileUpload
        formSelectedFiles={formFile}
        handleFileUploadError={handleFileUploadError}
        setUploadFile={setUploadFile}
      />,
    );
    const button =
      container.getByTestId('custom-file-upload').children[0].children[1]
        .children[1].children[0].children[0].children[1].children[1];
    fireEvent.click(button);
  });

  test('Should Upload File in Custom File', async () => {
    jest.setTimeout(1500000);
    const file = new File(['(⌐□_□)'], 'chucknorris.doc', {
      type: 'application/msword',
    });
    const formFile = [file];
    const setUploadFile = jest.fn();
    const handleFileUploadError = jest.fn();
    // const handleUpload = jest.fn();
    const container = render(
      <CustomFileUpload
        formSelectedFiles={[]}
        handleFileUploadError={handleFileUploadError}
        setUploadFile={setUploadFile}
      />,
    );
    const input =
      container.getByTestId('custom-file-upload').children[0].children[0];
    fireEvent.change(input, { target: { files: formFile } });
    jest.useFakeTimers();
    jest.advanceTimersByTime(1000);
    jest.runAllTimers();
  });
});
