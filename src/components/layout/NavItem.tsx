import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export type NavItemType = {
  id: number;
  icon: React.ReactNode;
  label: string;
  path: string;
};

type NavItemProps = NavItemType & {
  selected: boolean;
};

export const NavItem = ({ icon, label, path, selected }: NavItemProps) => {
  return (
    <Item to={path} selected={selected}>
      {icon}
      <Text bold={selected}>{label}</Text>
    </Item>
  );
};

const Item = styled(Link)<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[2]};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.gray[100]};
`;

const Text = styled.p<{ bold: boolean }>`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: inherit;
  font-weight: ${({ bold, theme }) =>
    bold
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.regular};
`;
