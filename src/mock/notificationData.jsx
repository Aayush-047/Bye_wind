import { ReactComponent as Activity1Icon } from '../assets/icons/activity1.svg';
import activity2 from '../assets/images/activity2.png'; 
import { ReactComponent as Activity3Icon } from '../assets/icons/activity3.svg';
import { ReactComponent as Activity4Icon } from '../assets/icons/activity4.svg';
import { ReactComponent as Activity5Icon } from '../assets/icons/activity5.svg';
import { ReactComponent as Contact1Icon } from '../assets/icons/contacts1.svg';
import { ReactComponent as Contact2Icon } from '../assets/icons/contacts2.svg';
import { ReactComponent as Contact3Icon } from '../assets/icons/contacts3.svg';
import { ReactComponent as Contact4Icon } from '../assets/icons/contacts4.svg';
import { ReactComponent as Contact5Icon } from '../assets/icons/contacts5.svg';
import { ReactComponent as Contact6Icon } from '../assets/icons/contacts6.svg';
import { ReactComponent as BugIcon } from '../assets/icons/bug.svg';
import { ReactComponent as WifiIcon } from '../assets/icons/wifi.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile-icon-notificatiion.svg';

export const notifications = [
  {
    id: 1,
    type: 'bug',
    icon: <BugIcon />,
    iconBg: '#E0F2FE',
    iconColor: '#0891B2',
    title: 'You have a bug that needs...',
    time: 'Just now',
  },
  {
    id: 2,
    type: 'user',
    icon: <ProfileIcon />,
    iconBg: '#F3F4F6',
    iconColor: '#6B7280',
    title: 'New user registered',
    time: '59 minutes ago',
  },
  {
    id: 3,
    type: 'bug',
    icon: <BugIcon />,
    iconBg: '#E0F2FE',
    iconColor: '#0891B2',
    title: 'You have a bug that needs...',
    time: '12 hours ago',
  },
  {
    id: 4,
    type: 'subscription',
    icon: <WifiIcon />,
    iconBg: '#F3F4F6',
    iconColor: '#6B7280',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
  },
];

export const activities = [
  {
    id: 1,
    avatar: <Activity1Icon />,
    title: 'You have a bug that needs...',
    time: 'Just now',
  },
  {
    id: 2,
    avatar: <img src={activity2} alt="Activity2" style={{ width: 24, height: 24 }} />, // ✅ PNG as <img>
    title: 'Released a new version',
    time: '59 minutes ago',
  },
  {
    id: 3,
    avatar: <Activity3Icon />,
    title: 'Submitted a bug',
    time: '12 hours ago',
  },
  {
    id: 4,
    avatar: <Activity4Icon />,
    title: 'Modified A data in Page X',
    time: 'Today, 11:59 AM',
  },
  {
    id: 5,
    avatar: <Activity5Icon />,
    title: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
  },
];

export const contacts = [
  {
    id: 1,
    avatar: <Contact1Icon />,
    name: 'Natali Craig',
  },
  {
    id: 2,
    avatar: <Contact2Icon />,
    name: 'Drew Cano',
  },
  {
    id: 3,
    avatar: <Contact3Icon />,
    name: 'Orlando Diggs',
  },
  {
    id: 4,
    avatar: <Contact4Icon />,
    name: 'Andi Lane',
  },
  {
    id: 5,
    avatar: <Contact5Icon />,
    name: 'Kate Morrison',
  },
  {
    id: 6,
    avatar: <Contact6Icon />,
    name: 'Koray Okumus',
  },
];
