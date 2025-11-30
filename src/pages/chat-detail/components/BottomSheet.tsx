import styled from '@emotion/styled';
import { FileEdit } from 'lucide-react';
import { APP_WIDTH } from '@/constants/number';
import type { GetChatRoomTypeResponse } from '../services/chat';
import { useNavigate } from 'react-router-dom';

type BottomSheetProps = {
  isOpen: boolean;
  onNetworkPostClick: () => void;
  roomTypeData: GetChatRoomTypeResponse;
  networking_id: number;
};

export const BottomSheet = ({
  isOpen,
  onNetworkPostClick,
  roomTypeData,
  networking_id,
}: BottomSheetProps) => {
  const navigate = useNavigate();

  const gotoNetworkingPost = () => {
    navigate(`/networking/${networking_id}`);
  };

  return (
    <Container $isOpen={isOpen}>
      <Content>
        {!roomTypeData.is_networking ? (
          <NetworkPostButton onClick={onNetworkPostClick}>
            <FileEdit size={24} />
            <ButtonText>네트워킹 글 생성하기</ButtonText>
          </NetworkPostButton>
        ) : (
          <NetworkPostButton onClick={gotoNetworkingPost}>
            <FileEdit size={24} />
            <ButtonText>네트워킹 글 보러가기</ButtonText>
          </NetworkPostButton>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35vh;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  z-index: 10;
  display: flex;
  flex-direction: column;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.1s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
`;

const NetworkPostButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[20]};
  }
`;

const ButtonText = styled.span`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.default};
`;
