import Layout from '../../components/Layout.component';
import Link from 'next/link';
import LoginForm from '../../components/forms/LoginForm.component';

const PAGE_DESCRIPTION = 'Login to start interacting with the readit community';

const Login = () => {
  return (
    <Layout tabTitle='Login' pageDescription={PAGE_DESCRIPTION} fullpage={true}>
      <div className='flex'>
        <div id='login-page-side-img' className='w-40 h-screen bg-center bg-cover'></div>

        <div className='flex flex-col justify-center pl-6 w-72'>
          <h1 className='mb-5 text-xl font-semibold'>Login</h1>

          <LoginForm />

          <p className='text-sm'>
            Do not have an account?
            <Link href='/account/register'>
              <a className='font-semibold text-blue-500'> Register</a>
            </Link>
          </p>
        </div>
      </div>

      <style jsx>
        {`
          #login-page-side-img {
            background-image: url(${'/images/tiles.jpg'});
          }
        `}
      </style>
    </Layout>
  );
};
export default Login;
