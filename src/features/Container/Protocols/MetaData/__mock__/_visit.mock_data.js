export const data = {
  loading: false,
  data: {
    visit_schedule: [
      {
        table_roi_id: '30a69afe-e2f1-4607-a1ae-49167d109ece',
        data: [
          {
            id: '5fcedf55-3f02-48d7-985d-fd76ee48065d',
            doc_id: '2b2f1678-127c-45b6-8da8-89d54cb424aa',
            visit_id: '04900246-72c9-43b0-a4dd-8e7055c3d8e1',
            table_roi_id: '30a69afe-e2f1-4607-a1ae-49167d109ece',
            visit_label: 'V1 C1-28 days Screening',
            epoch_timepoint: 'Screening',
            cycle_timepoint: '1-28 days',
            visit_timepoint: '1',
            year_timepoint: '',
            month_timepoint: '',
            week_timepoint: '1',
            day_timepoint: '7   2    ',
            window_timepoint: '',
            visit_location: 'site',
            early_discontinuation: 'Y',
            unscheduled_or_optional: 'Y',
            additional_visit_length: '(PK,2.00)',
            overnight: 'Y',
          },
          {
            id: '5fcedf55-3f02-48d7-985d-fd76ee480612312',
            doc_id: '2b2f1678-127c-45b6-8da8-89d54cb424aa',
            visit_id: '04900246-72c9-43b0-a4dd-8e7055c3d8e1',
            table_roi_id: '30a69afe-e2f1-4607-a1ae-49167d109ece',
            visit_label: 'V2 D-23 to -1 9 C21 2 days Run-In',
            epoch_timepoint: 'Run-In',
            cycle_timepoint: '21 2 days',
            visit_timepoint: '2',
            year_timepoint: '',
            month_timepoint: '',
            week_timepoint: '',
            day_timepoint: '-23 to -1 9',
            window_timepoint: '',
            visit_location: '',
            early_discontinuation: '',
            unscheduled_or_optional: '',
            additional_visit_length: '',
            overnight: '',
          },
        ],
      },
    ],
    columns: [
      {
        displayName: 'Visit Label',
        key: 'visit_label',
        possible_values: [],
      },
      {
        displayName: 'Epoch Timepoint',
        key: 'epoch_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Cycle Timepoint',
        key: 'cycle_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Year Timepoint',
        key: 'year_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Month Timepoint',
        key: 'month_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Week Timepoint',
        key: 'week_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Day Timepoint',
        key: 'day_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Visit Timepoint',
        key: 'visit_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Window Timepoint',
        key: 'window_timepoint',
        possible_values: [],
      },
      {
        displayName: 'Visit Location',
        key: 'visit_location',
        possible_values: [
          {
            label: 'site',
          },
          {
            label: 'remote in-person',
          },
          {
            label: 'telephone or virtual',
          },
        ],
      },
      {
        displayName: 'Discontinuation',
        key: 'early_discontinuation',
        possible_values: [
          {
            label: 'Y',
          },
        ],
      },
      {
        displayName: 'Unscheduled or Optional',
        key: 'unscheduled_or_optional',
        possible_values: [
          {
            label: 'Y',
          },
        ],
      },
      {
        displayName: 'Pre/Post & Dose timing',
        key: 'additional_visit_length',
        possible_values: [
          {
            label: '(PK,2.00)',
          },
          {
            label: '(PK,4.00)',
          },
        ],
      },
      {
        displayName: 'Overnight',
        key: 'overnight',
        possible_values: [
          {
            label: 'Y',
          },
        ],
      },
    ],
  },
  error: null,
};

export const mockdata = {
  loading: false,
  data: null,
  error: null,
};
