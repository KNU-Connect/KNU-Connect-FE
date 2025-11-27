import styled from '@emotion/styled';
import { MainButton } from '@/components/common';

export const SignUpPageContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const AppLogo = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Pacifico', 'cursive';
  font-size: 1.8rem;
`;

export const SignUpTitle = styled.h2`
  ${({ theme }) => theme.typography.subtitle1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const InputField = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
`;

export const VerificationInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const VerificationButton = styled(MainButton)`
  flex-shrink: 0;
  width: auto;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[40]};
    color: ${({ theme }) => theme.colors.text.white};
    opacity: 1;
    cursor: not-allowed;
  }
`;

export const FieldErrorMessage = styled.p<{ hasError: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[1]};
  height: ${({ theme }) => theme.typography.body2.lineHeight};
  ${({ theme }) => theme.typography.body2};
  color: ${({ hasError, theme }) =>
    hasError ? theme.colors.primary : 'transparent'};
  visibility: ${({ hasError }) => (hasError ? 'visible' : 'hidden')};
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(
    ${({ theme }) =>
      `(${theme.spacing[4]} * 2) + ${theme.typography.body1.lineHeight} + ${theme.typography.body2.lineHeight} + ${theme.spacing[1]}`}
  );
`;

export const VerificationTimer = styled.span`
  ${({ theme }) => theme.typography.body2};
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: 0.8125rem;
  pointer-events: none;
`;

export const FieldLabel = styled.p`
  ${({ theme }) => theme.typography.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-top: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const MentorDescription = styled.p`
  ${({ theme }) => theme.typography.body2};
  font-size: 0.8125rem;
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.sub};
  line-height: 1.4;
`;

export const MentorToggleContainer = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

export const MentorToggleButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border: none;
  cursor: pointer;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.text.white};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.text.white : theme.colors.text.default};
  ${({ theme }) => theme.typography.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export const SignupResultOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1200;
`;

export const SignupResultContainer = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  position: relative;
`;

export const SignupResultCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
`;

export const SignupResultMessage = styled.p<{ isError?: boolean }>`
  ${({ theme }) => theme.typography.subtitle2};
  text-align: center;
  color: ${({ isError, theme }) =>
    isError ? theme.colors.primary : theme.colors.text.default};
  white-space: pre-line;
`;
