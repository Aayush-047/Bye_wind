import { ReactComponent as Contact1Icon } from '../../../assets/icons/contacts1.svg';
import { ReactComponent as Contact2Icon } from '../../../assets/icons/contacts2.svg';
import { ReactComponent as Contact3Icon } from '../../../assets/icons/contacts3.svg';
import { ReactComponent as Contact4Icon } from '../../../assets/icons/contacts4.svg';
import { ReactComponent as Contact5Icon } from '../../../assets/icons/contacts5.svg';
import { ReactComponent as Contact6Icon } from '../../../assets/icons/contacts6.svg';
import { ReactComponent as Contact7Icon } from '../../../assets/icons/contacts7.svg';

export const getStatusColor = (status) => {
  const colors = {
    'In Progress': 'rgba(138, 140, 217, 1)',
    'Complete': 'rgba(74, 167, 133, 1)',
    'Pending': 'rgba(89, 168, 212, 1)',
    'Approved': 'rgba(255, 197, 85, 1)',
    'Rejected': 'rgba(28, 28, 28, 0.4)'
  };
  return colors[status] || '#6B7280';
};

export const isCheckboxAllowed = (status) => {
  return status === 'Rejected' || status === 'Approved';
};

export const iconMap = {
  'Contact1Icon': Contact1Icon,
  'Contact2Icon': Contact2Icon,
  'Contact3Icon': Contact3Icon,
  'Contact4Icon': Contact4Icon,
  'Contact5Icon': Contact5Icon,
  'Contact6Icon': Contact6Icon,
  'Contact7Icon': Contact7Icon,
};

export const userIconMap = {
  'Natali Craig': 'Contact7Icon',
  'Kate Morrison': 'Contact5Icon',
  'Drew Cano': 'Contact2Icon',
  'Orlando Diggs': 'Contact3Icon',
  'Andi Lane': 'Contact4Icon',
};