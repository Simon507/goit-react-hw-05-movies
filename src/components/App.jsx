import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export const App = () => {
  return (
    <Layout>
      <GlobalStyle />

      <h1>Phonebook</h1>

      <h2>Contacts</h2>
    </Layout>
  );
};
