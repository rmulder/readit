import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AuthProvider } from '../context/auth.context';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: 'http://localhost:9000/graphql',
    credentials: 'include',
  }),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
