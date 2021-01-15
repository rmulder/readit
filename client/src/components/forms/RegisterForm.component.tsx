import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { REGISTER_USER } from '../../graphql/mutations/user.mutations';
import { delay } from '../../utils/delay.utils';
import { emailOptions, passwordOptions, usernameOptions } from '../../validation-rules/auth.validation-rules';
import FormButton from '../buttons/FormButton.component';
import InputGroup from './InputGroup.component';
import ValidationError from './ValidationError.component';

interface IFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<IFormData>();

  const [loading, setLoading] = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);

  const submit = async (formData: IFormData) => {
    try {
      setLoading(true);

      await delay(2000);

      await registerUser({ variables: { ...formData } });

      setLoading(false);
      router.push('/account/login');
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

      <FormButton text='Register' type='submit' loading={loading} />
    </form>
  );
};

export default RegisterForm;
