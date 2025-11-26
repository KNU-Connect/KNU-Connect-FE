import styled from '@emotion/styled';
import type { NetworkingPost } from '@/types/networking';

export const NetworkingDescription = ({ post }: { post: NetworkingPost }) => {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Description>
        {post.description.split('\n').map((line, index) => (
          <DescriptionLine key={index}>{line}</DescriptionLine>
        ))}
      </Description>
      <MetaInfo>
        <Participants>
          {post.currentParticipants}/{post.maxParticipants}명
        </Participants>
        <Date>{post.date}</Date>
      </MetaInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing[4]};
  min-height: 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  line-height: ${({ theme }) => theme.typography.title1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;
  flex-shrink: 0;
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 0;
  overflow-y: auto;
`;

const DescriptionLine = styled.p`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
`;

const Participants = styled.span`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;
