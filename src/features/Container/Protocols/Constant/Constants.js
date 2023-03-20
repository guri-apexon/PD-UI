import House from 'apollo-react-icons/House';
import PresentationBarDark from 'apollo-react-icons/PresentationBarDark';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import List from 'apollo-react-icons/List';
import Calendar from 'apollo-react-icons/Calendar';

const PROTOCOL_RIGHT_MENU = {
  HOME: 'Home',
  CLINICAL_TERM: 'Clinical Terms',
  DIPA_VIEW: 'DIPA View',
  SCHEDULE_OF_ACTIVITIES: 'Schedule of Activities',
  PROTOCOL_ATTRIBUTES: 'Protocol Attributes',
};

const PROTOCOL_RIGHT_MENU_ARR = [
  {
    name: PROTOCOL_RIGHT_MENU.HOME,
    isActive: true,
    icon: <House className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.CLINICAL_TERM,
    isActive: false,
    icon: <Stethoscope className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.DIPA_VIEW,
    isActive: false,
    icon: <PresentationBarDark className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.SCHEDULE_OF_ACTIVITIES,
    isActive: true,
    icon: <Calendar className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES,
    isActive: false,
    icon: <List className="icon-padding" />,
  },
];

const AUDIT_LIST = ['Last Reviewed Date', 'Last Reviewed By'];

export { PROTOCOL_RIGHT_MENU, PROTOCOL_RIGHT_MENU_ARR, AUDIT_LIST };
