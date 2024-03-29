/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import Search from 'apollo-react/components/Search';

import { CheckboxCard, DateRangeCard, CheckboxTest } from './CustomFilterCards';

import Loader from '../../Components/Loader/Loader';
import './handleSearch.scss';

import {
  TOC,
  documentStatus,
  qcStatus,
  dateSection,
  dateType,
} from './Data/constants';

const searchWords = (nameKey, myArray) => {
  const arr = [];
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].title.toLowerCase().includes(nameKey.toLowerCase())) {
      arr.push({ ...myArray[i] });
    }
  }
  return arr;
};
function HandleSearch(props) {
  const {
    sectiondata,
    onConstructSearchQuery,
    searchQuery,
    clearAll,
    forSection,
  } = props;

  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [noResult, setNoResult] = useState(false);
  useEffect(() => {
    setData(sectiondata);
  }, [sectiondata]);
  useEffect(() => {
    if (clearAll && typed !== '') {
      setTyped('');
      setData(sectiondata);
      setIndex(index + 1);
    }
  }, [clearAll]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typed) {
        const newArr = searchWords(typed, sectiondata.sectionContent);
        if (newArr.length !== 0) {
          setData({ success: true, sectionContent: newArr });
          setIndex(index + 1);
          setNoResult(false);
        } else {
          setData({ success: true, sectionContent: newArr });
          setIndex(index + 1);
          setNoResult(true);
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [typed]);
  const handleTextChange = (value) => {
    setTyped(value);
    if (value === '') {
      setData(sectiondata);
      setIndex(index + 1);
    }
  };
  return (
    <Collapsible trigger={`${forSection}s`}>
      <div className="handle-search-component">
        <Search
          placeholder="Search"
          onChange={(e) => handleTextChange(e.target.value)}
          value={typed}
          fullWidth
        />
      </div>
      {data.sectionContent && data.sectionContent.length > 0 ? (
        <CheckboxTest
          key={index}
          section={data}
          identifier={forSection}
          onCheckboxClick={onConstructSearchQuery}
          listValue={searchQuery[forSection]}
          clearAll={clearAll}
        />
      ) : (
        !noResult && (
          <div
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Loader />
          </div>
        )
      )}
      {noResult && (
        <div className="no-result">
          No {forSection} found for keyword searched. Please try something else.
        </div>
      )}
    </Collapsible>
  );
}

function CollapseCard({
  name,
  indicationData,
  sponsorData,
  phaseData,
  onConstructSearchQuery,
  searchQuery,
  dateRangeValue,
  clearAll,
}) {
  if (name === 'TOC') {
    return (
      <div data-testid="toc-checkboxes">
        <Collapsible trigger={TOC.sectionName}>
          {TOC.sectionContent && TOC.sectionContent.length > 0 && (
            <CheckboxCard
              section={TOC}
              identifier="toc"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.toc}
            />
          )}
        </Collapsible>
      </div>
    );
  }
  if (name === 'indication') {
    return (
      <div className="spon-container" data-testid="indication-checkboxes">
        {indicationData.sectionContent &&
          indicationData.sectionContent.length > 0 && (
            <HandleSearch
              sectiondata={indicationData}
              onConstructSearchQuery={onConstructSearchQuery}
              searchQuery={searchQuery}
              clearAll={clearAll}
              forSection="indication"
            />
          )}
      </div>
    );
  }
  if (name === 'sponsor') {
    return (
      <div className="spon-container" data-testid="sponsor-checkboxes">
        {sponsorData.sectionContent &&
          sponsorData.sectionContent.length > 0 && (
            <HandleSearch
              sectiondata={sponsorData}
              onConstructSearchQuery={onConstructSearchQuery}
              searchQuery={searchQuery}
              clearAll={clearAll}
              forSection="sponsor"
            />
          )}
      </div>
    );
  }
  if (name === 'phase') {
    return (
      <div data-testid="phase-checkboxes">
        <Collapsible trigger="Phase">
          {phaseData.loader && (
            <div
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Loader />
            </div>
          )}
          {phaseData.sectionContent && phaseData.sectionContent.length > 0 && (
            <CheckboxCard
              section={phaseData}
              identifier="phase"
              onCheckboxClick={onConstructSearchQuery}
              listValue={searchQuery.phase}
            />
          )}
          {phaseData.sectionContent &&
            phaseData.sectionContent.length === 0 &&
            !phaseData.loader && (
              <div
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <p style={{ padding: 10, textAlign: 'center' }} />​
              </div>
            )}
        </Collapsible>
      </div>
    );
  }
  if (name === 'document') {
    return (
      <div data-testid="document-checkboxes">
        <Collapsible trigger={documentStatus.sectionName}>
          <CheckboxCard
            section={documentStatus}
            identifier="documentStatus"
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.documentStatus}
          />
        </Collapsible>
      </div>
    );
  }
  if (name === 'qcStatus') {
    return (
      <div data-testid="qc-activity-checkboxes">
        <Collapsible trigger="QC Activity">
          <CheckboxCard
            section={qcStatus}
            identifier="qcStatus"
            onCheckboxClick={onConstructSearchQuery}
            listValue={searchQuery.qcStatus}
          />
        </Collapsible>
      </div>
    );
  }
  if (name === 'date') {
    return (
      <span className="date-filter">
        <Collapsible
          trigger={dateSection.sectionName}
          classname="testing"
          style={{ height: '550px', float: 'left', width: '100%' }}
        >
          <DateRangeCard
            section={dateSection}
            dateType={dateType}
            identifier="dateType"
            identifier2="dateSection"
            onCheckboxClick={onConstructSearchQuery}
            listValue={
              searchQuery.dateType &&
              searchQuery.dateType.length > 0 &&
              searchQuery.dateType[0]
            }
            listValue2={
              searchQuery.dateSection &&
              searchQuery.dateSection.length > 0 &&
              searchQuery.dateSection[0]
            }
            dateRangeValue={dateRangeValue}
            clearAll={clearAll}
          />
        </Collapsible>
      </span>
    );
  }
  return null;
}

export default CollapseCard;
