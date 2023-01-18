/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card/Card';
import Plus from 'apollo-react-icons/Plus';
import './MetaData.scss';
import initialRows from './Records.json';
import patientBurdern from './patientBurdern.json';
import MetaDataEdit from './MetaDataEdit';
import Accordian from './Accordian';

function MetaData() {
  const accordianArray = [
    {
      name: 'Summary Fields',
      isEdit: false,
      isActive: false,
      tableData: initialRows,
    },
    {
      name: 'Patient Burden Variables',
      isEdit: false,
      isActive: false,
      tableData: patientBurdern,
    },
  ];

  const [accordianData, setAccordianData] = useState(accordianArray);
  const [rows, setRows] = useState({});
  const [metaDataList, setMetaDataList] = useState({});

  const updateRows = (data, name) => {
    setRows({
      ...rows,
      [name]: rows[name].map((rowData) => {
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
    const accordianvalue = [...accordianData];
    accordianvalue[index].isActive = !accordianvalue[index].isActive;
    accordianvalue[index].isEdit = false;
    setRows({
      ...rows,
      [accordianData[index].name]: accordianData[index].tableData,
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
          return {
            ...acc,
            isEdit: false,
            tableData: [...rows[acc?.name], ...metaDataList[acc?.name]],
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

  const addSubAccordion = (index) => {
    const obj = {
      name: '',
      isEdit: false,
      isActive: false,
      tableData: initialRows,
    };
    setAccordianData(
      accordianData.map((data, i) => {
        if (i === index) {
          return {
            ...data,
            subAccList: data?.subAccList ? [...data.subAccList, obj] : obj,
          };
        }
        return data;
      }),
    );
  };

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading ">
        <div className="metadat-flex-plus"> Metadata </div>
        <div className="metadata-flex metadata-plus-icon">
          <Plus size="small" className="metadata-plus-size " />
        </div>
      </div>
      <div className="metaData-boarder">
        {accordianData?.map((level1, index1) => {
          return (
            <div key={React.key} className="metadata_item">
              <Accordian
                accData={level1}
                metaDataList={metaDataList}
                setMetaDataList={setMetaDataList}
                handleAccordian={() => handleAccordian(index1)}
                handleSave={(e) => handleSave(level1.name, index1, e)}
                handleEdit={(e) => handleEdit(index1, e)}
                updateRows={updateRows}
                addSubAccordion={() => addSubAccordion(index1)}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MetaData;
