import styled from '@emotion/styled';
import { User } from 'lucide-react';
import { useTheme } from '@emotion/react';
import type { Representative } from '@/data/mockRepresentatives';
import { getTagColor } from '@/utils';
import { Tag } from '@/components/common';

type RepresentativeCardProps = {
  representative: Representative;
  isSelected: boolean;
  onSelect: () => void;
};

export const RepresentativeCard = ({
  representative,
  isSelected,
  onSelect,
}: RepresentativeCardProps) => {
  const theme = useTheme();

  return (
    <Container $isSelected={isSelected} onClick={onSelect}>
      <RadioButton $isSelected={isSelected}>
        {isSelected && <RadioButtonInner />}
      </RadioButton>
      <Box>
        <ProfileImage>
          <User size={40} />
        </ProfileImage>
        <Info>
          <Name>{representative.name}</Name>
          <Affiliation>{representative.affiliation}</Affiliation>
          <Tags>
            {representative.tags.map((tag, index) => (
              <Tag key={index} tag={tag} color={getTagColor(tag, theme)} />
            ))}
          </Tags>
          <Bio>{representative.bio}</Bio>
        </Info>
      </Box>
    </Container>
  );
};

const Container = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.gray[30]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RadioButton = styled.div<{ $isSelected: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.gray[60]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary : 'transparent'};
  transition: all 0.2s;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const RadioButtonInner = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;

const ProfileImage = styled.div`
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray[30]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.sub};
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 1;
  min-width: 0;
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Affiliation = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Bio = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
`;
