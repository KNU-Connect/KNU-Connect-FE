import styled from '@emotion/styled';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const TextFieldWrapper = styled.div<{ isFullWidth: boolean }>`
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
`;

const TextFieldInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  opacity: 0.8;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.sub};
  }
`;

export const TextField = ({
  fullWidth = true,
  ...inputProps
}: TextFieldProps) => {
  return (
    <TextFieldWrapper isFullWidth={fullWidth}>
      <TextFieldInput {...inputProps} />
    </TextFieldWrapper>
  );
};
