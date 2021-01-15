import Head from 'next/head';
import TopNavbar from './TopNavbar.component';
import layoutStyles from '../styles/layout.styles';

interface IProps {
  children: React.ReactNode;
  tabTitle: string;
  pageDescription: string;
  fullpage?: boolean;
  includeHeaderPadding?: boolean;
}

const Layout = ({ children, tabTitle, pageDescription, fullpage = false, includeHeaderPadding = true }: IProps) => {
  return (
    <div className='h-screen layout'>
      <Head>
        <title>{tabTitle}</title>
        <meta name='description' content={pageDescription} />
      </Head>

      <TopNavbar />

      <div className={`${!fullpage && 'w-7/12 mx-auto'} ${includeHeaderPadding && 'pt-10'} page-content-wrapper h-screen mt-12 page-content`}>
        {children}
      </div>

      <style jsx>{layoutStyles}</style>
    </div>
  );
};

export default Layout;
