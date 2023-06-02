import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import TextField from 'apollo-react/components/TextField';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import difference from 'lodash/difference';
import './MetaData.scss';
import { toast } from 'react-toastify';
import Accordian from './Accordian';
import {
  accordionMetaData,
  accordianMetaParam,
  metadataApiCallValue,
} from '../protocolSlice';
import Loader from '../../../Components/Loader/Loader';
import {
  checkDuplicates,
  flattenMetaParam,
  validationCheck,
  autoCompleteClose,
} from './utilFunction';
import METADATA_CONSTANTS from './constants';
import { loggedUser } from '../../../../store/userDetails';
import { USERTYPE } from '../../../../AppConstant/AppConstant';

function MetaData({ docId }) {
  const wrapperRef = useRef(null);
  const apiResponse = useSelector(metadataApiCallValue);
  const accordianResult = useSelector(accordionMetaData);
  const metaParamResult = useSelector(accordianMetaParam);
  const userDetails = useSelector(loggedUser);
  const dispatch = useDispatch();
  const [rows, setRows] = useState({});
  const [accordianData, setAccordianData] = useState({});
  const [metaParams, setMetaParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [sectionName, setSectionName] = useState(null);
  const [deletedAttributes, setDeletedAttributes] = useState([]);
  const [suggestedList, setSuggestedList] = useState([]);
  const [suggestedSubList, setSuggestedSubList] = useState([]);
  const [currentActiveLevels, setCurrentActiveLevels] = useState([]);
  const [accType, setAccType] = useState('');
  const [secName, setSecName] = useState('');
  const [accordionAdd, setAccordionAdd] = useState([]);
  const [existingAcc, setExistingAcc] = useState(false);
  const handleChange = (event, newValue) => {
    setExistingAcc(true);
    setSectionName(newValue);
  };
  const handleTextChange = (event) => {
    setSecName(event.target.value);
  };
  const handleMenuClick = (label) => () => {
    setAccType(label);
    setIsOpen(!isOpen);
    autoCompleteClose(() => {
      setIsOpen(false);
    });
  };

  const handleTextClick = () => {
    if (secName !== '') {
      setSectionName({ label: secName });
      setSecName('');
    } else {
      toast.error('Please enter a section name');
    }
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
    const checkName = name === 'Summary' ? 'summary_extended' : name;
    dispatch({
      type: 'ADD_METADATA_FIELD',
      payload: {
        op: 'addField',
        docId: existingAcc && docId,
        fieldName: checkName,
        attributes: [],
        reqData: { name, level: 1 },
      },
    });
    setSectionName({ label: '' });
    setExistingAcc(false);
    setIsOpen(false);
  };

  const handleAccordian = (accData) => {
    const selectedData = accordianData[accData.formattedName];
    setAccordianData({
      ...accordianData,
      [accData.formattedName]: {
        ...selectedData,
        isActive: !selectedData?.isActive,
        isEdit: false,
      },
    });
    setCurrentActiveLevels(
      currentActiveLevels.filter(
        (curr) =>
          !(
            curr === accData.formattedName ||
            curr.includes(accData.formattedName)
          ),
      ),
    );
  };

  const handleEdit = (accData, e) => {
    e.stopPropagation();
    const selectedData = accordianData[accData.formattedName];
    setSubSuggestions(accData);
    setRows({
      ...rows,
      // eslint-disable-next-line
      [accData.formattedName]: accData._meta_data ? accData._meta_data : [],
    });
    setAccordianData({
      ...accordianData,
      [accData.formattedName]: {
        ...selectedData,
        isActive: true,
        isEdit: true,
      },
    });
  };

  const handleDiscard = (accData) => {
    const selectedData = accordianData[accData.formattedName];
    setAccordianData({
      ...accordianData,
      [accData.formattedName]: {
        ...selectedData,
        isEdit: false,
      },
    });
    setRows({
      ...rows,
      // eslint-disable-next-line
      [accData?.formattedName]: accData?._meta_data,
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
          formattedName: data.formattedName,
          accData: data,
        },
      },
    });
    setDeletedAttributes([]);
  };

  const filteredAttrVal = (attrType, attrVal) => {
    if (attrType === 'boolean') attrVal = attrVal === 'true';
    else if (attrType === 'array') attrVal = attrVal.split(',');
    return attrVal;
  };

  const postCall = (data, metaData) => {
    const filterMetaList = metaData.filter((list) => list?.attr_status);
    if (filterMetaList?.length) {
      const updatedAttrList = filterMetaList?.map((list) => {
        return {
          attr_name: list?.attr_name,
          attr_type: list?.attr_type || 'string',
          attr_value: filteredAttrVal(list?.attr_type, list?.attr_value),
          note: list?.note || '',
          confidence: list?.confidence || '',
          attr_id: list?.attr_id,
        };
      });
      dispatch({
        type: 'ADD_METADATA_ATTRIBUTES',
        payload: {
          docId,
          fieldName:
            data?.formattedName === 'Summary' ? '' : data?.formattedName,
          attributes: updatedAttrList,
          reqData: {
            formattedName: data?.formattedName,
          },
        },
      });
      setCurrentActiveLevels(
        currentActiveLevels.filter((curr) => curr !== data?.formattedName),
      );
    }
  };

  const handleSave = (accData, e) => {
    e.stopPropagation();
    if (!checkDuplicates(rows[accData?.formattedName])) {
      toast.error('Duplicate attribute');
    } else if (!validationCheck(rows?.[accData?.formattedName])) {
      toast.error('Please fill proper data');
    } else if (accData.name === 'Summary') {
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
      if (deletedAttributes.filter((attr) => attr).length > 0) {
        deleteCall(
          {
            formattedName: 'summary_extended',
            name: 'summary_extended',
          },
          'deleteAttribute',
        );
      }
      postCall(accordianData[accData?.formattedName], filterNonCustomData);
    } else {
      const accMetaData = rows[accData?.formattedName]
        ? rows[accData?.formattedName]
        : [];
      if (deletedAttributes.length > 0) {
        deleteCall(accordianData[accData?.formattedName], 'deleteAttribute');
      }
      postCall(accordianData[accData?.formattedName], accMetaData);
    }
  };

  const handleDelete = (accData, e) => {
    e.stopPropagation();
    deleteCall(accordianData[accData?.formattedName], 'deleteField');
  };

  const addSubAccordion = (accData, name) => {
    dispatch({
      type: 'ADD_METADATA_FIELD',
      payload: {
        op: 'addField',
        docId,
        fieldName: `${accData?.formattedName}.${name}`,
        attributes: [],
        reqData: {
          accData,
          name,
        },
      },
    });
    setSectionName({ label: '' });
    setCurrentActiveLevels(
      currentActiveLevels.filter((curr) => curr !== accData?.formattedName),
    );
  };
  useEffect(() => {
    const accData = METADATA_CONSTANTS.METADATA_ADD_LIST.map((obj) => {
      return { ...obj, onClick: handleMenuClick(obj.label) };
    });
    if (userDetails.user_type !== USERTYPE.ADMIN) {
      setAccordionAdd(
        accData.filter(
          (x) => x.label === METADATA_CONSTANTS.METADATA_ADD_LIST[1].label,
        ),
      );
    } else {
      setAccordionAdd(accData);
    }
  }, [METADATA_CONSTANTS.METADATA_ADD_LIST]);

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
    if (!isEmpty(metaParams) && !isEmpty(accordianData)) {
      const updatedParam = {};
      const result = flattenMetaParam(updatedParam, metaParamResult, 1);
      const accordianFilterData = Object.assign(
        {},
        ...Object.entries(accordianData)
          .filter(([k, v]) => {
            return v?.is_active;
          })
          .map(([k, v]) => ({ [k]: v })),
      );

      let metaList = [];
      const filterItems = difference(
        Object.keys(metaParamResult),
        Object.keys(accordianFilterData),
      );

      if (filterItems.length > 0) {
        filterItems.forEach((names) => {
          if (names !== 'summary_extended') {
            metaList = [...metaList, { label: names }];
          }
        });
      }
      setSuggestedList(metaList);
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
        fieldName: '',
      },
    });
    dispatch({
      type: 'GET_METADATA_VARIABLE',
      payload: {
        op: 'metaparam',
        docId: '',
        fieldName: '',
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
        fetchMetaData();
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
            ...accordianData,
            [apiResponse.reqData.name]: obj,
          });
          fetchMetaData();
        } else {
          const obj = {
            name: apiResponse?.reqData?.name,
            formattedName: `${apiResponse?.reqData?.accData?.formattedName}.${apiResponse?.reqData?.name}`,
            isEdit: false,
            isActive: false,
            _meta_data: [],
            level: apiResponse.reqData.accData.level + 1,
            _childs: [],
          };
          const selectedData =
            accordianData[apiResponse?.reqData?.accData?.formattedName];
          setAccordianData({
            ...accordianData,
            [apiResponse.reqData?.accData?.formattedName]: {
              ...selectedData,
              // eslint-disable-next-line
              _childs: selectedData?._childs
                ? // eslint-disable-next-line
                  [...selectedData._childs, apiResponse?.reqData?.formattedName]
                : [apiResponse?.reqData?.name],
            },
            [apiResponse?.reqData?.formattedName]: obj,
          });
        }
      } else if (apiResponse?.op === 'deleteAttribute') {
        const selectedData = accordianData[apiResponse?.reqData?.formattedName];
        setAccordianData({
          ...accordianData,
          [apiResponse?.reqData?.formattedName]: {
            ...selectedData,
            isEdit: false,
            // eslint-disable-next-line
            _meta_data: selectedData?._meta_data.filter(
              (attr) => !apiResponse.attributeNames.includes(attr.attr_name),
            ),
          },
        });
      } else {
        fetchMetaData();
      }
    }
    // eslint-disable-next-line
  }, [apiResponse]);

  const accGenerator = (key, acc) => {
    return (
      <div key={key} className="metadata_item" data-testid="metadataaccordian">
        <Accordian
          accData={acc}
          rows={rows}
          metaParams={metaParams}
          sectionName={sectionName}
          suggestedSubList={suggestedSubList}
          deletedAttributes={deletedAttributes}
          currentActiveLevels={currentActiveLevels}
          setCurrentActiveLevels={setCurrentActiveLevels}
          setSuggestedSubList={setSuggestedSubList}
          setSectionName={setSectionName}
          setRows={setRows}
          handleAccordian={() => handleAccordian(acc)}
          handleSave={(e) => handleSave(acc, e)}
          handleDelete={(e) => handleDelete(acc, e)}
          handleEdit={(e) => handleEdit(acc, e)}
          handleDiscard={() => handleDiscard(acc)}
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
      <div className="metadata-panel-heading" ref={wrapperRef}>
        <div className="metadat-flex-plus"> Metadata </div>
        <div className="metadata-flex metadata-plus-icon">
          <IconMenuButton
            id="actions-2"
            menuItems={accordionAdd}
            size="small"
            data-testid="three-dot-menu"
          >
            <EllipsisVertical />
          </IconMenuButton>
        </div>
        {isOpen &&
          accType === METADATA_CONSTANTS.METADATA_ADD_LIST[1].label && (
            <div className="add-section-field">
              <AutocompleteV2
                label=""
                className="selectField"
                placeholder="Select or type section name"
                source={suggestedList}
                fullWidth
                forcePopupIcon
                showClearIndicator
                value={sectionName}
                onChange={handleChange}
                size="small"
                data-testId="add-exist-section"
              />
            </div>
          )}
        {isOpen &&
          accType === METADATA_CONSTANTS.METADATA_ADD_LIST[0].label && (
            <div className="add-section-field">
              <TextField
                className="nameField"
                placeholder="Type section name"
                icon={<Plus size="small" />}
                onChange={(e) => handleTextChange(e)}
                iconProps={{
                  onClick: handleTextClick,
                }}
                size="small"
                inputProps={{ 'data-testid': 'add-new-section' }}
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
            return (
              value.level === 1 && value?.is_active && accGenerator(key, value)
            );
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
