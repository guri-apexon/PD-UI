import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import difference from 'lodash/difference';
import './MetaData.scss';
import Accordian from './Accordian';
import {
  accordionMetaData,
  accordianMetaParam,
  metadataApiCallValue,
} from '../protocolSlice';
import Loader from '../../../Components/Loader/Loader';
import { flattenMetaParam } from './utilFunction';

function MetaData({ docId }) {
  const wrapperRef = useRef(null);
  const apiResponse = useSelector(metadataApiCallValue);
  const accordianResult = useSelector(accordionMetaData);
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
    const checkName = name === 'summary' ? 'summary_extended' : name;
    dispatch({
      type: 'ADD_METADATA_FIELD',
      payload: {
        op: 'addField',
        docId,
        fieldName: checkName,
        attributes: [],
        reqData: { name, level: 1 },
      },
    });
    setSectionName({ label: '' });
    setIsOpen(false);
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

  const deleteCall = (data, opName) => {
    dispatch({
      type: 'DELETE_METADATA',
      payload: {
        op: opName,
        docId,
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
    const updatedAttrList = metaData?.map((list) => {
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
        docId,
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
        docId,
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
      const updatedParam = {};
      const result = flattenMetaParam(updatedParam, metaParamResult, 1);
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
        docId,
      },
    });
    dispatch({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        op: 'metaparam',
        docId,
      },
    });
  };

  useEffect(() => {
    fetchMetaData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (apiResponse?.status) {
      if (apiResponse.op === 'addAttributes') {
        const selectedData = accordianData[apiResponse.reqData.name];
        let accMetaData =
          apiResponse?.reqData?.formattedName === 'summary_extended'
            ? rows.summary
            : rows[apiResponse?.reqData?.formattedName] || [];
        accMetaData = accMetaData.map((metaData) => {
          return {
            ...metaData,
            display_name: metaData.attr_name,
          };
        });
        setAccordianData({
          ...accordianData,
          [apiResponse.reqData.name]: {
            ...selectedData,
            isEdit: false,
            _meta_data: [...accMetaData],
          },
        });
      } else if (apiResponse.op === 'addField') {
        if (apiResponse?.reqData?.level === 1) {
          const obj = {
            name: apiResponse?.reqData?.name,
            formattedName: apiResponse?.reqData?.name,
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
            name: apiResponse?.reqData?.name,
            formattedName: `${apiResponse.reqData.accData.formattedName}.${apiResponse.reqData.name}`,
            isEdit: false,
            isActive: false,
            _meta_data: [],
            level: apiResponse.reqData.accData.level + 1,
            _childs: [],
          };
          const selectedData =
            accordianData[apiResponse?.reqData?.accData?.name];
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
  docId: PropTypes.isRequired,
};
