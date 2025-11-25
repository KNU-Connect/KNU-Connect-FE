import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';

export const InfoInputButton = () => {
  return (
    <Container>
      <Button>
        <Text>내 정보 입력하러 가기</Text>
        <ArrowRight size={20} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.spacing[6]};
  box-sizing: border-box;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[20]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  transition: background-color 0.2s;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[30]};
  }
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.default};
`;
