import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../components/Layout.component'), { ssr: false });
import PostCard from '../components/post/PostCard.component';
import { useQuery } from '@apollo/client';
import { IPost } from '../interfaces/global.interfaces';
import { GET_POSTS } from '../graphql/queries/post.queries';

interface IPostsData {
  posts: IPost[];
}

const PAGE_DESCRIPTION = 'Welcome to readit. Feel free to browse around';

const Index = () => {
  const { data, loading } = useQuery<IPostsData>(GET_POSTS);

  return (
    <Layout tabTitle='Readit: Front page of the internet' pageDescription={PAGE_DESCRIPTION}>
      <div className='flex justify-between'>
        <div>{loading ? <p>Loading...</p> : data?.posts.map((post) => <PostCard key={post.id} post={post} />)}</div>

        <div>Side bar</div>
      </div>
    </Layout>
  );
};

export default Index;
