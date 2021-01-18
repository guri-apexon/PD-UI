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
