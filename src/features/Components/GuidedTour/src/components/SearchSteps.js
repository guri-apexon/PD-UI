
export const { steps } = {
    steps: [
      {
        target: '.search-bar',
        content: 'Search by giving a keyword appearing in a protocol field',
        disableBeacon: true,
      },
      {
        target: '.filter-panel',
        content: 'Protocol search results can be filtered by a number of fields/criteria',
        disableBeacon: true,
      },
      {
        target: 'div[data-testid="toc-checkboxes"]',
        content: "Clicking the plus button will expand the filter options",
        disableBeacon: true,
      },
      {
        target: '.list',
        content: "Other filter criteria can be selected the same way",
        disableBeacon: true,
      },
      {
        target: 'div[data-testid="indication-checkboxes"]',
        content: "Select indication items to include",
        disableBeacon: true,
      },
      {
        target: 'div[data-testid="phase-checkboxes"]',
        content: "Select Phase categories to include in filtered result",
        disableBeacon: true,
      },
      {
        target: 'div[data-testid="document-checkboxes"]',
        content: "Select between Draft and Final Approved status or both",
        disableBeacon: true,
      },
      {
        target: 'div[data-testid="qc-activity-checkboxes"]',
        content: "Select the QC statuses of protocols to include in results",
        disableBeacon: true,
      },
      {
        target: '.date-filter',
        content: "Then select one of the date range options or input a date range to filter within",
        disableBeacon: true,
      },
      {
        target: '.Card-interactive-323',
        content: "Associated protocol data can be viewed by clicking the Protocol Data expansion",
        disableBeacon: true,
      },
      {
        target: '.search-inner-table',
        content: "Related versions of the same protocol document can be retrieved by clicking the View Associate Protocols option",
        disableBeacon: true,
      }
      
    ]
  };