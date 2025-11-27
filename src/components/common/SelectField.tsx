import styled from '@emotion/styled';
import { ChevronDown } from 'lucide-react';

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
}

const SelectFieldWrapper = styled.div<{ isFullWidth: boolean }>`
  position: relative;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
`;

const SelectFieldInput = styled.select<{ hasValue: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  padding-right: ${({ theme }) => theme.spacing[10]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  appearance: none;
  background-image: none;
  opacity: 0.9;
  cursor: pointer;
  color: ${({ hasValue, theme }) =>
    hasValue ? theme.colors.text.default : theme.colors.text.sub};

  option {
    color: ${({ theme }) => theme.colors.text.default};
  }

  option[value=''][disabled] {
    color: ${({ theme }) => theme.colors.text.sub};
  }
`;

const SelectIcon = styled(ChevronDown)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.sub};
  width: 20px;
  height: 20px;
`;

export const SelectField = ({
  fullWidth = true,
  value,
  ...selectProps
}: SelectFieldProps) => {
  const hasValue = value !== '' && value !== undefined;

  return (
    <SelectFieldWrapper isFullWidth={fullWidth}>
      <SelectFieldInput {...selectProps} value={value} hasValue={hasValue} />
      <SelectIcon />
    </SelectFieldWrapper>
  );
};
