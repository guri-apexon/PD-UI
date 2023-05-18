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
      api,
      data,
      colDef: { field },
    } = props;
    const displayName = data?.[field]?.[TableConst.VALUE_TEXT1] ?? '';

    const [value, setValue] = useState(displayName);
    const refInput = useRef(null);
    useEffect(() => {
      const listener = (event) => {
        if (!refInput.current || refInput.current.contains(event.target)) {
          return;
        }
        api.stopEditing();
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [refInput, api]);
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
        className="content-cell-editing-Item"
      />
    );
  }),
);
TextEditor.propTypes = {
  data: PropTypes.isRequired,
  colDef: PropTypes.isRequired,
  api: PropTypes.isRequired,
};
export default TextEditor;
