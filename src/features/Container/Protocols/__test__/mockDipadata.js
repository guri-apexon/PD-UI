const initialState = {
  protocol: {
    dipaViewData: {
      success: true,
      data: {
        dipa_resource: [
          {
            category: 'cpt_exclusion_criteria',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'd6a332ff-6c79-440b-90ed-997e100c9986',
            link_id_1: '8a5e90ea-c42d-11ed-9f5c-005056ab6469',
            link_id_2: '8a5e90ec-c42d-11ed-af5d-005056ab6469',
            link_id_3: null,
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_primary_endpoints_estimands_analysis',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'a6ccfaf3-17ba-49f6-b983-4876db412799',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90de-c42d-11ed-a674-005056ab6469',
            link_id_3: '8a5e90df-c42d-11ed-914a-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_secondary_endpoints_estimands_analysis',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'd9db0208-27ed-45e1-9774-bca3356600df',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90de-c42d-11ed-a674-005056ab6469',
            link_id_3: '8a5e90e0-c42d-11ed-ba9d-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_inclusion_criteria',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'bf1a3e68-c6e0-4875-970a-e16464e4b2f8',
            link_id_1: '8a5e90ea-c42d-11ed-9f5c-005056ab6469',
            link_id_2: '8a5e90eb-c42d-11ed-98da-005056ab6469',
            link_id_3: null,
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category:
              'cpt_tertiary_exploratory_other_endpoints_estimands_analysis',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: '1fad79f3-7dca-4d0b-9f3c-47ff9b5d3419',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90de-c42d-11ed-a674-005056ab6469',
            link_id_3: '8a5e90e2-c42d-11ed-a456-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_primary_objective',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: '1529f7b5-5a7b-43b2-a219-f77177e4fa09',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90d9-c42d-11ed-8b18-005056ab6469',
            link_id_3: '8a5e90da-c42d-11ed-900e-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_secondary_objective',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: '9c1da8a3-7610-4f7f-8d8f-24eea6816d89',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90d9-c42d-11ed-8b18-005056ab6469',
            link_id_3: '8a5e90db-c42d-11ed-a950-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_exploratory_objective',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'c7025cf8-a1a8-4986-a808-9d7293fd5c7f',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90d9-c42d-11ed-8b18-005056ab6469',
            link_id_3: '8a5e90dd-c42d-11ed-8a29-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
        ],
      },
      message: 'Success',
    },
    allDipaViewData: {
      success: true,
      data: {
        dipa_resource: [
          {
            category: 'cpt_secondary_endpoints_estimands_analysis',
            dipa_data: {
              doc_id: 'd9db0208-27ed-45e1-9774-bca3356600df',
              header: 'cpt_secondary_endpoints_estimands_analysis',
              output: [
                {
                  ID: '1',
                  actual_text:
                    'The percentage of subjects whexperience at least 1 treatment-emergent AE (TEAor SAE.',
                  child: [],
                  derive_segemnt: [
                    {
                      ID: '1.1',
                      derive_seg:
                        'The percentage of subjects whexperience at least 1 treatment-emergent AE ',
                    },
                  ],
                  level: '1',
                  open: true,
                },
                {
                  ID: '2',
                  actual_text:
                    'The percentage of subjects whdiscontinue the study drug due tan AE (including methemoglobinemia).',
                  child: [],
                  derive_segemnt: [
                    {
                      ID: '2.1',
                      derive_seg:
                        'The percentage of subjects whdiscontinue the study drug due tan AE (including methemoglobinemia).',
                    },
                  ],
                  level: '1',
                  open: false,
                },
                {
                  ID: '3',
                  actual_text:
                    'The percentage of subjects whexperience at least 1 treatment-emergent clinical laboratory test result or abnormal ECG that meets the Akaza Bioscience Limited markedly abnormal criteria.',
                  child: [],
                  derive_segemnt: [
                    {
                      ID: '3.1',
                      derive_seg:
                        'The percentage of subjects whexperience at least 1 treatment-emergent clinical laboratory test result or abnormal ECG that meets the Akaza Bioscience Limited markedly abnormal criteria.',
                    },
                  ],
                  level: '1',
                  open: false,
                },
                {
                  ID: '4',
                  actual_text:
                    'Change in naturally log-transformed key biomarkers (TB, IL-8, high sensitivity CRP (hs-CRP), M30, and urinary NGAfrom baseline tDay 8.',
                  child: [],
                  derive_segemnt: [
                    {
                      ID: '4.1',
                      derive_seg:
                        'Change in naturally log-transformed key biomarkers (TB, IL-8, high sensitivity CRP (hs-CRP), M30, and urinary NGAfrom baseline tDay 8.',
                    },
                  ],
                  level: '1',
                  open: false,
                },
                {
                  ID: '5',
                  actual_text:
                    'Survival at Day 28 after the initiation of TAK-242 therapy versus placebo.',
                  child: [],
                  derive_segemnt: [
                    {
                      ID: '5.1',
                      derive_seg:
                        'Survival at Day 28 after the initiation of TAK-242 therapy versus placebo.',
                    },
                  ],
                  level: '1',
                  open: false,
                },
              ],
              subheader: 'cpt_secondary_endpoints_estimands_analysis',
            },
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb2',
            id: 'd9db0208-27ed-45e1-9774-bca3356600df',
            link_id_1: '8a5e90d8-c42d-11ed-b690-005056ab6469',
            link_id_2: '8a5e90de-c42d-11ed-a674-005056ab6469',
            link_id_3: '8a5e90e0-c42d-11ed-ba9d-005056ab6469',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
            timeCreated: 'Wed, 22 Mar 2023 09:42:16 GMT',
            timeUpdated: 'Wed, 22 Mar 2023 09:42:16 GMT',
          },
        ],
      },
      message: 'Success',
    },
  },
};

export default initialState;
