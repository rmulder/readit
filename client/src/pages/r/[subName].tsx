import Layout from '../../components/Layout.component';
import PostCard from '../../components/post/PostCard.component';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SUB } from '../../graphql/queries/index.queries';
import { ISub } from '../../interfaces/global.interfaces';

const PAGE_DESCRIPTION = 'insert description here';

interface IGetSubReturnData {
  sub: ISub;
}

const Sub = () => {
  const router = useRouter();

  const subName = router.query.subName?.toString();

  const { data, loading } = useQuery<IGetSubReturnData>(GET_SUB, { variables: { name: subName } });

  const sub = data?.sub;

  return (
    <Layout tabTitle={sub?.name || ''} pageDescription={PAGE_DESCRIPTION} includeHeaderPadding={false}>
      {!loading && (
        <div className='sub'>
          <div className='sub-banner'>
            {sub?.bannerUrl ? <div id='banner' className='bg-blue-500 h-36'></div> : <div className='h-20 bg-blue-500'></div>}
          </div>

          <div className='h-20 bg-white sub-meta-data'>
            <div className='flex'>
              <img className='rounded-full' src={sub?.imageUrl} alt='sub-image' width={80} height={80} />
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='mt-10 sub-posts'>
              {sub?.posts.map((post) => {
                return <PostCard key={post.id} post={post} />;
              })}
            </div>

            <div className='flex mt-10 bg-white rounded shadow'>
              <div className='p-3'>
                <div className='font-semibold'>About community</div>

                <div className='text-sm'>{sub?.title}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>
        {`
          #banner {
            background-image: ${`url(${sub?.bannerUrl})`};
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </Layout>
  );
};

export default Sub;
