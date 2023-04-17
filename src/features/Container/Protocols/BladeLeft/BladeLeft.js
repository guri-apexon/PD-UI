import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Blade from 'apollo-react/components/Blade';
import { useSelector, useDispatch } from 'react-redux';
import './BladeLeft.scss';

import { protocolTocData, TOCActive } from '../protocolSlice';
import AccordionToc from './AccordionToc';

function BladeLeft({ handlePageNo }) {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [tocActive, setTocActive] = useState([]);
  const tocActiveSelector = useSelector(TOCActive);

  useEffect(() => {
    if (tocActiveSelector) setTocActive(tocActiveSelector);
  }, [tocActiveSelector]);

  const [tocList, setTocList] = useState([]);

  const tocData = useSelector(protocolTocData);

  useEffect(() => {
    if (tocData.data?.length) {
      const temptoc = tocData?.data?.map((item) => ({
        ...item,
        levelNumber: 1,
      }));
      setTocList(temptoc);
    }
  }, [tocData]);

  useEffect(() => {
    if (!open) {
      setOpen(true);
      setExpand(false);
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleChange = (index) => {
    const tempTOCActive = [...tocActive];
    tempTOCActive[index] = !tempTOCActive[index];
    dispatch({
      type: 'SET_TOC_Active',
      payload: {
        data: tempTOCActive,
      },
    });
  };

  const getValue = (index) => {
    const data = tocActive || [];
    if (data) {
      if (data?.length >= index) {
        return data[index];
      }
    }
    return false;
  };

  const accGenerator = (item, sectionIndex, expanded) => {
    return (
      <AccordionToc
        level={item}
        sectionIndex={sectionIndex}
        handlePageNo={handlePageNo}
        expanded={expanded}
        handleChange={handleChange}
        subAccComponent={item?.childlevel?.map((level) => {
          return accGenerator(level, sectionIndex, expanded);
        })}
      />
    );
  };

  return (
    <div className="bladeContainer" ref={wrapperRef}>
      <Blade
        data-testid="toc-component"
        onChange={(e, expanded) => {
          setExpand(expanded);
        }}
        open={open}
        expanded={expand}
        onClose={() => setOpen(false)}
        title="Navigation"
        className="blade"
        width={263}
        marginTop={141}
        hasBackdrop
        BackdropProps={{
          onClick: () => {
            setOpen(false);
          },
        }}
      >
        <div className="toc-wrapper">
          {tocList?.map((item, index) => {
            return accGenerator(item, index, getValue(index));
          })}
        </div>
      </Blade>
    </div>
  );
}
export default BladeLeft;

BladeLeft.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handlePageNo: PropTypes.func,
};
