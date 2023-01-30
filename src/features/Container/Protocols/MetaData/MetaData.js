import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import './MetaData.scss';
import { isObject } from 'lodash';
import Accordian from './Accordian';
import { metaDataVariable } from '../protocolSlice';

function MetaData({ protocolId }) {
  const wrapperRef = useRef(null);
  const metaDataSelector = useSelector(metaDataVariable);
  const dispatch = useDispatch();
  const [accordianData, setAccordianData] = useState({});
  const [rows, setRows] = useState({});
  const [metaDataList, setMetaDataList] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [sectionName, setSectionName] = useState(null);
  const [standardList, setStandardList] = useState([]);
  const [suggestedList, setSuggestedList] = useState([
    { label: 'Objective and Endpoints' },
    { label: 'Adverse Events' },
  ]);

  const [suggestedSubList, setSuggestedSubList] = useState([
    { label: 'Primary Objective/Endpoint' },
    { label: 'Secondary Objective/Endpoints' },
    { label: 'Tertiary objectives/Endpoints' },
    { label: 'Safety objectives/Endpoints' },
    { label: 'Long Term Extension objectives' },
    { label: 'Lab Data' },
  ]);

  const handleChange = (event, newValue) => {
    setSectionName(newValue);
  };

  const addToAccordion = (name) => {
    const obj = {
      name,
      isEdit: false,
      isActive: false,
      _meta_data: [],
      level: 1,
      _childs: [],
    };
    setAccordianData({
      ...accordianData,
      [name]: obj,
    });
    setSectionName(null);
    setIsOpen(false);
  };

  const updateRows = (data, name) => {
    setRows({
      ...rows,
      [name]: rows[name]?.map((rowData) => {
        if (data?.id === rowData?.id) {
          return {
            ...rowData,
            attr_value: data?.attr_value,
            attr_name: data?.attr_name,
            notes: data?.notes,
          };
        }
        return rowData;
      }),
    });
  };
  const deleteRows = (data, name) => {
    setRows({
      ...rows,
      [name]: data,
    });
  };

  const handleAccordian = (accData) => {
    const selectedData = accordianData[accData.name];
    setAccordianData({
      ...accordianData,
      [accData.name]: {
        ...selectedData,
        isActive: !selectedData.isActive,
        isEdit: false,
      },
    });
    setIsOpenSubText(false);
  };

  const handleEdit = (accData, e) => {
    e.stopPropagation();
    const selectedData = accordianData[accData.name];
    setRows({
      ...rows,
      // eslint-disable-next-line
      [accData.name]: accData._meta_data,
    });
    setAccordianData({
      ...accordianData,
      [accData.name]: {
        ...selectedData,
        isActive: true,
        isEdit: true,
      },
    });
  };

  const handleSave = (accData, e) => {
    e.stopPropagation();
    const selectedData = accordianData[accData.name];
    const accMetaData =
      // eslint-disable-next-line
      rows[accData?.name].length > 0 ? rows[accData?.name] : accData._meta_data;
    const filterMetaData = metaDataList[accData?.name] || [];
    setAccordianData({
      ...accordianData,
      [accData.name]: {
        ...selectedData,
        isEdit: false,
        _meta_data: [...accMetaData, ...filterMetaData],
      },
    });
    setMetaDataList({
      ...metaDataList,
      [accData.name]: [],
    });
    setRows({
      ...rows,
      [accData.name]: [],
    });
  };

  const handleDelete = (accData, e) => {
    e.stopPropagation();
    if (accData.level !== 1) {
      const filterData = Object.entries(accordianData).find(([key, value]) =>
        // eslint-disable-next-line
        value?._childs?.includes(accData.name),
      );
      setAccordianData({
        ...accordianData,
        [filterData[0]]: {
          ...accordianData[filterData[0]],
          // eslint-disable-next-line
          _childs: accordianData[filterData[0]]._childs.filter(
            (list) => list !== accData.name,
          ),
        },
      });
    } else {
      const copyOfObject = { ...accordianData };
      delete copyOfObject[accData.name];
      setAccordianData({ ...copyOfObject });
    }
  };

  const addSubAccordion = (accData, name) => {
    const obj = {
      name,
      isEdit: false,
      isActive: false,
      _meta_data: [],
      level: accData.level + 1,
      _childs: [],
    };
    const selectedData = accordianData[accData.name];
    setAccordianData({
      ...accordianData,
      [accData.name]: {
        ...selectedData,
        // eslint-disable-next-line
        _childs: selectedData?._childs
          ? // eslint-disable-next-line
            [...selectedData._childs, name]
          : [name],
      },
      [name]: obj,
    });
    setSectionName(null);
    setIsOpenSubText(false);
  };

  const updatedData = {};
  const flattenObject = (data, level) => {
    const objectKeys = data ? Object?.keys(data) : [];
    objectKeys?.forEach((key) => {
      const keyValue = data?.[key];
      if (isObject(keyValue) && key !== '_meta_data' && key !== '_childs') {
        updatedData[key] = updatedData[key]
          ? updatedData[key]
          : {
              // eslint-disable-next-line
              _meta_data: keyValue._meta_data,
              name: key,
              level,
              isActive: false,
              isEdit: false,
              // eslint-disable-next-line
              _childs: keyValue?._childs ? keyValue?._childs : [],
            };
        // eslint-disable-next-line
        if (keyValue && keyValue?._childs && keyValue?._childs.length > 0) {
          flattenObject(keyValue, level + 1);
        }
      }
    });
    setAccordianData(updatedData);
  };

  useEffect(() => {
    flattenObject(metaDataSelector?.data?.data, 1);
  }, [metaDataSelector?.data?.data]);

  useEffect(() => {
    dispatch({
      type: 'GET_METADATA_VARIABLE',
      // payload: {
      //   docId: protocolId,
      // },
    });
    // eslint-disable-next-line
  }, []);

  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //         setIsOpen(false);
  //       }
  //     }
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, [wrapperRef]);

  const accGenerator = (key, acc) => {
    return (
      <div key={key} className="metadata_item" data-testid="metadataaccordian">
        <Accordian
          standardList={standardList}
          accData={acc}
          metaDataList={metaDataList}
          isOpenSubText={isOpenSubText}
          sectionName={sectionName}
          suggestedSubList={suggestedSubList}
          setSuggestedSubList={setSuggestedSubList}
          setSectionName={setSectionName}
          setIsOpenSubText={setIsOpenSubText}
          setMetaDataList={setMetaDataList}
          handleAccordian={() => handleAccordian(acc)}
          handleSave={(e) => handleSave(acc, e)}
          handleDelete={(e) => handleDelete(acc, e)}
          handleEdit={(e) => handleEdit(acc, e)}
          updateRows={updateRows}
          deleteRows={deleteRows}
          addSubAccordion={(name) => addSubAccordion(acc, name)}
          // eslint-disable-next-line
          subAccComponent={acc?._childs?.map((subAcc) => {
            return accGenerator(subAcc, accordianData?.[subAcc]);
          })}
        />
      </div>
    );
  };

  useEffect(() => {
    if (sectionName) {
      addToAccordion(sectionName.label);
      setSuggestedList(
        suggestedList.filter((list) => list.label !== sectionName.label),
      );
    }
    // eslint-disable-next-line
  }, [sectionName]);

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading " ref={wrapperRef}>
        <div className="metadat-flex-plus"> Metadata </div>
        <div className="metadata-flex metadata-plus-icon">
          <Plus
            size="small"
            className="metadata-plus-size"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div style={{ maxWidth: 400 }}>
            <AutocompleteV2
              label=""
              className="nameField"
              placeholder="Select or type section name"
              source={suggestedList}
              fullWidth
              forcePopupIcon
              showClearIndicator
              value={sectionName}
              onChange={handleChange}
              size="small"
            />
          </div>
        )}
      </div>
      <div className="_meta_data-boarder">
        {Object.entries(accordianData).map(([key, value]) => {
          return value.level === 1 && accGenerator(key, value);
        })}
      </div>
    </Card>
  );
}

export default MetaData;

MetaData.propTypes = {
  protocolId: PropTypes.isRequired,
};
