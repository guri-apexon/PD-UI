import * as redux from 'react-redux';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Alerts from '../Alerts';

afterEach(cleanup);
jest.useFakeTimers('legacy');

describe('Alerts', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth',
  );

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    );
  });

  const mockNotifications = [
    {
      id: '1190',
      protocol: 'Test_Proto_01',
      aidocId: '64c3dd08-f885-49f7-a325-e72d8f221029',
      readFlag: false,
      protocolTitle: '',
      timeCreated: '2021-06-16T13:21:33.040000',
    },
    {
      id: '1190',
      protocol: 'Test_Proto_01',
      aidocId: 'bf7a0ddf-ff3a-4015-99e0-dc1800a4915c',
      readFlag: true,
      protocolTitle: '',
      timeCreated: '2021-06-17T08:05:56.897000',
    },
    {
      id: '1649',
      protocol: 'Bimal_patra_test_email_D361BC00001TC01',
      aidocId: '61232fdd-26d5-4e7c-8e86-624341910038',
      readFlag: false,
      protocolTitle: '',
      timeCreated: '2021-06-18T11:05:54.950000',
    },
    {
      id: '1649',
      protocol: 'Bimal_patra_test_email_D361BC00001TC01',
      aidocId: '953e212b-6d25-4614-ab80-0160a1abe660',
      readFlag: false,
      protocolTitle:
        'Capivasertib + Abiraterone as Treatment for Patients with Metastatic Hormone-Sensitive Prostate Cancer Characterised by PTEN deficiency.',
      timeCreated: '2021-06-18T09:38:59.113000',
    },
    {
      id: '1807',
      protocol: 'ARJ868TC23',
      aidocId: 'ccca752d-840b-429b-b53a-42262cf212bb',
      readFlag: false,
      protocolTitle:
        'A Multicentre, Randomised, Double-blind, Parallel Group, Placebocontrolled, Phase 3 Efficacy and Safety Study of Benralizumab (MEDI-563) Added to Medium to High-dose Inhaled Corticosteroid Plus Long-acting ß2 Agonist in Patients with Uncontrolled Asthma',
      timeCreated: '2021-06-24T07:50:04.747000',
    },
    {
      id: '1808',
      protocol: 'BRPROTO3',
      aidocId: 'ea39f739-a1a0-4994-a98b-08c298b662fd',
      readFlag: false,
      protocolTitle:
        'PHASE 3, RANDOMIZED, OPEN-LABEL, ACTIVE-CONTROLLED STUDY EVALUATING THE EFFICACY AND SAFETY OF ORAL VADADUSTAT FOR THE CORRECTION OF ANEMIA IN SUBJECTS WITH NON-DIALYSIS-DEPENDENT CHRONIC KIDNEY DISEASE (NDD-CKD) (PRO2TECT - CORRECTION)',
      timeCreated: new Date(),
    },
  ];

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should display the correct number of new notifications', () => {
    useSelectorMock.mockReturnValue(mockNotifications);
    render(<Alerts list={mockNotifications} />);
    const bellIcon = screen.getByTestId('alert-bell-icon');
    expect(bellIcon).toBeInTheDocument();
    fireEvent.click(bellIcon);
    const element = screen.getByTestId('popover');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(screen.getByText('Notification')).toBeInTheDocument();
  });

  test('Should render list of alerts on click of bell icon', () => {
    useSelectorMock.mockReturnValue(mockNotifications);
    render(<Alerts list={mockNotifications} />);
    const alertIcon = screen.getByTestId('alert-bell-icon');
    fireEvent.click(alertIcon);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  xtest('Should click on the list item', () => {
    useSelectorMock.mockReturnValue(mockNotifications);
    render(<Alerts list={mockNotifications} />);
    const alertIcon = screen.getByTestId('alert-bell-icon');
    fireEvent.click(alertIcon);
    fireEvent.click(
      screen.getByTestId('sentinelStart').children[0].children[1],
    );
  });

  test('Should click on the read and unread list item', async () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockReturnValue(mockNotifications);
    const mockHistoryPush = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    render(
      <MemoryRouter>
        <Alerts />
      </MemoryRouter>,
    );
    const historymock = jest.fn();
    historymock.push = jest.fn();
    const alertIcon = screen.getByTestId('alert-bell-icon');
    fireEvent.click(alertIcon);
    const element = screen.getByTestId('popover');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(screen.getByText('Notification')).toBeInTheDocument();
    const list = screen.getAllByTestId('list-Item')[0];
    await expect(list).toBeInTheDocument();
    fireEvent.click(list);
  });

  it('Delete notifications', async () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockReturnValue(mockNotifications);
    const mockHistoryPush = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    render(
      <MemoryRouter>
        <Alerts />
      </MemoryRouter>,
    );
    const historymock = jest.fn();
    historymock.push = jest.fn();

    const bellIcon = screen.getByTestId('alert-bell-icon');
    expect(bellIcon).toBeInTheDocument();
    fireEvent.click(bellIcon);
    const element = screen.getByTestId('popover');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(screen.getByText('Notification')).toBeInTheDocument();
    const deleteButton = screen.getAllByTestId('trash-icon-1')[0];
    await expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
  });

  it('should open and close the popover when clicking on the bell icon', () => {
    useSelectorMock.mockReturnValue(mockNotifications);
    render(<Alerts list={mockNotifications} />);
    const bellIcon = screen.getByTestId('alert-bell-icon');
    const popover = screen.queryByTestId('popover');
    expect(popover).not.toBeInTheDocument();
    fireEvent.click(bellIcon);
    // expect(popover).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(popover).not.toBeInTheDocument();
  });

  xit('should mark the notification as read and navigate to the correct route when clicking on a notification', () => {
    useSelectorMock.mockReturnValue(mockNotifications);
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    const mockHistoryPush = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    render(<Alerts list={mockNotifications} />);
    fireEvent.click(screen.getByTestId('alert-bell-icon'));
    const element = screen.getByTestId('popover');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'READ_NOTIFICATION_SAGA',
      payload: { id: '2' },
    });
    expect(mockHistoryPush.push).toHaveBeenCalledWith(
      '/protocols?protocolId=2&tab=1',
    );
  });
});
