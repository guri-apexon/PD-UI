import House from 'apollo-react-icons/House';
import PresentationBarDark from 'apollo-react-icons/PresentationBarDark';
import MedicalCard from 'apollo-react-icons/MedicalCard';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import Lab from 'apollo-react-icons/Lab';

const PROTOCOL_RIGHT_MENU = {
  HOME: 'Home',
  CLINICAL_TERM: 'Clinical Term',
  DIPA_VIEW: 'Dipa View',
  NORMALIZED_SOA: 'Normalized Soa',
  META_DATA: 'Meta Data',
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
    icon: <PresentationBarDark className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.DIPA_VIEW,
    isActive: false,
    icon: <MedicalCard className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.NORMALIZED_SOA,
    isActive: false,
    icon: <Stethoscope className="icon-padding" />,
  },
  {
    name: PROTOCOL_RIGHT_MENU.META_DATA,
    isActive: false,
    icon: <Lab className="icon-padding" />,
  },
];

export { PROTOCOL_RIGHT_MENU, PROTOCOL_RIGHT_MENU_ARR };
