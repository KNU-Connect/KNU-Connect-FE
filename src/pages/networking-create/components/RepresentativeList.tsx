import styled from '@emotion/styled';
import { mockRepresentatives } from '@/data/mockRepresentatives';
import { RepresentativeCard } from './RepresentativeCard';

type RepresentativeListProps = {
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const RepresentativeList = ({
  selectedId,
  onSelect,
}: RepresentativeListProps) => {
  return (
    <Container>
      <Title>대표자 설정하기</Title>
      <List>
        {mockRepresentatives.map((representative) => (
          <RepresentativeCard
            key={representative.id}
            representative={representative}
            isSelected={selectedId === representative.id}
            onSelect={() => onSelect(representative.id)}
          />
        ))}
      </List>
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

