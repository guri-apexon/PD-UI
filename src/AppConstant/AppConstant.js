const SORT_DROPDOWN = [
  {
    id: "1",
    value: "score",
    label: "Relevancy",
  },
  {
    id: "2",
    value: "approval_date",
    label: "Approval Date",
  },
  {
    id: "3",
    value: "uploadDate",
    label: "Upload Date",
  },
];

export const POST_OBJECT = {
  key: "",
  toc: [],
  sponsor: [],
  indication: [],
  phase: [],
  qcStatus: [],
  documentStatus: [],
  dateType: "approval_date",
  dateFrom: "",
  dateTo: "",
  sortField: "score",
  sortOrder: "desc",
  pageNo: 1,
  pageSize: 10,
  dateSection: "0",
};

const USER_MENU = [
  {
    text: "Dashboard",
    pathname: "/dashboard",
  },
  {
    text: "Protocols",
    pathname: "/protocols",
  },
  {
    text: "Search",
    pathname: "/search",
  },
];
const QC1_MENU = [
  {
    text: "QC",
    pathname: "/qc",
  },
];
const QC2_MENU = [
  {
    text: "Dashboard",
    pathname: "/dashboard",
  },
  {
    text: "Protocols",
    pathname: "/protocols",
  },
  {
    text: "Search",
    pathname: "/search",
  },
  {
    text: "QC",
    pathname: "/qc",
  },
];
const ADMIN_MENU = [
  {
    text: "Dashboard",
    pathname: "/dashboard",
  },
  {
    text: "Protocols",
    pathname: "/protocols",
  },
  {
    text: "Search",
    pathname: "/search",
  },
  {
    text: "Admin",
    pathname: "/admin",
  },
];

const redaction = {
  text: "~REDACTED~",
  hoverText: "Redacted Information",
};
export { SORT_DROPDOWN, USER_MENU, QC1_MENU, QC2_MENU, ADMIN_MENU, redaction };
