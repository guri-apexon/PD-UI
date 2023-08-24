const dipaDataRemainingSchema = {
  child: [],
  level: '1',
  open: false,
};

const mockDipadata = {
  protocol: {
    sectionLockDetails: {
      section_lock: true,
    },
    dipaViewData: {
      success: true,
      data: {
        dipa_resource: [
          {
            category: 'cpt_exclusion_criteria',
            doc_id: 'e2da06f4-fa87-4a30-b887-69bac08e1fb1',
            id: 'd6a332ff-6c79-440b-90ed-997e100c9986',
            link_id_1: 'ea814bc0-0bb8-4c94-a67b-ff2b488f50c5',
            link_id_2: '7e259878-b9c5-40bf-b086-27be7cb98aed',
            link_id_3: null,
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_primary_endpoints_estimands_analysis',
            doc_id: '7b334eae-9cf5-4b7e-b519-40a96e9d7335',
            id: 'a6ccfaf3-17ba-49f6-b983-4876db412799',
            link_id_1: 'a21ed742-5e5e-4404-908a-4b131a5880ca',
            link_id_2: '8a5e90de-c42d-11ed-a674-005056ab6489',
            link_id_3: '3749a101-d691-46b8-93fd-5673428a31aa',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_secondary_endpoints_estimands_analysis',
            doc_id: '42faf281-c126-47e8-bf11-2e9408677e18',
            id: 'd9db0208-27ed-45e1-9774-bca3356600d1',
            link_id_1: 'e36019e4-905a-4902-a7e3-d8f131ef4e0c',
            link_id_2: 'c6e3c334-cbb2-4f6f-8d3b-9d6fdc945d92',
            link_id_3: 'f584cd38-2ec2-40b1-9d05-2fe33a640d80',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_inclusion_criteria',
            doc_id: '43c763fc-b4e2-46e1-a0dc-770c7b7fcf05',
            id: 'bf1a3e68-c6e0-4875-970a-e16464e4b2f8',
            link_id_1: 'ce1d3422-e245-445e-a856-a380fc8e562e',
            link_id_2: '75497111-83ff-4e95-896a-bb9490d8895a',
            link_id_3: null,
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category:
              'cpt_tertiary_exploratory_other_endpoints_estimands_analysis',
            doc_id: '8277407d-4c5d-410a-8084-02add6a6e012',
            id: '1fad79f3-7dca-4d0b-9f3c-47ff9b5d3419',
            link_id_1: '56e604b9-69b1-4147-9d9d-e24d887ba37c',
            link_id_2: '9ec1bf58-a800-4785-9ea5-dc9f0adec059',
            link_id_3: '2084cd8c-cac6-4e4e-a5a9-99418e14ae7a',
            link_id_4: null,
            link_id_5: null,
            link_id_6: null,
          },
          {
            category: 'cpt_primary_objective',
            doc_id: 'cd3cf012-4eb9-4e7e-b6cf-89b9b0a7438c',
            id: '1529f7b5-5a7b-43b2-a219-f77177e4fa09',
            link_id_1: '0c45d4d2-514e-44f3-8704-2cff3e079f2f',
            link_id_2: '933be766-95cf-4964-ac0f-947d08d915ef',
            link_id_3: '9269ad71-1a8a-4cdd-a6cb-572268a116e8',
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
                    'The percentages of subjects whexperience at least 1 treatment-emergent AE (TEAor SAE.',
                  ...dipaDataRemainingSchema,
                  open: true,
                  derive_segemnt: [
                    {
                      ID: '1.1',
                      derive_seg:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    },
                  ],
                },
                {
                  ID: '2',
                  actual_text:
                    'The percentage of subjects whadiscontinue the study drug due tan AE (including methemoglobinemia).',
                  derive_segemnt: [
                    {
                      ID: '2.1',
                      derive_seg:
                        'The percentages of subjects whdiscontinue the study drug due tan AE (including methemoglobinemia).',
                    },
                  ],
                  ...dipaDataRemainingSchema,
                },
                {
                  ID: '3',
                  actual_text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  derive_segemnt: [
                    {
                      ID: '3.1',
                      derive_seg:
                        'The percentage of subjects whexperience at least 4 treatment-emergent clinical laboratory test result that meets the Akaza Bioscience',
                    },
                  ],
                  ...dipaDataRemainingSchema,
                },
                {
                  ID: '4',
                  actual_text:
                    'Change in naturally log-transformed key biomarkers (TB, IL-8, high sensitivity CRP (hs-CRP), M30, and urinary NGAfrom baseline tDay 8.',
                  derive_segemnt: [
                    {
                      ID: '4.1',
                      derive_seg:
                        'Change in naturally log-transformed key biomarkers (TB, IL-8, high sensitivity CRP (hs-CRP), M30, and urinary NGAfrom baseline tDay 8.',
                    },
                  ],
                  ...dipaDataRemainingSchema,
                },
                {
                  ID: '5',
                  actual_text:
                    'Survival at Day 28 after the initiation of TAK-242 therapy versus placebo.',
                  derive_segemnt: [
                    {
                      ID: '5.1',
                      derive_seg:
                        'Survival at Day 28 after the initiation of TAK-242 therapy versus placebo.',
                    },
                  ],
                  ...dipaDataRemainingSchema,
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
  user: {
    userDetail: {
      userId: 'u123456',
      username: 'test',
      email: 'test@iqvia.com',
      user_type: 'normal',
    },
  },
};

export default mockDipadata;
