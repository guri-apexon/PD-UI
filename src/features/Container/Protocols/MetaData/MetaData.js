/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import TextField from 'apollo-react/components/TextField';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import './MetaData.scss';
import Accordian from './Accordian';
import { metaDataVariable } from '../protocolSlice';

function MetaData() {
  const metaDataSelector = useSelector(metaDataVariable);
  const dispatch = useDispatch();
  const [accordianData, setAccordianData] = useState([]);
  const [rows, setRows] = useState({});
  const [metaDataList, setMetaDataList] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [sectionName, setSectionName] = useState(null);

  const addToAccordion = (e) => {
    if (e.key === 'Enter') {
      const obj = {
        name: sectionName,
        isEdit: false,
        isActive: false,
        metaData: [],
      };
      setAccordianData([...accordianData, obj]);
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
          };
        }
        return rowData;
      }),
    });
  };

  const handleAccordian = (index) => {
    const accordianvalue = JSON.parse(JSON.stringify(accordianData));
    accordianvalue[index].isActive = !accordianvalue[index].isActive;
    accordianvalue[index].isEdit = false;
    setRows({
      ...rows,
      [accordianData[index].name]: accordianData[index].metaData,
    });
    setAccordianData(accordianvalue);
  };

  const handleEdit = (index, e) => {
    e.stopPropagation();
    setAccordianData(
      accordianData.map((acc, i) => {
        if (index === i) {
          return {
            ...acc,
            isEdit: true,
            isActive: true,
          };
        }
        return acc;
      }),
    );
  };

  const handleSave = (name, index, e) => {
    e.stopPropagation();
    setAccordianData(
      accordianData.map((acc, i) => {
        if (index === i) {
          const accMetaData =
            rows[acc?.name].length > 0 ? rows[acc?.name] : acc.metaData;
          return {
            ...acc,
            isEdit: false,
            metaData: [...accMetaData, ...metaDataList[acc?.name]],
          };
        }
        return acc;
      }),
    );
    setMetaDataList({
      ...metaDataList,
      [name]: [],
    });
  };

  const handleDelete = (e, index) => {
    e.stopPropagation();
    setAccordianData(accordianData.filter((data, i) => index !== i));
  };

  const addSubAccordion = (index, e, name) => {
    if (e.key === 'Enter') {
      const obj = {
        name,
        isEdit: false,
        isActive: false,
        metaData: [],
      };
      setAccordianData(
        accordianData.map((data, i) => {
          if (i === index) {
            return {
              ...data,
              subAccList: data?.subAccList ? [...data.subAccList, obj] : [obj],
            };
          }
          return data;
        }),
      );
      setSectionName(null);
      setIsOpenSubText(false);
    }
  };

  useEffect(() => {
    // const updatedData = metaDataSelector?.data?.map((each) => {
    //   return {
    //     ...each,
    //     metaData: each.metaData?.map((list, index) => {
    //       return {
    //         ...list,
    //         id: index + 1,
    //       };
    //     }),
    //   };
    // });
    // setAccordianData(updatedData);
    setAccordianData(metaDataSelector.data);
  }, [metaDataSelector.data]);

  useEffect(() => {
    dispatch({
      type: 'GET_METADATA_VARIABLE',
    });
  }, []);

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
          <div style={{ maxWidth: 400 }}>
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
        {accordianData?.map((level1, index1) => {
          return (
            <div
              key={React.key}
              className="metadata_item"
              data-testid="metadataaccordian"
            >
              <Accordian
                isMain
                accData={level1}
                metaDataList={metaDataList}
                isOpenSubText={isOpenSubText}
                sectionName={sectionName}
                setSectionName={setSectionName}
                setIsOpenSubText={setIsOpenSubText}
                setMetaDataList={setMetaDataList}
                handleAccordian={() => handleAccordian(index1)}
                handleSave={(e) => handleSave(level1.name, index1, e)}
                handleDelete={(e) => handleDelete(e, index1)}
                handleEdit={(e) => handleEdit(index1, e)}
                updateRows={updateRows}
                addSubAccordion={(e, name) => addSubAccordion(index1, e, name)}
                subAccComponent={level1?.subAccList?.map((subAcc, subIndex) => {
                  return (
                    <Accordian
                      key={subAcc?.name}
                      isMain={false}
                      accData={subAcc}
                      metaDataList={metaDataList}
                      setMetaDataList={setMetaDataList}
                      handleAccordian={() => handleAccordian(subIndex)}
                      handleSave={(e) => handleSave(subAcc.name, subIndex, e)}
                      handleEdit={(e) => handleEdit(subIndex, e)}
                      updateRows={updateRows}
                    />
                  );
                })}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MetaData;
