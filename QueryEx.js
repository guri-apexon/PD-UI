const filter1 = {
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: "advanced",
          },
        },
        {
          multi_match: {
            query: "ABCC6 deficiency MEDI4736 Monotherapy AstraZeneca",
            fields: ["Indication", "sponsor"],
          },
        },
      ],
    },
  },
};

const filter2 = {
  query: {
    filtered: {
      query: {
        query_string: {
          query: "*tom*",
          default_operator: "OR",
          fields: ["username"],
        },
      },
      filter: {
        bool: {
          must: [
            { term: { isActive: "1" } },
            { term: { isPrivate: "0" } },
            { term: { isOwner: "1" } },
          ],
        },
      },
    },
  },
};
