import Layout from '../../components/Layout.component';
import Link from 'next/link';
import RegisterForm from '../../components/forms/RegisterForm.component';

const PAGE_DESCRIPTION = 'Register to join the readit community!';
const TAB_TITLE = 'Create a new account';

const RegisterPage = () => {
  return (
    <Layout tabTitle={TAB_TITLE} pageDescription={PAGE_DESCRIPTION} fullpage={true}>
      <div className='flex'>
        <div id='register-page-side-img' className='w-40 h-screen bg-center bg-cover'></div>

        <div className='flex flex-col justify-center pl-6 w-72'>
          <h1 className='mb-2 text-2xl font-semibold'>Register</h1>
          <p className='mb-5 text-xs'>
            By continuing, you agree to our <span className='text-blue-500'>User Agreement</span> and
            <span className='text-blue-500'> Privacy Policy</span>.
          </p>

          <RegisterForm />

          <p className='text-sm'>
            Already have an account?
            <Link href='/account/login'>
              <a className='font-semibold text-blue-500'> Login</a>
            </Link>
          </p>
        </div>
      </div>

      <style jsx>
        {`
          #register-page-side-img {
            background-image: url(${'/images/tiles.jpg'});
          }
        `}
      </style>
    </Layout>
  );
};

export default RegisterPage;
