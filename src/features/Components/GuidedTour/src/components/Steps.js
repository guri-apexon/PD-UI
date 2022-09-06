import React from 'react';
import addProtocolImage from '../../../../../assets/images/add-protocol-modal.png';
import followingProtocolsTableImage from '../../../../../assets/images/following-protocols-table.png';
import expandedDataImage from '../../../../../assets/images/expanded-data.png';
import Content from './Content';

const addProtocolStepContent = 'The following form will appear after clicking the Add Protocol button';
const followingProtocolsStepContent = 'Clicking the Following Protocols tab will display a similar list of protocols in the Following Protocols table'
const expandedDataStepContent = 'A protocol item that has additional data fields will be shown after clicking the expand button';


export const { steps } = {
  steps: [
    {
      target: '.navbar',
      content: 'You can use the navigation bar to navigate to different pages in the application',
      disableBeacon: true,
    },
    {
      target: 'button[pathname="/dashboard"]',
      content: 'Dashboard contains user and following protocols as well as add protocol feature',
      disableBeacon: true,
    },
    {
      target: 'button[pathname="/protocols"]',
      content: 'Protocol view can be accessed once a protocol item is selected ofr viewing/editing',
      disableBeacon: true,

    },
    {
      target: 'button[pathname="/search"]',
      content: 'Go to the Search tab to search for new protocol items',
      disableBeacon: true,
    },
    {
      target: 'button[pathname="/admin"]',
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
      content: <Content content={addProtocolStepContent} image={addProtocolImage} containerWidth={500} containerGap={20} imageWidth={300} imageHeight={200} padding={'50px 0'} />,
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
      content: <Content content={followingProtocolsStepContent} image={followingProtocolsTableImage} containerWidth={600} containerGap={20} imageWidth={400} imageHeight={150} padding={'0px 0'} />,
      placement: 'center',
    },
    {
      target: '.MuiTableRow-root',
      content: 'Protocols can be sorted in ascending/descending order by the particular fields',
      disableBeacon: true,
    },
    {
      target: 'input[type="checkbox"]',
      content: 'Click here to select a protocol item',
      disableBeacon: true,
    },
    {
      target: 'button[data-testid="expandable-row"]',
      content: 'Click this button to display additional protocol data fields',
      disableBeacon: true,
    },
    {
      target: 'body',
      content: <Content content={expandedDataStepContent} image={expandedDataImage} containerWidth={700} containerGap={20} imageWidth={500} imageHeight={100} padding={'0px 0'} />,
      placement: 'center',
      disableBeacon: true
    },
    {
      target: '.protocol-link',
      content: 'You can click the link to view an overview as well as a Protocol View of a given document',
      disableBeacon: true,
    },
    {
      target: '.activity-cell',
      content: 'This status symbol indicates digitization is in progress',
      disableBeacon: true,
    },
    {
      target: '.qc-activity-cell',
      content: 'This status symbol indicates QC is in progress',
      disableBeacon: true,
    },
    {
      target: 'div[field="sponsor"]',
      content: 'Sponsor of the protocol document will be indicated as well',
      disableBeacon: true,
    },
    {
      target: 'div[field="projectId"]',
      content: 'A protocol item may have a Project ID or CRM #',
      disableBeacon: true,
    },
    {
      target: '.protocol-title',
      content: 'Clicking the title of the protocol document allows you to navigate to the Protocol view as well',
      disableBeacon: true,
    },
    {
      target: '.MuiTableFooter-root',
      content: 'Use the pagination options to navigate to further pages in the Protocols Table',
      disableBeacon: true,
      placement: 'bottom',
    }
  ]
};
