import styled from '@emotion/styled';
import { X } from 'lucide-react';
import { APP_WIDTH } from '@/constants/number';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: ${APP_WIDTH}px;
  width: calc(100% - ${({ theme }) => theme.spacing[8]});
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Question = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  margin-top: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Button = styled.button<{ $variant: 'confirm' | 'cancel' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  background-color: ${({ $variant, theme }) =>
    $variant === 'confirm' ? theme.colors.primary : theme.colors.gray[30]};
  color: ${({ $variant, theme }) =>
    $variant === 'confirm' ? theme.colors.gray[0] : theme.colors.text.default};

  &:hover:not(:disabled) {
    ${({ $variant, theme }) =>
      $variant === 'confirm'
        ? 'opacity: 0.9;'
        : `background-color: ${theme.colors.gray[40]};`}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

type JoinChatRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
};

export const JoinChatRoomModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: JoinChatRoomModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        <Question>채팅방에 참여하시겠습니까?</Question>
        <ButtonContainer>
          <Button
            $variant='confirm'
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? '처리 중...' : '예'}
          </Button>
          <Button $variant='cancel' onClick={onClose} disabled={isPending}>
            아니오
          </Button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};
