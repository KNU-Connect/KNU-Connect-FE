import styled from '@emotion/styled';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ isFullWidth: boolean }>`
  box-sizing: border-box;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle1.lineHeight};
  text-align: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MainButton = ({
  fullWidth = true,
  children,
  ...buttonProps
}: ButtonProps) => (
  <StyledButton isFullWidth={fullWidth} {...buttonProps}>
    {children}
  </StyledButton>
);
