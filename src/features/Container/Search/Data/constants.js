export const TOC = {
  sectionId: 1,
  sectionName: "Table Of Contents",
  fieldType: "text",
  sectionContent: [
    {
      id: 1,
      title: "Protocol Summary",
    },
    {
      id: 2,
      title: "Introduction",
    },
    {
      id: 3,
      title: "Objectives and [Endpoints and/or Estimands]",
    },
    {
      id: 4,
      title: "Study Design",
    },
    {
      id: 5,
      title: "Study Population",
    },
    {
      id: 6,
      title: "Study Intervention(s) and Concomitant Therapy",
    },
    {
      id: 7,
      title:
        "Discontinuation of Study Intervention and Participant Discontinuation/Withdrawal",
    },
    {
      id: 8,
      title: "Study Assessments and Procedures",
    },
    {
      id: 9,
      title: "Statistical Considerations",
    },
    {
      id: 10,
      title: "Supporting Documentation and Operational Considerations",
    },
    {
      id: 11,
      title: "References",
    },
    {
      id: 12,
      title: "Unmapped",
    },
  ],
};

export const phases = {
  sectionId: 4,
  sectionName: "Phase",
  fieldType: "checkbox",
  sectionContent: [
    {
      id: 1,
      title: "Phase 0",
      value: "Phase 0",
      content: "",
      count: "",
    },
    {
      id: 2,
      title: "Phase 1a",
      value: "Phase 1a",
      content: "",
      count: "",
    },
    {
      id: 3,
      title: "Phase 1b",
      value: "Phase 1b",
      content: "",
      count: "",
    },
    {
      id: 4,
      title: "Phase 2a",
      value: "Phase 2a",
      content: "",
      count: "",
    },
    {
      id: 5,
      title: "Phase 2b",
      value: "Phase 2b",
      content: "",
      count: "",
    },
    {
      id: 6,
      title: "Phase 3a",
      value: "Phase 3a",
      content: "",
      count: "",
    },
    {
      id: 7,
      title: "Phase 3b",
      value: "Phase 3b",
      content: "",
      count: "",
    },
    {
      id: 8,
      title: "Phase 1b/2a",
      value: "Phase 1b/2a",
      content: "",
      count: "",
    },
    {
      id: 9,
      title: "Phase 2b/3a",
      value: "Phase 2b/3a",
      content: "",
      count: "",
    },
    {
      id: 10,
      title: "Phase 1b/2",
      value: "Phase 1b/2",
      content: "",
      count: "",
    },
    {
      id: 11,
      title: "Phase 2b/3",
      value: "Phase 2b/3",
      content: "",
      count: "",
    },
    {
      id: 12,
      title: "Phase 3b/4",
      value: "Phase 3b/4",
      content: "",
      count: "",
    },
  ],
};

export const documentStatus = {
  sectionId: 5,
  sectionName: "Document Status",
  fieldType: "checkbox",
  sectionContent: [
    {
      id: 1,
      title: "Draft",
      value: "draft",
      content: "",
      count: "",
    },
    {
      id: 2,
      title: "Final Approved",
      value: "final",
      content: "",
      count: "",
    },
    // {
    //   id: 3,
    //   title: "Rejected",
    //   value:'rejected',
    //   content: "",
    //   count: "",
    // },
  ],
};
export const qcStatus = {
  sectionId: 9,
  sectionName: "QC Activity",
  fieldType: "checkbox",
  sectionContent: [
    {
      id: 3,
      title: "QC Not Started",
      value: "QC_NOT_STARTED",
      content: "",
      count: "",
    },
    {
      id: 1,
      title: "QC In Progress",
      value: "QC1-QC2",
      content: "",
      count: "",
    },
    {
      id: 2,
      title: "QC Completed",
      value: "QC_COMPLETED",
      content: "",
      count: "",
    },
  ],
};

export const dateType = {
  sectionId: 7,
  sectionName: "Date",
  fieldType: "checkbox",
  sectionContent: [
    {
      id: 1,
      title: "Approval date",
      value: "approval_date",
    },
    {
      id: 2,
      title: "Upload date",
      value: "uploadDate",
    },
  ],
};

export const dateSection = {
  sectionId: 7,
  sectionName: "Date Range",
  fieldType: "radio",
  sectionContent: [
    {
      id: 2,
      title: "Last 6 Months",
      value: "6",
    },
    {
      id: 3,
      title: "Last 12 Months",
      value: "12",
    },
    {
      id: 4,
      title: "Last 5 Years",
      value: "60",
    },
    {
      id: 1,
      title: "All Dates",
      value: "0",
    },
  ],
};
