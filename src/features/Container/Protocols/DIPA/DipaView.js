import { useState, useEffect } from 'react';
import Grid from 'apollo-react/components/Grid/Grid';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import DipaViewStructure from './DipaViewStructure';
import data from './Data';

const dropDownData = [
  'Inclusion Criteria',
  'Exclusion Criteria',
  'Primary Endpoints',
];

function DipaView() {
  const [sections, setAllSections] = useState([]);
  const [selectedSection, setSection] = useState();
  const [metadata, setMetadata] = useState([]);
  const handleSectionChnage = (e) => {
    setSection(e.target.value);
  };
  const fetchSectionList = () => {
    setAllSections(dropDownData);
    setSection(dropDownData[0]);
  };

  const fetchMetadata = () => {
    const getChildElements = (elements) =>
      elements?.map((d) => ({
        ...d,
        open: false,
        child: getChildElements(d?.child || []),
      }));
    setMetadata(getChildElements(data[0].output));
  };
  useEffect(() => {
    fetchSectionList();
    fetchMetadata();
  }, []);

  const handleExpandChange = (panelID) => {
    const updateOpenValue = (array) =>
      array.map((section) => ({
        ...section,
        open: section?.ID === panelID ? !section.open : section.open,
        child: section.child?.length
          ? updateOpenValue(section.child, true)
          : section.child,
      }));

    const tempMetadata = updateOpenValue(metadata);

    setMetadata([...tempMetadata]);
  };

  const addSegment = (parentId) => {
    const getUpdatedMetadata = (array) =>
      array.map((section) => ({
        ...section,
        derive_seg:
          section?.ID === parentId
            ? [{ ID: '', derive_seg: '' }, ...section.derive_seg]
            : section.derive_seg,
      }));
    setMetadata([...getUpdatedMetadata(metadata)]);
  };

  const derivedlength = [];
  metadata?.map((item) => derivedlength.push(item.derive_seg));
  const dl = derivedlength.flat(1);
  const lenghthdc = dl.map((item) => item?.derive_seg);

  const arr = [];
  metadata?.map((section) =>
    section.child.length !== 0 ? arr.push(section.child) : '',
  );

  const childarr = arr.flat(1);
  const arr2 = [];
  childarr?.map((item) =>
    item.child.length !== 0 ? arr2.push(item?.child) : '',
  );

  const childderivedseg = childarr?.map((item) => item?.derive_seg?.length);

  let sum = 0;
  for (let i = 0; i < childderivedseg.length; i++) {
    sum += childderivedseg[i];
  }

  const paraDerivedcount = lenghthdc.length + sum + arr2.length;

  return (
    <div>
      <div className="dipaview-continer" data-testid="dipa-view-sample">
        <Grid container spacing={1} className="dipa-view-table">
          <h3>DIPA View</h3>
          <Grid container item xs={5} data-testid="select">
            <Grid item xs={12} className="drop-down" data-testid="select">
              <Select
                value={selectedSection}
                defaultValue={dropDownData[0]}
                onChange={handleSectionChnage}
                placeholder="Select item..."
                fullWidth
                data-testid="select-box"
              >
                {sections.map((item) => (
                  <MenuItem key={item} value={item} data-testid="menu-item">
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={7} container spacing={1} className="dipa-view-count">
            <Grid item xs={5} className="dipa-actualcount">
              Actual Count
              <br />
              <span data-testid="actual-count">
                <b>{Object?.keys(metadata).length}</b>
              </span>
            </Grid>
            <Grid item xs={5} className="dipa-derivedcount">
              Derived Count
              <br />
              <span data-testid="derived-count">
                <b>{paraDerivedcount}</b>
              </span>
            </Grid>
          </Grid>
        </Grid>
        <div data-testid="structure-component">
          {metadata.map((section, index) => (
            <DipaViewStructure
              key={section.actual_text}
              ID={section.ID}
              actualText={section.actual_text}
              level={section.level}
              segments={section.derive_seg}
              childs={section.child}
              open={section.open}
              index={index}
              handleExpandChange={handleExpandChange}
              handleAdd={addSegment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default DipaView;
