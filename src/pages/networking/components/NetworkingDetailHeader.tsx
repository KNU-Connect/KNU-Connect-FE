import { useUserProfile } from '@/pages/my/hooks/useUserProfile';
import { ROUTES } from '@/routes';
import styled from '@emotion/styled';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const NetworkingDetailHeader = ({
  representativeId,
}: {
  representativeId: number;
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useUserProfile();

  const gotoModify = () => {
    navigate(ROUTES.NETWORKING_MODIFY.replace(':id', id ?? ''));
  };

  if (isPending) {
    return null;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={24} />
      </BackButton>
      {data?.id === representativeId && (
        <Button onClick={gotoModify}>수정</Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.default};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
`;
