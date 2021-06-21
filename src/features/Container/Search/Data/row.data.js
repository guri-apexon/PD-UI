const data = {
  protocols: [
    {
      protocolNumber: "Prot-ABCDE",
      protocolDescription:
        "A Multicenter, Randomized, Phase lb/II Trail to Evaluate the Efficacy, Safety",
      indication: "Covid-19",
      phase: "2",
      sponsor: "Eli Lilly",
      sourceDocument: "Prot-ABCDE.pdf",
      molecule: "Sample Drug",
      approvalDate: "05/05/2020",
      followed: true,

      rows: [
        {
          version: "1.2",
          draft: "N/A",
          sourceDocument: "Prot-ABCDE-v10.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
        {
          version: "1.1",
          draft: "N/A",
          sourceDocument: "Prot-ABCDE-v11.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
        {
          version: "1.3",
          draft: "1",
          sourceDocument: "Prot-ABCDE-v12.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
      ],
    },
    {
      protocolNumber: "Prot-ABCDE-New",
      protocolDescription:
        "A Multicenter, Randomized, Phase lb/II Trail to Evaluate the Efficacy, Safety",
      indication: "Covid-19",
      phase: "2",
      sponsor: "Eli Lilly",
      sourceDocument: "Prot-ABCDE.pdf",
      molecule: "Sample Drug",
      approvalDate: "05/05/2020",
      followed: false,

      rows: [
        {
          version: "1.2",
          draft: "N/A",
          sourceDocument: "Prot-ABCDE-v10.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
        {
          version: "1.1",
          draft: "N/A",
          sourceDocument: "Prot-ABCDE-v11.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
        {
          version: "1.3",
          draft: "1",
          sourceDocument: "Prot-ABCDE-v12.pdf",
          uploadDate: "05/05/2020",
          documentStatus: "Draft",
        },
      ],
    },
  ],
};

export default data;
