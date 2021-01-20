const FilterANDOR = {
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: "advanced",
            fields: [],
          },
        },
      ],
      filter: {
        bool: {
          must: [
            {
              terms: {
                "Indication.keyword": [
                  "none",
                  "Numerics word , Countries, Country (..",
                ],
              },
            },
            {
              terms: {
                "SponsorName.keyword": [
                  "AstraZeneca",
                  "Numerics word , Countries, Country (..",
                ],
              },
            },
          ],
        },
      },
    },
  },
  size: 1000,
  _source: [
    "AiDocId",
    "ProtocolNo",
    "ProtocolTitle",
    "SponsorName",
    "Indication",
    "DocumentStatus",
    "phase",
    "approval_date",
    "uploadDate",
    "MoleculeDevice",
  ],
};

const isActiveQuery = {
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: "",
            fields: [],
          },
        },
      ],
      filter: {
        bool: {
          must: [
            {
              term: {
                is_active: 1,
              },
            },
          ],
        },
      },
    },
  },
  size: 1000,
  _source: [
    "AiDocId",
    "ProtocolNo",
    "ProtocolTitle",
    "SponsorName",
    "Indication",
    "DocumentStatus",
    "phase",
    "approval_date",
    "uploadDate",
    "MoleculeDevice",
    "is_active",
  ],
};

const isActiveQuery2 = {
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: "hcc",
            fields: [],
          },
        },
      ],
      filter: {
        bool: {
          must: [],
        },
      },
      must_not: {
        term: {
          is_active: 0,
        },
      },
    },
  },
  size: 1000,
  _source: [
    "AiDocId",
    "ProtocolNo",
    "ProtocolTitle",
    "SponsorName",
    "Indication",
    "DocumentStatus",
    "phase",
    "approval_date",
    "uploadDate",
    "MoleculeDevice",
    "is_active",
  ],
};
