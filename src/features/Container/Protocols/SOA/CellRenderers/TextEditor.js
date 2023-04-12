import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import '../SOA.scss';
import { TableConst } from '../Constants';

// eslint-disable-next-line
const TextEditor = memo(
  forwardRef((props, ref) => {
    const {
      data,
      colDef: { field },
    } = props;
    const displayName = data?.[field]?.[TableConst.VALUE_TEXT1] ?? '';

    const [value, setValue] = useState(displayName);
    const refInput = useRef(null);
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          return value;
        },
      };
    });
    useEffect(() => {
      refInput?.current?.focus();
    }, [refInput]);

    return (
      <input
        data-testid="editing-cell"
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="header-editing-Item"
      />
    );
  }),
);
TextEditor.propTypes = {
  data: PropTypes.isRequired,
  colDef: PropTypes.isRequired,
};
export default TextEditor;
