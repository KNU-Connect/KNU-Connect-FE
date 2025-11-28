import styled from '@emotion/styled';

type TagProps = {
  tag: string;
  color: string;
};

export const Tag = ({ tag, color }: TagProps) => {
  return <StyledTag $color={color}>{tag}</StyledTag>;
};

const StyledTag = styled.span<{ $color: string }>`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  background-color: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

