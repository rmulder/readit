import FormButton from '../buttons/FormButton.component';
import InputGroup from './InputGroup.component';
import ValidationError from './ValidationError.component';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LOGIN_USER } from '../../graphql/mutations/user.mutations';
import { delay } from '../../utils/delay.utils';
import { passwordOptions, usernameOptions } from '../../utils/validation-rules/auth.validation-rules';
import { login as loginAction } from '../../redux/actions/auth.actions';
import { useDispatch } from 'react-redux';
import { IUser } from '../../interfaces/global.interfaces';

interface IFormData {
  username: string;
  password: string;
}

interface ILoginMutationReturnData {
  login: IUser;
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<IFormData>();

  const [loading, setLoading] = useState(false);

  const [login] = useMutation<ILoginMutationReturnData>(LOGIN_USER);

  const submit = async (formData: IFormData) => {
    try {
      setLoading(true);
      await delay(2000);

      const result = await login({ variables: { loginInput: { ...formData } } });

      const returnData = result.data?.login;

      dispatch(loginAction(returnData!));

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
