import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Protocols from '../Protocols';

const state2 = {
  initialState: {
    protocol: {
      summary: {
        loading: false,
        success: false,
      },
      view: {
        iqvdataSoa: [],
        iqvdataSummary: {},
        iqvdataToc: {
          data: [],
        },
        loader: true,
      },
      compare: {
        iqvdata: '',
      },
    },
  },
};
const state3 = {
  initialState: {
    protocol: {
      summary: {
        loading: true,
        success: false,
      },
    },
  },
};
describe('Renders Protocols Component', () => {
  const state = {
    initialState: {
      protocol: {
        summary: {
          loading: false,
          success: true,
          data: {
            id: '75920ca9-bc0a-46c5-8d64-3975eb160a39',
            userId: '1072234',
            fileName:
              'Protocol - DZA66453_Final Protocol_V1.0 - Protocol - 08-May-2019.pdf',
            documentFilePath:
              '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\75920ca9-bc0a-46c5-8d64-3975eb160a39\\Protocol - DZA66453_Final Protocol_V1.0 - Protocol - 08-May-2019.pdf',
            protocol: 'Version-ALNM',
            projectId: '',
            sponsor: '3-D Pharmaceuticals',
            indication: 'ABCC6 deficiency',
            moleculeDevice: 'Mol-1',
            amendment: 'N',
            isProcessing: false,
            percentComplete: '100',
            compareStatus: null,
            iqvXmlPathProc: null,
            iqvXmlPathComp: null,
            shortTitle: 'SUCCESS',
            versionNumber: 'V B-1.0',
            documentStatus: 'final',
            draftVersion: null,
            errorCode: null,
            errorReason: null,
            status: 'PROCESS_COMPLETED',
            qcStatus: 'QC_NOT_STARTED',
            phase: '',
            digitizedConfidenceInterval: null,
            completenessOfDigitization: null,
            protocolTitle: '',
            studyStatus: null,
            sourceSystem: null,
            environment: null,
            uploadDate: '2021-10-28T16:19:49.994792+00:00',
            timeCreated: '2021-10-28T16:19:49.994792+00:00',
            lastUpdated: '2021-10-28T17:43:01.651176+00:00',
            userCreated: null,
            userUpdated: null,
            approvalDate: '2019-05-08',
            isActive: true,
            nctId: null,
            amendmentNumber: null,
            redactProfile: 'profile_1',
            userUploadedFlag: false,
            userPrimaryRoleFlag: false,
            userFollowingFlag: false,
          },
        },
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
        },
        compare: {
          iqvdata: '',
        },
      },
    },
  };
  const locations = {
    search: '?protocolId=3978efd6-301e-46a7-a37f-341ef9c16219',
  };
  test('Should render Protocols Component Successful', () => {
    render(<Protocols location={locations} />, state);
    const link = screen.getByTestId('protocols-tabs');
    fireEvent.click(link);
    // let link = container.getByTestId("protocols-component-test").children[2]
    //   .children[0].children[0].children[0].children[0].children[0].children[0]
    //   .children[2];
    // fireEvent.click(link);
    //    let dashboardLink= container.getByTestId('protocols-component-test').children[0].children[0];
    //    fireEvent.click(dashboardLink,{  target: { preventdefault: () => {} } });
  });
  // test("Should render Protocols Component Successful iwth two ids", () => {
  //   render(<Protocols location={location2} />, state)
  //  });
  test('Should render Protocols Component Successful with No summary Data', () => {
    render(<Protocols location={locations} />, state2);
  });
  test('Should render Protocols Component Successful with No summary Data and Loading', () => {
    render(<Protocols location={locations} />, state3);
  });
});
