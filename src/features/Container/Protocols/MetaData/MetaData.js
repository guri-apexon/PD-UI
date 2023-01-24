import { useEffect, useRef, useState } from 'react';
import TextField from 'apollo-react/components/TextField';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import './MetaData.scss';
import Accordian from './Accordian';
import { metaDataVariable } from '../protocolSlice';

function MetaData() {
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

  const addToAccordion = (e) => {
    if (e.key === 'Enter') {
      const obj = {
        name: sectionName,
        isEdit: false,
        isActive: false,
        metaData: [],
        level: 1,
        child: [],
      };
      setAccordianData({
        ...accordianData,
        [sectionName]: obj,
      });
      setSectionName(null);
      setIsOpen(false);
    }
  };

  const updateRows = (data, name) => {
    setRows({
      ...rows,
      [name]: rows[name]?.map((rowData) => {
        if (data?.id === rowData?.id) {
          return {
            ...rowData,
            name: data?.name,
            header: data?.header,
            note: data?.note,
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
      [accData.name]: accData.metaData,
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
      rows[accData?.name].length > 0 ? rows[accData?.name] : accData.metaData;
    const filterMetaData = metaDataList[accData?.name] || [];
    setAccordianData({
      ...accordianData,
      [accData.name]: {
        ...selectedData,
        isEdit: false,
        metaData: [...accMetaData, ...filterMetaData],
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
        value?.child?.includes(accData.name),
      );
      setAccordianData({
        ...accordianData,
        [filterData[0]]: {
          ...accordianData[filterData[0]],
          child: accordianData[filterData[0]].child.filter(
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

  const addSubAccordion = (accData, e, name) => {
    if (e.key === 'Enter') {
      const obj = {
        name,
        isEdit: false,
        isActive: false,
        metaData: [],
        level: accData.level + 1,
        child: [],
      };
      const selectedData = accordianData[accData.name];
      setAccordianData({
        ...accordianData,
        [accData.name]: {
          ...selectedData,
          child: selectedData?.child ? [...selectedData.child, name] : [name],
        },
        [name]: obj,
      });
      setSectionName(null);
      setIsOpenSubText(false);
    }
  };

  useEffect(() => {
    const updatedData = {};
    metaDataSelector?.data?.forEach((list) => {
      updatedData[list.name] = updatedData[list.name]
        ? updatedData[list.name]
        : {
            ...list,
            level: 1,
          };
    });
    setAccordianData(updatedData);
    setStandardList(
      metaDataSelector?.data?.map((list) => {
        return list.name;
      }),
    );
  }, [metaDataSelector.data]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const accGenerator = (key, acc) => {
    return (
      <div key={key} className="metadata_item" data-testid="metadataaccordian">
        <Accordian
          standardList={standardList}
          accData={acc}
          metaDataList={metaDataList}
          isOpenSubText={isOpenSubText}
          sectionName={sectionName}
          setSectionName={setSectionName}
          setIsOpenSubText={setIsOpenSubText}
          setMetaDataList={setMetaDataList}
          handleAccordian={() => handleAccordian(acc)}
          handleSave={(e) => handleSave(acc, e)}
          handleDelete={(e) => handleDelete(acc, e)}
          handleEdit={(e) => handleEdit(acc, e)}
          updateRows={updateRows}
          deleteRows={deleteRows}
          addSubAccordion={(e, name) => addSubAccordion(acc, e, name)}
          subAccComponent={acc?.child?.map((subAcc) => {
            return accGenerator(subAcc, accordianData?.[subAcc]);
          })}
        />
      </div>
    );
  };

  useEffect(() => {
    dispatch({
      type: 'GET_METADATA_VARIABLE',
    });
  }, [dispatch]);

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading ">
        <div className="metadat-flex-plus"> Metadata </div>
        <div className="metadata-flex metadata-plus-icon">
          <Plus
            size="small"
            className="metadata-plus-size"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div style={{ maxWidth: 400 }} ref={wrapperRef}>
            <TextField
              label=""
              placeholder="Select or type section name"
              className="nameField"
              fullWidth
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              onKeyPress={(e) => addToAccordion(e)}
              size="small"
            />
          </div>
        )}
      </div>
      <div className="metaData-boarder">
        {Object.entries(accordianData).map(([key, value]) => {
          return value.level === 1 && accGenerator(key, value);
        })}
      </div>
    </Card>
  );
}

export default MetaData;
