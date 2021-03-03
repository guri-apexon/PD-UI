const  SORT_DROPDOWN=[
    {
        id:'1',
        value:'score',
        label:'Relevancy'
    },
    {
        id:'2',
        value:'approvalDate',
        label:'Approval Date'
    },
    {
        id:'3',
        value:'uploadDate',
        label:'Upload Date'
    }
]


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
    }
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
    }
  ];
export {SORT_DROPDOWN,USER_MENU, QC1_MENU, QC2_MENU };