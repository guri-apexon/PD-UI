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

const CLINICAL_TERMS_DATA = [
  {
    value: 'Synonims',
    termLabel: 'Synonims',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Clinical Terms',
    termLabel: 'Clinical Terms',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Ontology',
    termLabel: 'Ontology',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
  {
    value: 'Prefered Term',
    termLabel: 'Preferred Term',
    data: [{ label: 'Euismod' }, { label: 'Molestie' }, { label: 'Luptatum' }],
  },
  {
    value: 'Classification',
    termLabel: 'Classification',
    data: [
      { label: 'Euismod dsds dsds ds' },
      { label: 'Molestie' },
      { label: 'Luptatum' },
    ],
  },
];

export { PROTOCOL_RIGHT_MENU, PROTOCOL_RIGHT_MENU_ARR, CLINICAL_TERMS_DATA };
