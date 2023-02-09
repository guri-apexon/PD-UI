import { render, fireEvent, screen } from '@testing-library/react';
import ContentEditable from 'react-contenteditable';

describe('EditFootNote', () => {
  it('should render content editable', () => {
    render(
      <ContentEditable
        className="contentEditable"
        html="Enter Your Text Here"
        onChange={jest.fn()}
        onBlur={jest.fn()}
        tagName="div"
        data-placeholder="Enter Your Text Here"
      />,
    );
    const contentEditable =
      document.getElementsByClassName('contentEditable')[0];
    expect(contentEditable).toBeInTheDocument();
  });

  it('should be blur on content editable', () => {
    render(
      <ContentEditable
        className="contentEditable"
        html="Enter Your Text Here"
        onChange={jest.fn()}
        onBlur={jest.fn()}
        tagName="div"
        data-placeholder="Enter Your Text Here"
      />,
    );
    const contentEditable =
      document.getElementsByClassName('contentEditable')[0];
    fireEvent.blur(contentEditable);
  });

  it('should be change on content editable', () => {
    render(
      <ContentEditable
        className="contentEditable"
        html="Enter Your Text Here"
        onChange={jest.fn()}
        onBlur={jest.fn()}
        tagName="div"
        data-placeholder="Enter Your Text Here"
      />,
    );
    const contentEditable =
      document.getElementsByClassName('contentEditable')[0];
    fireEvent.change(contentEditable);
    expect(screen.getByText('Enter Your Text Here')).toBeInTheDocument();
  });
});
