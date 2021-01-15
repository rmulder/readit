//TODO: register function needs to take a paramater of type RegisterOptions, but ref errors out. Figure it out

interface IProps {
  wrapperClassname: string;
  type: string;
  placeholder: string;
  name: string;
  register: (validationRules: any) => void;
}

const InputGroup = ({ wrapperClassname, type, placeholder, name, register }: IProps) => {
  return (
    <div className={`input-group ${wrapperClassname}`}>
      <input
        className='w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:bg-white'
        type={type}
        placeholder={placeholder}
        name={name}
        ref={register}
      />
    </div>
  );
};

export default InputGroup;
