import styles from '../../styles/FormButton.styles';

interface IFormButtonProps {
  type: 'submit' | 'button' | 'reset';
  text: string;
  loading?: boolean;
}

const classNames =
  'w-full py-2 mb-4 font-semibold text-white rounded bg-p-blue hover:bg-p-lightBlue disabled:bg-p-superLightBlue disabled:disable-cursor active:outline-none';

const FormButton = ({ type, text, loading = false }: IFormButtonProps) => {
  return (
    <>
      <button className={classNames} type={type} disabled={loading}>
        {loading ? <span className={`${loading && 'spinner'}`}></span> : text}
      </button>

      <style jsx>{styles}</style>
    </>
  );
};

export default FormButton;
