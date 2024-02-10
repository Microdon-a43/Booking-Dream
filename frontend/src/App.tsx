import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <p>Login Page</p>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
