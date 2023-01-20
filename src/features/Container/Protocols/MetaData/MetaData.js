import React, { useEffect, useState } from 'react';
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
  const [standardList, setStandardList] = useState([]);

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

  const handleAccordian = (mainIndex, subIndex, type) => {
    if (type === 'mainSection') {
      setRows({
        ...rows,
        [accordianData[mainIndex].name]: accordianData[mainIndex].metaData,
      });
      setAccordianData(
        accordianData.map((data, i) => {
          if (i === mainIndex) {
            return {
              ...data,
              isActive: !data.isActive,
              isEdit: false,
            };
          }
          return data;
        }),
      );
    } else {
      const updatedAccData = accordianData.map((data, i) => {
        if (i === mainIndex) {
          data?.subAccList?.map((subData, subI) => {
            if (subI === subIndex) {
              setRows({
                ...rows,
                [data.subAccList[subIndex].name]:
                  data.subAccList[subIndex].metaData,
              });
              subData.isActive = !subData.isActive;
            }
            return subData;
          });
        }
        return data;
      });
      setAccordianData(updatedAccData);
    }
  };

  const handleEdit = (index, e, subIndex, type) => {
    e.stopPropagation();
    if (type === 'mainSection') {
      setRows({
        ...rows,
        [accordianData[index].name]: accordianData[index].metaData,
      });
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
    } else {
      setAccordianData(
        accordianData.map((data, i) => {
          if (i === index) {
            data?.subAccList?.map((subData, subI) => {
              if (subI === subIndex) {
                setRows({
                  ...rows,
                  [data.subAccList[subIndex].name]:
                    data.subAccList[subIndex].metaData,
                });
                subData.isActive = true;
                subData.isEdit = true;
              }
              return subData;
            });
          }
          return data;
        }),
      );
    }
  };

  const handleSave = (name, index, subIndex, e, type) => {
    e.stopPropagation();
    if (type === 'mainSection') {
      setAccordianData(
        accordianData.map((acc, i) => {
          if (index === i) {
            const accMetaData =
              rows[acc?.name].length > 0 ? rows[acc?.name] : acc.metaData;
            const filterMetaData = metaDataList[acc?.name] || [];
            return {
              ...acc,
              isEdit: false,
              metaData: [...accMetaData, ...filterMetaData],
            };
          }
          return acc;
        }),
      );
    } else {
      setAccordianData(
        accordianData.map((data, i) => {
          if (i === index) {
            data?.subAccList?.map((subData, subI) => {
              if (subI === subIndex) {
                const accMetaData =
                  rows[subData?.name].length > 0
                    ? rows[subData?.name]
                    : subData.metaData;
                const filterMetaData = metaDataList[subData?.name] || [];
                subData.metaData = [...accMetaData, ...filterMetaData];
                subData.isEdit = false;
              }
              return subData;
            });
          }
          return data;
        }),
      );
    }
    setMetaDataList({
      ...metaDataList,
      [name]: [],
    });
    setRows({
      ...rows,
      [name]: [],
    });
  };

  const handleDelete = (e, index, subIndex, type) => {
    e.stopPropagation();
    if (type === 'mainSection') {
      setAccordianData(accordianData.filter((data, i) => index !== i));
    } else {
      setAccordianData(
        accordianData.map((data, i) => {
          if (i === index) {
            return {
              ...data,
              subAccList: data?.subAccList.filter(
                (subData, subI) => subI !== subIndex,
              ),
            };
          }
          return data;
        }),
      );
    }
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
    setAccordianData(metaDataSelector.data);
    setStandardList(
      metaDataSelector?.data?.map((list) => {
        return list.name;
      }),
    );
  }, [metaDataSelector.data]);

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
                standardList={standardList}
                accData={level1}
                metaDataList={metaDataList}
                isOpenSubText={isOpenSubText}
                sectionName={sectionName}
                setSectionName={setSectionName}
                setIsOpenSubText={setIsOpenSubText}
                setMetaDataList={setMetaDataList}
                handleAccordian={() =>
                  handleAccordian(index1, null, 'mainSection')
                }
                handleSave={(e) =>
                  handleSave(level1.name, index1, null, e, 'mainSection')
                }
                handleDelete={(e) =>
                  handleDelete(e, index1, null, 'mainSection')
                }
                handleEdit={(e) => handleEdit(index1, e, null, 'mainSection')}
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
                      handleAccordian={() =>
                        handleAccordian(index1, subIndex, 'subSection')
                      }
                      handleDelete={(e) =>
                        handleDelete(e, index1, subIndex, 'subSection')
                      }
                      handleSave={(e) =>
                        handleSave(
                          subAcc.name,
                          index1,
                          subIndex,
                          e,
                          'subSection',
                        )
                      }
                      handleEdit={(e) =>
                        handleEdit(index1, e, subIndex, 'subSection')
                      }
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
