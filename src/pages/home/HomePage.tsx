import styled from '@emotion/styled';
import { mockNetworkingPosts } from '@/data/mockNetworking';
import { SearchBar, InfoInputButton, PostList } from './components';

const HomePage = () => {
  return (
    <Container>
      <SearchBar />
      <InfoInputButton />
      <PostList posts={mockNetworkingPosts} />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  gap: ${({ theme }) => theme.spacing[4]};
`;
