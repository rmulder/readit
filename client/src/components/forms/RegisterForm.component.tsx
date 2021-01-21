import FormButton from '../buttons/FormButton.component';
import InputGroup from './InputGroup.component';
import ValidationError from './ValidationError.component';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { REGISTER_USER } from '../../graphql/mutations/user.mutations';
import { delay } from '../../utils/delay.utils';
import { emailOptions, passwordOptions, usernameOptions } from '../../utils/validation-rules/auth.validation-rules';
import { login } from '../../redux/actions/auth.actions';
import { IUser } from '../../interfaces/global.interfaces';
import { useDispatch } from 'react-redux';

interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterMutationReturnData {
  register: IUser;
}

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [registerUser] = useMutation<IRegisterMutationReturnData>(REGISTER_USER);
  const { register, handleSubmit, errors, watch } = useForm<IFormData>();

  const submit = async (formData: IFormData) => {
    try {
      setLoading(true);

      await delay(2000);

      const result = await registerUser({ variables: { registerInput: { ...formData } } });
      const returnData = result.data?.register;

      dispatch(login(returnData!));
      setLoading(false);
      router.push('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputGroup
        wrapperClassname={errors.username ? '' : 'mb-2'}
        type='text'
        placeholder='Username'
        name='username'
        register={register(usernameOptions)}
      />
      {errors.username && <ValidationError errorMessage={errors.username.message!} />}

      <InputGroup wrapperClassname={errors.email ? '' : 'mb-2'} type='text' placeholder='Email' name='email' register={register(emailOptions)} />
      {errors.email && <ValidationError errorMessage={errors.email.message!} />}

      <InputGroup
        wrapperClassname={errors.password ? '' : 'mb-2'}
        type='password'
        placeholder='Password'
        name='password'
        register={register(passwordOptions)}
      />
      {errors.password && <ValidationError errorMessage={errors.password.message!} />}

      <InputGroup
        wrapperClassname={errors.confirmPassword ? '' : 'mb-2'}
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        register={register({
          required: {
            value: true,
            message: 'please confirm your password',
          },
          minLength: {
            value: 6,
            message: 'password must be at least 6 characters',
          },
          validate: (confirmPasswordValue) => {
            return confirmPasswordValue === watch('password') || 'passwords do not match';
          },
        })}
      />
      {errors.confirmPassword && <ValidationError errorMessage={errors.confirmPassword.message!} />}

      <FormButton text='Register' type='submit' loading={loading} />
    </form>
  );
};

export default RegisterForm;
