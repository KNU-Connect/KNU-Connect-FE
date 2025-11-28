import styled from '@emotion/styled';

type DescriptionInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const DescriptionInput = ({
  value,
  onChange,
}: DescriptionInputProps) => {
  return (
    <Container>
      <Label>설명</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='멘토링에 대한 일정을 공유해 같이 네트워킹할 멘티를 찾아보세요.'
        rows={4}
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

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  outline: none;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[60]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
