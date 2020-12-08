import React from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";

export const CompositeTable = ({ data }) => (
  <div>
    <div className="width85" style={{marginTop:10}}>
      <div className="Multiline-block50h">
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Indication:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.indication}
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Phase:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.phase}
        </span>
      </div>
      <div className="Multiline-block50h">
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Sponsor:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.sponsor}
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Source Document:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.sourceDocument}
        </span>
      </div>
      <div className="Multiline-block50h">
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Molecule/Device:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.molecule}
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          Approval Date:
        </span>
        <span className="MuiTypography-root-42 Table-subtitle-6 MuiTypography-caption-45 MuiTypography-displayBlock-71 width25">
          {data.approvalDate}
        </span>
      </div>
    </div>
    <div className="width100 search-inner-table">
      <Table columns={columns} rows={data.rows} size="small" hidePagination />
    </div>
  </div>
);
