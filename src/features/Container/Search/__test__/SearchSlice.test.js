import searchSlice, {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
  getRecentDate,
  getRangeDate,
  getTotalSearchResult,
  searchFilter,
  searchResult,
  totalSearchResult,
  indications,
  sponsors,
  recent,
  range,
} from "../searchSlice";

const initialState = {
  search: {
    filters: {},
    searchResult: {},
    totalSearchResult: [],
    indications: {
      sectionContent: [],
    },
    sponsors: {
      sectionContent: [],
    },
    recent: {
      from: "",
      to: "",
    },
    range: {
      from: "",
      to: "",
    },
  },
};

describe(" Search Slice Test Suite", () => {
  test("getfilters actions", () => {
    expect(
      searchSlice(initialState, {
        type: getFilters.type,
        payload: {
          sponsors: ["3D-Medical"],
        },
      })
    ).toEqual({
      ...initialState,
      filters: {
        sponsors: ["3D-Medical"],
      },
    });
  });
  test("getRangeDate actions", () => {
    expect(
      searchSlice(initialState, {
        type: getRangeDate.type,
        payload: {
          from: "20201119",
          to: "20210519",
        },
      })
    ).toEqual({
      ...initialState,
      range: {
        from: "20201119",
        to: "20210519",
      },
    });
  });
  test("getRecentDate actions", () => {
    expect(
      searchSlice(initialState, {
        type: getRecentDate.type,
        payload: {
          from: "20201119",
          to: "20210519",
        },
      })
    ).toEqual({
      ...initialState,
      recent: {
        from: "20201119",
        to: "20210519",
      },
    });
  });
  test("getSponsors actions", () => {
    expect(
      searchSlice(initialState, {
        type: getSponsors.type,
        payload: {
          success: true,
          sectionContent: [{ title: "3D-Medical", id: 12 }],
        },
      })
    ).toEqual({
      ...initialState,
      sponsors: {
        success: true,
        sectionContent: [{ title: "3D-Medical", id: 12 }],
      },
    });
  });
  test("getIndications actions", () => {
    expect(
      searchSlice(initialState, {
        type: getIndications.type,
        payload: {
          success: true,
          sectionContent: [{ title: "3D-Medical", id: 12 }],
        },
      })
    ).toEqual({
      ...initialState,
      indications: {
        success: true,
        sectionContent: [{ title: "3D-Medical", id: 12 }],
      },
    });
  });
  test("getTotalSearchResult actions", () => {
    expect(
      searchSlice(initialState, {
        type: getTotalSearchResult.type,
        payload: [],
      })
    ).toEqual({
      ...initialState,
      totalSearchResult: [],
    });
  });
  test("getTotalSearchResult actions", () => {
    expect(
      searchSlice(initialState, {
        type: getSearchResult.type,
        payload: {
          search: true,
          loader: false,
          success: true,
          data: {
            ResponseCode: 200,
            count: 10,
            pageNo: 1,
            sortField: "score",
            total_count: 300,
            phases: [],
            sponsors: [],
            indications: [],
            data: [
              {
                AiDocId: "a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe",
                approvalDate: "",
                followed: false,
                indication: "Adavosertib",
                isActive: 1,
                molecule: "Adavosertib",
                phase: "I",
                protocolDescription: "A Phase I, Openours",
                protocolNumber: "D601HC00008",
                rows: [],
                rowsLoading: true,
                sponsor: "AstraZeneca",
              },
              {
                AiDocId: "742053fb-db87-46e0-bed2-6c2ee8d94280",
                approvalDate: "",
                followed: false,
                indication: "none",
                isActive: 1,
                molecule: " Durvalumab (MEDI4736) and↵ tremelimumab",
                phase: "III",
                protocolDescription:
                  "A Phase III, Randomized, Open-Label, Urothelial Cancer",
                protocolNumber: "",
                rows: [],
                rowsLoading: true,
                sponsor: "Numerics word , Countries, Country (..",
                uploadDate: "20210111023714",
              },
            ],
          },
        },
      })
    ).toEqual({
      ...initialState,
      searchResult: {
        search: true,
        loader: false,
        success: true,
        data: {
          ResponseCode: 200,
          count: 10,
          pageNo: 1,
          sortField: "score",
          total_count: 300,
          phases: [],
          sponsors: [],
          indications: [],
          data: [
            {
              AiDocId: "a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe",
              approvalDate: "",
              followed: false,
              indication: "Adavosertib",
              isActive: 1,
              molecule: "Adavosertib",
              phase: "I",
              protocolDescription: "A Phase I, Openours",
              protocolNumber: "D601HC00008",
              rows: [],
              rowsLoading: true,
              sponsor: "AstraZeneca",
            },
            {
              AiDocId: "742053fb-db87-46e0-bed2-6c2ee8d94280",
              approvalDate: "",
              followed: false,
              indication: "none",
              isActive: 1,
              molecule: " Durvalumab (MEDI4736) and↵ tremelimumab",
              phase: "III",
              protocolDescription:
                "A Phase III, Randomized, Open-Label, Urothelial Cancer",
              protocolNumber: "",
              rows: [],
              rowsLoading: true,
              sponsor: "Numerics word , Countries, Country (..",
              uploadDate: "20210111023714",
            },
          ],
        },
      },
    });
  });

  test("Test all Searc Slice", () => {
    searchFilter(initialState);
    searchResult(initialState);
    totalSearchResult(initialState);
    indications(initialState);
    sponsors(initialState);
    recent(initialState);
    range(initialState);
  });
});
