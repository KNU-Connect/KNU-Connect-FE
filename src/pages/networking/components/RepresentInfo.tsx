import { useTheme } from '@emotion/react';
import type { NetworkingPost } from '@/types/networking';
import styled from '@emotion/styled';
import { User } from 'lucide-react';
import { getTagColor } from '@/utils';
import { Tag } from '@/components/common';
import { formatMbtiLabel } from '@/utils/networking/participantLabels';

export const RepresentInfo = ({ post }: { post: NetworkingPost }) => {
  const theme = useTheme();

  return (
    <Container>
      <Title>대표자</Title>
      <Info>
        <ProfileImage>
          <User size={40} />
        </ProfileImage>
        <Details>
          <Name>{post.representative.name}</Name>
          <Affiliation>{post.representative.affiliation}</Affiliation>
          <Tags>
            {post.representative.tags.map((tag, index) => (
              <Tag
                key={index}
                tag={formatMbtiLabel(tag)}
                color={getTagColor(tag, theme)}
              />
            ))}
          </Tags>
          <Bio>{post.representative.bio}</Bio>
        </Details>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Info = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
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

const Details = styled.div`
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
  word-break: break-word;
  overflow-wrap: break-word;
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
