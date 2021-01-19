import Link from 'next/link';
import LinkButton from './buttons/LinkButton.component';
import RedditLogo from '../../public/images/reddit-logo.svg';

import { useAuthDispatch, useAuthState } from '../hooks/auth.hooks';
import { useLazyQuery } from '@apollo/client';
import { LOGOUT_USER } from '../graphql/queries/user.queries';
import { delay } from '../utils/delay.utils';

const TopNavbar = () => {
  const { authenticated, user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [logout] = useLazyQuery(LOGOUT_USER);

  const handleLogout = async () => {
    await delay(2000);
    logout();

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className='fixed inset-x-0 top-0 z-50 flex items-center h-12 px-5 bg-white top-navbar'>
      <div className='flex items-center'>
        <Link href='/'>
          <a>
            <RedditLogo className='w-8 h-8 mr-2' />
          </a>
        </Link>

        <span className='text-2xl font-semibold'>
          <Link href='/'>
            <a>readit</a>
          </Link>
        </span>
      </div>

      <div className='flex items-center mx-auto border rounded bg-gray-50 hover:bg-white hover:border-p-lightBlue'>
        <i className='pl-3 pr-3 text-gray-400 fas fa-search' aria-hidden></i>
        <input className='py-1 pr-3 rounded bg-gray-50 w-80 focus:outline-none' type='text' placeholder='Search' />
      </div>

      <div className='flex p-2'>
        {authenticated && (
          <>
            <span className='pr-2'>Welcome {user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!authenticated && (
          <>
            <div className='pr-3'>
              <LinkButton to='/account/register' text='Register' />
            </div>

            <div>
              <LinkButton to='/account/login' text='Login' inverse />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
