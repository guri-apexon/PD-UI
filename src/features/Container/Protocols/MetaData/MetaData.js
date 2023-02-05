import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import { difference, isEmpty, isObject } from 'lodash';
import './MetaData.scss';
import { toast } from 'react-toastify';
import Accordian from './Accordian';
import {
  accordianMetaData,
  accordianMetaParam,
  metadataApiCallValue,
} from '../protocolSlice';
import Loader from '../../../Components/Loader/Loader';
import { flattenMetaParam } from './utilFunction';

function MetaData({ protocolId }) {
  const wrapperRef = useRef(null);
  const apiResponse = useSelector(metadataApiCallValue);
  const accordianResult = useSelector(accordianMetaData);
  const metaParamResult = useSelector(accordianMetaParam);
  const standardList = ['summary'];
  const dispatch = useDispatch();
  const [rows, setRows] = useState({});
  const [accordianData, setAccordianData] = useState({});
  const [metaParams, setMetaParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [sectionName, setSectionName] = useState(null);
  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [suggestedList, setSuggestedList] = useState([]);

  const [suggestedSubList, setSuggestedSubList] = useState([]);

  const handleChange = (event, newValue) => {
    setSectionName(newValue);
  };

  const setSubSuggestions = (data) => {
    if (metaParams?.[data.name]?.dropDownList.length > 0) {
      const filterItems = difference(
        metaParams?.[data.name]?.dropDownList,
        // eslint-disable-next-line
        data?._childs,
      );

      setSuggestedSubList(
        filterItems.map((names) => {
          return { label: names };
        }),
      );
    }
  };

  const addToAccordion = (name) => {
    dispatch({
      type: 'ADD_METADATA_FIELD',
      payload: {
        op: 'addField',
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
        fieldName: name,
        attributes: [],
        reqData: {
          name,
          level: 1,
        },
      },
    });
    setSectionName({ label: '' });
    setIsOpen(false);
  };

  const handleAccordian = (accData) => {
    console.log('Helo ACCORDION');
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
    setSubSuggestions(accData);
    setRows({
      ...rows,
      // eslint-disable-next-line
      [accData.name]: accData._meta_data ? accData._meta_data : [],
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

  const formValidation = (list) => {
    let valid = true;
    const keys = Object.keys(list[0]);
    list.forEach((data) => {
      keys.forEach((key) => {
        if (key !== 'id' && key !== 'isCustom' && isEmpty(data[key])) {
          valid = false;
        }
        return valid;
      });
    });
    return valid;
  };

  const deleteCall = (data, opName) => {
    dispatch({
      type: 'DELETE_METADATA',
      payload: {
        op: opName,
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
        fieldName: data.formattedName,
        attributeNames: deletedAttributes,
        reqData: {
          name: data.name,
          accData: data,
        },
      },
    });
    setDeletedAttributes([]);
  };

  const postCall = (data, metaData) => {
    const updatedAttrList = metaData.map((list) => {
      const convertToBoolean = list?.attr_value === 'true';
      return {
        attr_name: list?.attr_name,
        attr_type: list?.attr_type || 'string',
        attr_value:
          list?.attr_type === 'boolean' ? convertToBoolean : list?.attr_value,
        note: list?.note || '',
        confidence: list?.confidence || '',
      };
    });
    dispatch({
      type: 'ADD_METADATA_ATTRIBUTES',
      payload: {
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
        fieldName: data.formattedName === 'summary' ? '' : data.formattedName,
        attributes: updatedAttrList,
        reqData: {
          name: data.name,
        },
      },
    });
  };

  const handleSave = (accData, e) => {
    e.stopPropagation();
    // if (formValidation(rows?.[accData?.name])) {
    if (accData.name === 'summary') {
      const filterCustomData = rows[accData?.name]?.filter(
        (data) => data?.isCustom,
      );
      const filterNonCustomData = rows[accData?.name]?.filter(
        (data) => !data?.isCustom,
      );
      if (filterCustomData?.length > 0) {
        postCall(
          {
            formattedName: 'summary_extended',
            name: 'summary_extended',
          },
          filterCustomData,
        );
      }
      if (deletedAttributes.length > 0) {
        deleteCall(
          {
            formattedName: 'summary_extended',
            name: 'summary_extended',
          },
          'deleteAttribute',
        );
      }
      postCall(accordianData[accData.name], filterNonCustomData);
    } else {
      const accMetaData = rows[accData?.name] ? rows[accData?.name] : [];
      if (deletedAttributes.length > 0) {
        deleteCall(accordianData[accData.name], 'deleteAttribute');
      }
      postCall(accordianData[accData.name], accMetaData);
    }
    // } else {
    //   toast('Please fill all custom field values');
    // }
  };

  const handleDelete = (accData, e) => {
    e.stopPropagation();
    deleteCall(accordianData[accData.name], 'deleteField');
  };

  const addSubAccordion = (accData, name) => {
    dispatch({
      type: 'ADD_METADATA_FIELD',
      payload: {
        op: 'addField',
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
        fieldName: `${accData.formattedName}.${name}`,
        attributes: [],
        reqData: {
          accData,
          name,
        },
      },
    });
    setSectionName({ label: '' });
    setIsOpenSubText(false);
  };

  useEffect(() => {
    if (!isEmpty(accordianResult)) {
      setAccordianData(accordianResult);
    }
  }, [accordianResult]);
  useEffect(() => {
    if (!isEmpty(metaParamResult)) {
      setMetaParams(metaParamResult);
    }
  }, [metaParamResult]);

  useEffect(() => {
    if (!isEmpty(metaParamResult) && !isEmpty(accordianData)) {
      const result = flattenMetaParam(metaParamResult, 1);
      let metaList = [];
      const filterItems = difference(
        Object.keys(metaParamResult),
        Object.keys(accordianData),
      );

      if (filterItems.length > 0) {
        filterItems.forEach((names) => {
          if (names !== 'summary_extended') {
            metaList = [...metaList, { label: names }];
          }
        });
        setSuggestedList(metaList || []);
      }
      setMetaParams(result);
    }
    // eslint-disable-next-line
  }, [metaParamResult, accordianData]);

  const fetchMetaData = () => {
    dispatch({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        op: 'metadata',
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
      },
    });
    dispatch({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        op: 'metaparam',
        docId: '0be44992-9573-4010-962c-de1a1b18b08d',
      },
    });
  };

  useEffect(() => {
    fetchMetaData();
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

  useEffect(() => {
    if (apiResponse?.status) {
      if (apiResponse.op === 'addAttributes') {
        const selectedData = accordianData[apiResponse.reqData.name];
        const accMetaData =
          apiResponse?.reqData?.name === 'summary_extended'
            ? rows.summary
            : rows[apiResponse?.reqData?.name];
        setAccordianData({
          ...accordianData,
          [apiResponse.reqData.name]: {
            ...selectedData,
            isEdit: false,
            _meta_data: [...accMetaData],
          },
        });
      } else if (apiResponse.op === 'addField') {
        if (apiResponse.reqData.level === 1) {
          const obj = {
            name: apiResponse.reqData.name,
            formattedName: apiResponse.reqData.name,
            isEdit: false,
            isActive: false,
            _meta_data: [],
            level: 1,
            _childs: [],
          };
          setAccordianData({
            [apiResponse.reqData.name]: obj,
          });
        } else {
          const obj = {
            name: apiResponse.reqData.name,
            formattedName: `${apiResponse.reqData.accData.formattedName}.${apiResponse.reqData.name}`,
            isEdit: false,
            isActive: false,
            _meta_data: [],
            level: apiResponse.reqData.accData.level + 1,
            _childs: [],
          };
          const selectedData = accordianData[apiResponse.reqData.accData.name];
          setAccordianData({
            ...accordianData,
            [apiResponse.reqData.accData.name]: {
              ...selectedData,
              // eslint-disable-next-line
              _childs: selectedData?._childs
                ? // eslint-disable-next-line
                  [...selectedData._childs, apiResponse.reqData.name]
                : [apiResponse.reqData.name],
            },
            [apiResponse.reqData.name]: obj,
          });
        }
      } else {
        fetchMetaData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse]);

  const accGenerator = (key, acc) => {
    return (
      <div key={key} className="metadata_item" data-testid="metadataaccordian">
        <Accordian
          standardList={standardList}
          accData={acc}
          rows={rows}
          metaParams={metaParams}
          isOpenSubText={isOpenSubText}
          sectionName={sectionName}
          suggestedSubList={suggestedSubList}
          deletedAttributes={deletedAttributes}
          setSuggestedSubList={setSuggestedSubList}
          setSectionName={setSectionName}
          setIsOpenSubText={setIsOpenSubText}
          setRows={setRows}
          handleAccordian={() => handleAccordian(acc)}
          handleSave={(e) => handleSave(acc, e)}
          handleDelete={(e) => handleDelete(acc, e)}
          handleEdit={(e) => handleEdit(acc, e)}
          addSubAccordion={(name) => addSubAccordion(acc, name)}
          setDeletedAttributes={setDeletedAttributes}
          // eslint-disable-next-line
          subAccComponent={acc?._childs?.map((subAcc) => {
            return accGenerator(subAcc, accordianData?.[subAcc]);
          })}
        />
      </div>
    );
  };

  useEffect(() => {
    if (sectionName?.label) {
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
      {isEmpty(accordianData) ? (
        <div className="loader sasasas">
          <Loader />
        </div>
      ) : (
        <div className="_meta_data-boarder">
          {Object?.entries(accordianData || {}).map(([key, value]) => {
            return value.level === 1 && accGenerator(key, value);
          })}
        </div>
      )}
    </Card>
  );
}

export default MetaData;

MetaData.propTypes = {
  protocolId: PropTypes.isRequired,
};
