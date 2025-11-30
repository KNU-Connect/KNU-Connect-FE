import styled from '@emotion/styled';
import { Plus, X, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import { APP_WIDTH } from '@/constants/number';

type ChatInputProps = {
  isBottomSheetOpen: boolean;
  onPlusClick: () => void;
  onSend: (message: string) => void;
};

export const ChatInput = ({
  isBottomSheetOpen,
  onPlusClick,
  onSend,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const isComposingRef = useRef(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME 조합 중이 아닐 때만 Enter 키 처리
    if (e.key === 'Enter' && !e.shiftKey && !isComposingRef.current) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container $isBottomSheetOpen={isBottomSheetOpen}>
      <ActionButton onClick={onPlusClick}>
        {isBottomSheetOpen ? <X size={24} /> : <Plus size={24} />}
      </ActionButton>
      <Input
        placeholder='메시지 입력'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <SendButton onClick={handleSend} disabled={!message.trim()}>
        <Send size={24} />
      </SendButton>
    </Container>
  );
};

const Container = styled.div<{ $isBottomSheetOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[30]};
  gap: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  position: fixed;
  bottom: ${({ $isBottomSheetOpen }) => ($isBottomSheetOpen ? '35vh' : '0')};
  left: 0;
  right: 0;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  z-index: 10;
  transition: bottom 0.1s ease;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.sub};
  transition: opacity 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.sub};
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.text.sub : theme.colors.text.default};
  transition: opacity 0.2s;
  flex-shrink: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
