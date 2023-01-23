import React, { useEffect, useRef, useState } from 'react';
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
  const [accordianData, setAccordianData] = useState([]);
  const [rows, setRows] = useState({});
  const [metaDataList, setMetaDataList] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [sectionName, setSectionName] = useState(null);
  const [standardList, setStandardList] = useState([]);

  const findDeep = (accData, level, name) => {
    return accData?.find((data) => {
      if (data.level === level && data.name === name) return data;
      return findDeep(data?.subAccList, level, name);
    });
  };

  const addToAccordion = (e) => {
    if (e.key === 'Enter') {
      const obj = {
        name: sectionName,
        isEdit: false,
        isActive: false,
        metaData: [],
        level: 1,
        subAccList: [],
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
    setAccordianData(
      accordianData.map((data) => {
        if (accData.name === data.name) {
          return {
            ...data,
            isActive: !data.isActive,
            isEdit: false,
          };
        }
        return data;
      }),
    );
  };

  const handleEdit = (accData, e) => {
    e.stopPropagation();
    setAccordianData(
      accordianData.map((data) => {
        if (accData.name === data.name) {
          setRows({
            ...rows,
            [data.name]: data.metaData,
          });
          return {
            ...data,
            isActive: true,
            isEdit: true,
          };
        }
        console.log('data', data);
        return data;
      }),
    );
  };

  const handleSave = (accData, e) => {
    e.stopPropagation();
    setAccordianData(
      accordianData.map((acc) => {
        if (accData.name === acc.name) {
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
    setMetaDataList({
      ...metaDataList,
      [accData.name]: [],
    });
    setRows({
      ...rows,
      [accData.name]: [],
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

  const addSubAccordion = (accData, e, name) => {
    if (e.key === 'Enter') {
      const obj = {
        name,
        isEdit: false,
        isActive: false,
        metaData: [],
        level: accData.level + 1,
        subAccList: [],
      };
      setAccordianData(
        accordianData.map((data) => {
          if (data.name === accData.name) {
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
    const updatedData = metaDataSelector?.data?.map((list) => {
      return {
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

  const accGenerator = (acc, num) => {
    // if (acc?.subAccList?.length !== 0) {
    //   acc?.subAccList?.map((subAcc) => {
    //     return accGenerator(subAcc, num + 1);
    //   });
    // }
    return (
      <div
        key={React.key}
        className="metadata_item"
        data-testid="metadataaccordian"
      >
        <Accordian
          isMain
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
          // handleDelete={(e) => handleDelete(e, index1, null, 'mainSection')}
          handleEdit={(e) => handleEdit(acc, e)}
          updateRows={updateRows}
          deleteRows={deleteRows}
          addSubAccordion={(e, name) => addSubAccordion(acc, e, name)}
          subAccComponent={acc?.subAccList?.map((subAcc) => {
            return accGenerator(subAcc, num + 1);
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

  console.log('accordianData', accordianData);

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
        {accordianData?.map((level) => {
          return accGenerator(level, 0);
          // return (
          //   <div
          //     key={React.key}
          //     className="metadata_item"
          //     data-testid="metadataaccordian"
          //   >
          //     <Accordian
          //       isMain
          //       standardList={standardList}
          //       accData={level1}
          //       metaDataList={metaDataList}
          //       isOpenSubText={isOpenSubText}
          //       sectionName={sectionName}
          //       setSectionName={setSectionName}
          //       setIsOpenSubText={setIsOpenSubText}
          //       setMetaDataList={setMetaDataList}
          //       handleAccordian={() =>
          //         handleAccordian(index1, null, 'mainSection')
          //       }
          //       handleSave={(e) =>
          //         handleSave(level1.name, index1, null, e, 'mainSection')
          //       }
          //       handleDelete={(e) =>
          //         handleDelete(e, index1, null, 'mainSection')
          //       }
          //       handleEdit={(e) => handleEdit(index1, e, null, 'mainSection')}
          //       updateRows={updateRows}
          //       addSubAccordion={(e, name) => addSubAccordion(index1, e, name)}
          //       subAccComponent={level1?.subAccList?.map((subAcc, subIndex) => {
          //         return (
          //           <Accordian
          //             key={subAcc?.name}
          //             isMain={false}
          //             accData={subAcc}
          //             metaDataList={metaDataList}
          //             setMetaDataList={setMetaDataList}
          //             handleAccordian={() =>
          //               handleAccordian(index1, subIndex, 'subSection')
          //             }
          //             handleDelete={(e) =>
          //               handleDelete(e, index1, subIndex, 'subSection')
          //             }
          //             handleSave={(e) =>
          //               handleSave(
          //                 subAcc.name,
          //                 index1,
          //                 subIndex,
          //                 e,
          //                 'subSection',
          //               )
          //             }
          //             handleEdit={(e) =>
          //               handleEdit(index1, e, subIndex, 'subSection')
          //             }
          //             updateRows={updateRows}
          //           />
          //         );
          //       })}
          //     />
          //   </div>
          // );
        })}
      </div>
    </Card>
  );
}

export default MetaData;
