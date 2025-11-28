import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { useState } from 'react';

type SearchBarProps = {
  onSearch: (keyword: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder='게시글 검색하기'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Icon onClick={handleSubmit}>
          <Search size={20} />
        </Icon>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[6]};
`;

const Form = styled.form`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacing[3]} ${theme.spacing[10]} ${theme.spacing[3]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};
  border-radius: ${({ theme }) => theme.spacing[4]};
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
  cursor: pointer;
`;
