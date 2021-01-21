import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { createWrapper } from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { store } from '../redux/store.redux';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: 'http://localhost:9000/graphql',
    credentials: 'include',
  }),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
};

//making nextjs work with redux
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
