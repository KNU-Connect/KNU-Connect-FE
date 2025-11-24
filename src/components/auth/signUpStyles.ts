import styled from '@emotion/styled';
import { MainButton } from '@/components/common';

export const SignUpPageContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]};
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

export const VerificationButton = styled(MainButton)`
  flex-shrink: 0;
  width: auto;
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
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

export const FieldLabel = styled.p`
  ${({ theme }) => theme.typography.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-top: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.default};
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
