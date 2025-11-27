import styled from '@emotion/styled';
import { Plus, Send } from 'lucide-react';
import { useState } from 'react';

export const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // TODO: 메시지 전송 로직
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <PlusButton>
        <Plus size={24} />
      </PlusButton>
      <Input
        placeholder='메시지 입력'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <SendButton onClick={handleSend} disabled={!message.trim()}>
        <Send size={24} />
      </SendButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[30]};
  gap: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;

const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
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
