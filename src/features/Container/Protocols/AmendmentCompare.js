/* eslint-disable */
import { useEffect, useState } from 'react';
import './compare.scss';

import Grid from 'apollo-react/components/Grid';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Button from 'apollo-react/components/Button';

import { useSelector, useDispatch } from 'react-redux';
import { associateDocs, compareResult } from './protocolSlice.js';

import Sidebar from './Sidebar';

import Loader from '../../Components/Loader/Loader';

function AmendmentCompare({ prot11, prot22 }) {
  const compare = useSelector(compareResult);
  const dispatch = useDispatch();
  const associateData = useSelector(associateDocs);
  const [version1, setVersion1] = useState('');
  // const [prot1, setProt1] = useState({});
  const [version2, setVersion2] = useState('');
  // const [prot2, setProt2] = useState({});

  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch({ type: 'POST_COMPARE_PROTOCOL', payload: null });
    console.log('sif', compare);
  }, []);
  useEffect(() => {
    setVersion1(prot11);
    setVersion2(prot22);
    const postBody = {
      docID: prot11,
      docID2: prot22,
    };
    if (prot11 && prot22) {
      dispatch({ type: 'POST_COMPARE_PROTOCOL', payload: postBody });
    }
  }, [prot11, prot22]);

  const handleCompare = () => {
    if (version1 && version2) {
      if (version1 === version2) {
        alert('can not comapare same version');
      } else {
        const postBody = {
          docID: version1,
          docID2: version2,
        };

        dispatch({ type: 'POST_COMPARE_PROTOCOL', payload: postBody });
      }
    } else {
      alert('Please select both the fields');
    }
  };
  /* istanbul ignore next */
  const handleSelect = (select, id) => {
    if (select === 1) {
      // let obj1 = associateData.find((item) => item.id === id);
      // setProt1(obj1);
      setVersion1(id);
    } else {
      // let obj2 = associateData.find((item) => item.id === id);
      // setProt2(obj2);
      setVersion2(id);
    }
  };
  // const handleDownloadTOC = (data) => {
  //   axios({
  //     url: "http://localhost:4000/create-excel",
  //     method: "POST",
  //     responseType: "blob", // Important
  //     data: compare,
  //   }).then((response) => {
  //     FileDownload(response.data, `${compare.protocolNumber}.xlsx`);
  //   });
  // };

  // const iqvdata = compare.iqvdata ? JSON.parse(compare.iqvdata) : "";
  const iqvdata = compare.iqvdata ? compare.iqvdata : '';
  return (
    <div className="amendment-compare">
      {iqvdata && (
        <Sidebar
          open={open}
          setOpen={setOpen}
          compare={compare}
          // handleDownloadTOC={handleDownloadTOC}
        />
      )}
      {associateData && associateData.length > 1 ? (
        <Grid container>
          <Grid item md={3}>
            <div className="version-dropdown" style={{ width: '90%' }}>
              <Select
                label="Select First Version to Compare"
                value={version1}
                onChange={(e) => {
                  handleSelect(1, e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
                data-testid="select-div1"
              >
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem
                      value={item.id}
                      key={i}
                      data-testid={`compare-option-1${i}`}
                    >
                      {`${item.protocol} (${item.versionNumber})`}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>
          <Grid item md={3}>
            <div
              className="version-dropdown"
              style={{ width: '90%', float: 'right', marginRight: 10 }}
            >
              <Select
                label="Select Second Version to Compare"
                value={version2}
                onChange={(e) => {
                  handleSelect(2, e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
                data-testid="select-div2"
              >
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem
                      value={item.id}
                      key={i}
                      data-testid={`compare-option-2${i}`}
                    >
                      {`${item.protocol} (${item.versionNumber})`}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>

          <Grid md={3} item>
            <div className="compare-button">
              <Button
                variant="primary"
                size="small"
                style={{ marginRight: 10 }}
                onClick={() => handleCompare()}
                data-testid="compare-button"
              >
                Compare
              </Button>
            </div>
          </Grid>
          {/* {iqvdata && (
            <Grid md={3} item>
              <div className="summary-button" data-testid="summary-button-div">
                <Button
                  variant="secondary"
                  icon={<ArrowLeft />}
                  size="small"
                  style={{ marginRight: 10 }}
                  onClick={() => setOpen(!open)}
                  data-testid="summary-button"
                >
                  Summary
                </Button>
              </div>
            </Grid>
          )} */}
        </Grid>
      ) : (
        <div className="single-version">
          <p>This Protocol has only one version.</p>
          <p>So compare option is not available for this Protocol.</p>
        </div>
      )}
      {compare.error && (
        <div className="single-version">
          <p>{compare.message}</p>
        </div>
      )}
      {iqvdata && !compare.error && iqvdata.data.length > 0 && (
        <Grid container>
          <Grid md={12} item>
            {/* <CompareCard
              float="left"
              cardID="first-card"
              data={prot1}
              compare={compare}
            /> */}
          </Grid>
          {/* <Grid md={6}>
            <CompareCard
              float="right"
              cardID="second-card"
              data={prot2}
              compare={compare}
            />
          </Grid> */}
        </Grid>
      )}
      {compare.called && compare.loading && (
        <div
          data-testid="loader"
          style={{
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AmendmentCompare;
