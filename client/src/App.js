import './app.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { Spinner } from 'react-bootstrap';
import { check } from './http/userApi';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then(() => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  });

  return (
    <BrowserRouter>
      <NavBar />
      {loading ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <Spinner
            animation="border"
            variant="dark"
            style={{ width: '4rem', height: '4rem' }}
          />
          <div className="mt-3 text-center">Loading...</div>
        </div>
      ) : (
        <AppRouter />
      )}
    </BrowserRouter>
  );
}

export default observer(App);
