import styled from '@emotion/styled';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <Container>
      <Input placeholder='게시글 검색하기' />
      <Icon>
        <Search size={20} />
      </Icon>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacing[3]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.sub};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Icon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing[9]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.sub};
  display: flex;
  align-items: center;
  pointer-events: none;
`;
