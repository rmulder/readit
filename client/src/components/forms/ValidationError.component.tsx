interface IProps {
  errorMessage: string;
}
const ValidationError = ({ errorMessage }: IProps) => {
  return (
    <div className='mb-2 validation-error'>
      <span className='text-sm text-red-600'>{errorMessage}</span>
    </div>
  );
};

export default ValidationError;
