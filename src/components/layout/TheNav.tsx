import { APP_WIDTH, NAV_HEIGHT } from '@/constants';
import styled from '@emotion/styled';
import { NavItem, type NavItemType } from './NavItem';
import { ROUTES } from '@/routes';
import {
  CircleUserRound,
  House,
  MessageCircleMore,
  UserRoundSearch,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export type NavType = 'default' | 'none';

const navItems: NavItemType[] = [
  { id: 1, label: '네트워킹', icon: <House size={32} />, path: ROUTES.HOME },
  {
    id: 2,
    label: '채팅',
    icon: <MessageCircleMore size={32} />,
    path: ROUTES.CHAT,
  },
  {
    id: 3,
    label: '멘토찾기',
    icon: <UserRoundSearch size={32} />,
    path: ROUTES.MENTOR,
  },
  {
    id: 4,
    label: '내정보',
    icon: <CircleUserRound size={32} />,
    path: ROUTES.MY,
  },
];

export const TheNav = () => {
  const location = useLocation();

  return (
    <Container>
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          {...item}
          selected={location.pathname === item.path}
        />
      ))}
    </Container>
  );
};

const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  position: sticky;
  max-width: ${APP_WIDTH}px;
  height: ${NAV_HEIGHT}px;
  padding: 0 ${({ theme }) => theme.spacing[10]};
  bottom: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;
