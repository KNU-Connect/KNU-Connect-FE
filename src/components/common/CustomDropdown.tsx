import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown } from 'lucide-react';

export type DropdownOption = {
  value: string;
  label: string;
};

export type CustomDropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  color?: string;
  isStatusType?: boolean;
};

const DropdownButton = styled.button<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: 12px;
  border: none;
  background-color: ${({ $color }) => $color || '#9790C3'};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  position: relative;
`;

const DropdownContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: ${({ $fullWidth }) => ($fullWidth ? 'block' : 'inline-block')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const DropdownMenu = styled.div<{ $isOpen: boolean; $fullWidth?: boolean }>`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[1]});
  left: 0;
  z-index: 1000;
  min-width: 120px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  background: none;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[10]};
  }

  &:first-of-type {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-of-type {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const StatusDropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.text.default};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
`;

export const CustomDropdown = ({
  value,
  options,
  onChange,
  color,
  isStatusType = false,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? value;

  return (
    <DropdownContainer ref={dropdownRef} $fullWidth={isStatusType}>
      {isStatusType ? (
        <StatusDropdownButton
          onClick={() => setIsOpen((prev) => !prev)}
          type='button'
        >
          {displayLabel}
          <ChevronDown size={16} />
        </StatusDropdownButton>
      ) : (
        <DropdownButton
          $color={color}
          onClick={() => setIsOpen((prev) => !prev)}
          type='button'
        >
          {displayLabel}
          <ChevronDown size={16} />
        </DropdownButton>
      )}
      <DropdownMenu $isOpen={isOpen} $fullWidth={isStatusType}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            type='button'
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
