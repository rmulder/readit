import Link from 'next/link';

interface ILinkButtonProps {
  to: string;
  text: string;
  inverse?: boolean;
  onClick?: () => void;
}

const inverseClassNames = 'text-p-blue bg-white border border-p-blue';
const filledClassNames = 'text-white bg-p-blue hover:bg-p-lightBlue border border-p-blue hover:border-p-lightBlue';

const LinkButton = ({ to, text, inverse, onClick }: ILinkButtonProps) => {
  return (
    <Link href={to}>
      <a>
        <button className={`${inverse ? inverseClassNames : filledClassNames} px-6 py-1 cursor-pointer rounded font-semibold `} onClick={onClick}>
          {text}
        </button>
      </a>
    </Link>
  );
};

export default LinkButton;
