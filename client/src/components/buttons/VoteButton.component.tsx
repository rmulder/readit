interface IProps {
  type: 'upvote' | 'downvote';
  active?: boolean;
  handleClick: () => void;
}

const upvoteClasses = 'hover:text-blue-500 fas fa-arrow-up';

const downvoteClasses = 'hover:text-red-500 fas fa-arrow-down';

const upvoteActiveClasses = 'text-blue-500';

const downvoteActiveClasses = 'text-red-500';

const VoteButton = ({ type, active = false, handleClick }: IProps) => {
  return (
    <i
      className={`${type === 'upvote' ? upvoteClasses : downvoteClasses} ${type === 'upvote' && active && upvoteActiveClasses} ${
        type === 'downvote' && active && downvoteActiveClasses
      } p-1 mt-1 text-gray-500 cursor-pointer hover:bg-gray-300 fa-xs`}
      onClick={handleClick}
    ></i>
  );
};

export default VoteButton;
