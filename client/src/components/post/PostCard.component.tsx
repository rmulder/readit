import { IPost } from '../../interfaces/global.interfaces';
import Link from 'next/link';
import VoteButton from '../buttons/VoteButton.component';
import dayjs from 'dayjs';
import { readitAxios } from '../../configs/axios.config';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface IPostCardProps {
  post: IPost;
}

const PostCard = ({ post: { id, title, body, createdAt, url, subName, username, voteCount, userVote, commentCount } }: IPostCardProps) => {
  const handleVote = async (type: 'upvote' | 'downvote') => {
    const voteTypeToNum = type === 'upvote' ? 1 : -1;
    try {
      await readitAxios.post(`/posts/${id}/votes`, { type: voteTypeToNum });
    } catch (err) {}
  };

  return (
    <div className='flex mb-4 bg-white rounded shadow'>
      <div className='w-10 text-center bg-gray-100 rounded-l'>
        <VoteButton type='upvote' active={userVote === 1} handleClick={() => handleVote('upvote')} />
        <div className='text-xs font-semibold'>{voteCount}</div>
        <VoteButton type='downvote' active={userVote === -1} handleClick={() => handleVote('downvote')} />
      </div>

      <div className='w-full p-2'>
        <div className='flex items-center'>
          <Link href={`/r/${subName}`}>
            <img src='/images/default-sub.png' className='w-6 h-6 mr-1 rounded-full cursor-pointer' alt='subreddit' />
          </Link>
          <Link href={`/r/${subName}`}>
            <a className='text-xs font-bold hover:underline'>{`/r/${subName}`}</a>
          </Link>

          <p className='ml-1 text-xs text-gray-500'>
            Posted by
            <Link href={`/u/${username}`}>
              <a className='mx-1 hover:underline'>{`/u/${username}`}</a>
            </Link>
            <Link href={url}>
              <a className='mx-1 hover:underline'>{dayjs(createdAt).fromNow()}</a>
            </Link>
          </p>
        </div>

        <Link href={url}>
          <a className='my-1 text-lg font-medium hover:underline'>{title}</a>
        </Link>

        {body && <p className='my-1 text-sm'>{body}</p>}

        <div className='flex'>
          <Link href={url}>
            <a>
              <div className='px-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                <i className='fas fa-comment-alt fa-xs'></i>
                <span className='ml-1 font-bold'>{commentCount} comment(s)</span>
              </div>
            </a>
          </Link>

          <div className='px-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
            <i className='fas fa-share fa-xs'></i>
            <span className='ml-1 font-bold'>share</span>
          </div>

          <div className='px-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
            <i className='fas fa-bookmark fa-xs'></i>
            <span className='ml-1 font-bold'>bookmark</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
