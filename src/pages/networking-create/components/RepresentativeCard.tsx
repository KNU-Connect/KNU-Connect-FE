import styled from '@emotion/styled';
import { User } from 'lucide-react';
import { useTheme } from '@emotion/react';
import type { ChatParticipant } from '@/types/chat';
import { Tag } from '@/components/common';
import {
  buildParticipantTagItems,
  mapDepartmentLabel,
} from '@/utils/networking';

type RepresentativeCardProps = {
  participant: ChatParticipant;
  isSelected: boolean;
  onSelect: () => void;
};

export const RepresentativeCard = ({
  participant,
  isSelected,
  onSelect,
}: RepresentativeCardProps) => {
  const theme = useTheme();
  const tagItems = buildParticipantTagItems(participant, {
    interest: theme.colors.tag.purple,
    career: theme.colors.tag.blue,
    mbti: theme.colors.tag.gold,
  });
  const affiliation =
    mapDepartmentLabel(participant.department) || '소속 정보 없음';

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
          <Name>{participant.name}</Name>
          <Affiliation>{affiliation}</Affiliation>
          {tagItems.length > 0 && (
            <Tags>
              {tagItems.map((tag) => (
                <Tag key={tag.label} tag={tag.label} color={tag.color} />
              ))}
            </Tags>
          )}
          {participant.introduction && <Bio>{participant.introduction}</Bio>}
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
