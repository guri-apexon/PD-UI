import React from 'react';
import addProtocolImage from '../../../../../assets/images/add-protocol-modal.png';
import followingProtocolsTableImage from '../../../../../assets/images/following-protocols-table.png';
import Content from './Content';


export const { steps } = {
  steps: [
    {
      target: '.navbar',
      // content: 'You can use the navigation bar to navigate to different pages in the application',
      content: 'You can use the navigation bar to navigate to different pages in the application',
      disableBeacon: true,
    },
    {
      // target: '.MuiButton-label-29',
      target: '.MuiButton-label-28',
      content: 'Dashboard contains user and following protocols as well as add protocol feature',
      disableBeacon: true,
    },
    {
      // target: '.MuiButton-label-61',
      target: '.MuiButton-label-60',
      content: 'Protocol view can be accessed once a protocol item is selected ofr viewing/editing',
      disableBeacon: true,

    },
    {
      // target: '.MuiButton-label-93',
      target: '.MuiButton-label-92',
      content: 'Go to the Search tab to search for new protocol items',
      disableBeacon: true,
    },
    {
      target: '.MuiButton-label-125',
      content: 'Admins can view and update users, roles, and mappings from the Admin page',
      disableBeacon: true,
    },
    {
      target: '.add-protocol',
      content: 'Click the Add Protocol button to upload a new protocol document',
      disableBeacon: true,
    },
    {
      target: 'body',
      disableBeacon: true,
      content: <Content image={addProtocolImage} />,
      placement: 'center',
    },
    {
      target: '.send-qc-review',
      content: 'Click here after selecting a protocol item to send to QC review',
      disableBeacon: true,
    },
    {
      target: '.my-protocols',
      content: 'My Protocols contains a list of of protocols that you can view',
      disableBeacon: true,
    },
    {
      target: '.following-protocols',
      content: 'Following Protocols contains a list of of protocols which have been marked as followed',
      disableBeacon: true,
    },
    {
      target: 'body',
      disableBeacon: true,
      content:
        <>
          <div
            className="content-container"
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '600px',
              columnGap: '20px',
              alignContent: 'center'
            }}
          >
            <div className="content-image-container">
              <img
                width='400px'
                height='150px'
                src={followingProtocolsTableImage}
                alt='Screenshot of following protocols table'
              />
            </div>
            <div 
              className="content-header-container"
            >
              Clicking the Following Protocols tab will display a similar list of protocols in the Following Protocols table
            </div>
          </div>
        </>
      ,
      placement: 'center',
    },
    {
      target: '.MuiTableSortLabel-root-365',
      content: 'Protocols can be sorted in alphabetical order',
      disableBeacon: true,
    },
    {
      target: '.MuiTableSortLabel-root-413',
      content: 'Organize order by PD status',
      disableBeacon: true,
    },
    {
      target: '.MuiTableSortLabel-root-461',
      content: 'Sort by QC status',
      disableBeacon: true,
    },
    {
      target: '.MuiTableSortLabel-root-509',
      content: 'Sort in alphabetical order of name of sponsor',
      disableBeacon: true,
    },
    {
      target: '.MuiTableSortLabel-root-557',
      content: "Organize items by Project ID or CRM #'s",
      disableBeacon: true,
    },
    {
      target: '.MuiTableSortLabel-root-605',
      content: 'Sort by title of protocol document',
      disableBeacon: true,
    },
    {
      target: '.MuiIconButton-label-673',
      content: 'Click here to select a protocol item',
      disableBeacon: true,
    },
    {
      target: '.MuiIconButton-label-727',
      content: 'Clicking here will display additional fields (i.e. Phase, Indication, Docmument Status, Source)',
      disableBeacon: true,
    },
    {
      target: '.protocol-link',
      content: 'You can click the link to view an overview as well as a Protocol View of a given document',
      disableBeacon: true,
    },
    {
      target: '.MuiIconButton-label-782',
      content: 'Digitization status will be indicated here',
      disableBeacon: true,
    },
    {
      target: '.MuiIconButton-label-837',
      content: 'QC status will be indicated here',
      disableBeacon: true,
    },
    {
      target: '.wrapper-AstraZeneca',
      content: 'Sponsor of the protocol document will be indicated as well',
      disableBeacon: true,
    },
    {
      target: ".wrapper-2020-000554-97",
      content: 'A protocol item may have a Project ID or CRM #',
      disableBeacon: true,
    },
    {
      target: '.protocol-title',
      content: 'Clicking the title of the protocol document allows you to navigate to the Protocol view as well',
      disableBeacon: true,
    },
    {
      target: '.MuiButton-label-1994',
      content: 'Navigate to further pages of protocol documents',
      disableBeacon: true,
    },
    {
      target: '.MuiButton-label-2058',
      content: 'List all protocol items on current table page',
      disableBeacon: true,
    },
    {
      target: '.MuiInputBase-root-2274',
      content: 'Enter a table page number to navigate directly to the page',
      disableBeacon: true,
    },
    {
      target: '.MuiTypography-root-2359',
      content: 'Navigate to last page in table',
      disableBeacon: true,
    },

  ]
};
