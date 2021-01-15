import { FetchResult, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthDispatch } from '../../context/auth.context';
import { LOGIN_USER } from '../../graphql/mutations/user.mutations';
import { delay } from '../../utils/delay.utils';
import { passwordOptions, usernameOptions } from '../../validation-rules/auth.validation-rules';
import FormButton from '../buttons/FormButton.component';
import InputGroup from './InputGroup.component';
import ValidationError from './ValidationError.component';

interface IFormData {
  username: string;
  password: string;
}

interface ILoginData {
  username: string;
  email: string;
}

const LoginForm = () => {
  const dispatch = useAuthDispatch();

  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<IFormData>();

  const [loading, setLoading] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const submit = async (formData: IFormData) => {
    try {
      setLoading(true);
      await delay(2000);

      const data = await login({ variables: { ...formData } });

      dispatch({ type: 'LOGIN', payload: { username: data.data.login.username, email: data.data.login.email } });
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

      <InputGroup
        wrapperClassname={errors.password ? '' : 'mb-2'}
        type='password'
        placeholder='Password'
        name='password'
        register={register(passwordOptions)}
      />
      {errors.password && <ValidationError errorMessage={errors.password.message!} />}

      <FormButton text='Login' type='submit' loading={loading} />
    </form>
  );
};

export default LoginForm;
