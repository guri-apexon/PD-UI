import { useEffect, useRef, useState } from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, difference } from 'lodash';
import './MetaData.scss';
import Accordian from './Accordian';
import {
  accordionMetaData,
  accordianMetaParam,
  metadataApiCallValue,
} from '../protocolSlice';
import Loader from '../../../Components/Loader/Loader';
import {
  apiResponseFun,
  handleSaveFun,
  metaParamResultAndAccordian,
} from './utilFunction';

const docId = '0be44992-9573-4010-962c-de1a1b18b08d';

function MetaData() {
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
    // eslint-disable-next-line
    metaParams?.[data.name]?.dropDownList.length > 0 &&
      setSuggestedSubList(
        difference(
          metaParams?.[data.name]?.dropDownList,
          // eslint-disable-next-line
          data?._childs,
        ).map((names) => {
          return { label: names };
        }),
      );
  };

  const addToAccordion = (name) => {
    let checkName = name;
    if (name === 'summary') {
      checkName = 'summary_extended';
    }
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
    // eslint-disable-next-line
    const name = accData._meta_data || [];
    const selectedData = accordianData[accData.name];
    setSubSuggestions(accData);
    setRows({
      ...rows,
      // eslint-disable-next-line
      [accData.name]: name,
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
      const bool = list?.attr_type;
      const attrValue =
        bool === 'boolean' ? convertToBoolean : list?.attr_value;
      return {
        attr_name: list?.attr_name,
        attr_type: list?.attr_type || 'string',
        attr_value: attrValue,
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
    handleSaveFun(
      accData,
      rows,
      postCall,
      deletedAttributes,
      deleteCall,
      accordianData,
    );
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
    // eslint-disable-next-line
    !isEmpty(accordianResult) && setAccordianData(accordianResult);
  }, [accordianResult]);

  useEffect(() => {
    // eslint-disable-next-line
    !isEmpty(metaParamResult) && setMetaParams(metaParamResult);
  }, [metaParamResult]);

  useEffect(() => {
    metaParamResultAndAccordian(
      metaParamResult,
      accordianData,
      setSuggestedList,
      setMetaParams,
    );
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
    apiResponseFun(
      apiResponse,
      accordianData,
      rows,
      setAccordianData,
      fetchMetaData,
    );
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    sectionName?.label &&
      addToAccordion(sectionName.label) &&
      setSuggestedList(
        suggestedList.filter((list) => list.label !== sectionName.label),
      );
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
