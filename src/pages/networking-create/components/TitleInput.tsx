import styled from '@emotion/styled';

type TitleInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <Container>
      <Label>제목</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='제목을 입력해주세요.'
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  background: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[60]};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;
