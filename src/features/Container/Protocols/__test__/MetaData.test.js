import { render, fireEvent } from '../../../../test-utils/test-utils';
import MetaData from '../MetaData/MetaData';

const initialState = {
  protocol: {
    metaDataVariable: {
      data: {
        data: {
          summary_extended: {
            _meta_data: [
              {
                attr_name: 'new',
                attr_type: 'string',
                attr_value: 'data',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'boolean_test',
                attr_type: 'boolean',
                attr_value: true,
                confidence: null,
                note: null,
              },
              {
                attr_name: 'custom_key2',
                attr_type: 'date',
                attr_value: '2023-02-03 00:00:00',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'custom_key',
                attr_type: 'string',
                attr_value: 'test2',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'version_date',
                attr_type: 'date',
                attr_value: '2018-12-01 00:00:00',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'documentStatus',
                attr_type: 'string',
                attr_value: 'Draft',
                confidence: null,
                note: null,
              },
            ],
            _childs: [],
          },
          summary: {
            _meta_data: [
              {
                attr_name: 'isActive',
                attr_value: true,
              },
              {
                attr_name: 'id',
                attr_value: '0be44992-9573-4010-962c-de1a1b18b08d',
              },
              {
                attr_name: 'userId',
                attr_value: 'test2',
              },
              {
                attr_name: 'fileName',
                attr_value:
                  'SP-1011-002 Protocol-2017-03-21-VER-Core-000001.pdf',
              },
              {
                attr_name: 'documentFilePath',
                attr_value: 'false',
              },
              {
                attr_name: 'protocol',
                attr_value: 'sp.b4b8bd0c-bd6f-4b35-b73b-dff06bfcfcbc',
              },
              {
                attr_name: 'projectId',
                attr_value: 'pid',
              },
              {
                attr_name: 'sponsor',
                attr_value: 's1',
              },
              {
                attr_name: 'indication',
                attr_value: 'ind',
              },
              {
                attr_name: 'moleculeDevice',
                attr_value: 'mol',
              },
              {
                attr_name: 'amendment',
                attr_value: 'Y',
              },
              {
                attr_name: 'versionNumber',
                attr_value: 'v3',
              },
              {
                attr_name: 'documentStatus',
                attr_value: 'final',
              },
              {
                attr_name: 'draftVersion',
                attr_value: null,
              },
              {
                attr_name: 'uploadDate',
                attr_value: '2022-11-20 02:35:12.760000',
              },
              {
                attr_name: 'isProcessing',
                attr_value: false,
              },
              {
                attr_name: 'errorCode',
                attr_value: null,
              },
              {
                attr_name: 'errorReason',
                attr_value: null,
              },
              {
                attr_name: 'percentComplete',
                attr_value: '100',
              },
              {
                attr_name: 'status',
                attr_value: 'PROCESS_COMPLETED',
              },
              {
                attr_name: 'qcStatus',
                attr_value: 'QC_NOT_STARTED',
              },
              {
                attr_name: 'runId',
                attr_value: 0,
              },
              {
                attr_name: 'compareStatus',
                attr_value: null,
              },
              {
                attr_name: 'iqvXmlPathProc',
                attr_value: null,
              },
              {
                attr_name: 'iqvXmlPathComp',
                attr_value: null,
              },
              {
                attr_name: 'protocolTitle',
                attr_value:
                  'FLUTicasone in Eosinophilic esophagitis (FLUTE):  A Randomized, Double-blind, Placebo-controlled, Dose-ranging, and Maintenance Study of APT-1011 in Subjects with Eosinophilic Esophagitis',
              },
              {
                attr_name: 'shortTitle',
                attr_value: '',
              },
              {
                attr_name: 'phase',
                attr_value: 'IIb',
              },
              {
                attr_name: 'digitizedConfidenceInterval',
                attr_value: null,
              },
              {
                attr_name: 'completenessOfDigitization',
                attr_value: null,
              },
              {
                attr_name: 'approvalDate',
                attr_value: null,
              },
              {
                attr_name: 'studyStatus',
                attr_value: 'stat',
              },
              {
                attr_name: 'sourceSystem',
                attr_value: 'sys',
              },
              {
                attr_name: 'environment',
                attr_value: 'env',
              },
              {
                attr_name: 'nctId',
                attr_value: null,
              },
              {
                attr_name: 'timeCreated',
                attr_value: '2022-11-20 02:35:12.760000',
              },
              {
                attr_name: 'lastUpdated',
                attr_value: '2022-11-20 09:07:07.707000',
              },
              {
                attr_name: 'userCreated',
                attr_value: null,
              },
              {
                attr_name: 'userUpdated',
                attr_value: '2023-02-03 09:07:07.707000',
              },
            ],
            _childs: [],
          },
          level: {
            aa: {
              bb: {
                _meta_data: [
                  {
                    attr_name: 'testFor',
                    attr_type: 'string',
                    attr_value: 'sugar',
                    confidence: null,
                    note: null,
                  },
                  {
                    attr_name: 'treatment_week_timeperiod',
                    attr_type: 'array',
                    attr_value: ['mon', 'thu'],
                    confidence: null,
                    note: null,
                  },
                ],
                _childs: [],
              },
              _childs: ['bb'],
            },
            a: {
              b: {
                _meta_data: [
                  {
                    attr_name: 'testFor',
                    attr_type: 'string',
                    attr_value: 'sugar',
                    confidence: null,
                    note: null,
                  },
                  {
                    attr_name: 'treatment_week_timeperiod',
                    attr_type: 'array',
                    attr_value: ['mon', 'thu'],
                    confidence: null,
                    note: null,
                  },
                ],
                _childs: [],
              },
              _childs: ['b'],
            },
            _childs: ['aa', 'a'],
          },
          details: {
            _meta_data: [
              {
                attr_name: 'testFor',
                attr_type: 'string',
                attr_value: 'sugar',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'isHealthy',
                attr_type: 'boolean',
                attr_value: true,
                confidence: null,
                note: null,
              },
              {
                attr_name: 'no_of_years',
                attr_type: 'integer',
                attr_value: 29,
                confidence: null,
                note: null,
              },
              {
                attr_name: 'treatment_timeperiod',
                attr_type: 'date',
                attr_value: '1999-03-20 00:00:00',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'treatment_week_timeperiod',
                attr_type: 'array',
                attr_value: ['mon', 'thu'],
                confidence: null,
                note: null,
              },
            ],
            _childs: [],
          },
          'Objective and Endpoints': {
            _meta_data: [
              {
                attr_name: 'obj1',
                attr_type: 'string',
                attr_value: 'val1',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'obj2',
                attr_type: 'integer',
                attr_value: '123',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'obj3',
                attr_type: 'integer',
                attr_value: '456',
                confidence: null,
                note: null,
              },
              {
                attr_name: 'obj4',
                attr_type: 'date',
                attr_value: '2023-02-03 00:00:00',
                confidence: null,
                note: null,
              },
            ],
            _childs: [],
          },
          _childs: [
            'summary_extended',
            'summary',
            'level',
            'details',
            'Objective and Endpoints',
          ],
        },
      },
    },
  },
};

describe('Metadata Accordian View', () => {
  test('should render the component', () => {
    const component = render(<MetaData />, { initialState });

    const metadataAccordian = component.getByTestId('metadata-accordian');

    expect(component).toBeTruthy();

    expect(metadataAccordian).toBeInTheDocument();
  });
});

describe('MetaData AccordianView', () => {
  test('MetaData edit', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getByTestId('metadata-accordian');
    expect(screen).toBeTruthy();
    expect(metadataAccordian).toBeInTheDocument();

    const metaDataEdit = screen.getAllByTestId('metadataaccordian');
    expect(metaDataEdit[0]).toBeInTheDocument();
  });
  test('MetaData Click', () => {
    const screen = render(<MetaData />, { initialState });
    const metadataAccordian = screen.getAllByTestId('metadataAccordian');
    expect(metadataAccordian[0]).toBeInTheDocument();
    fireEvent.click(metadataAccordian[0]);
  });
});
