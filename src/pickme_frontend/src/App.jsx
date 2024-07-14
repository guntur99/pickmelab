import Navbar from './components/Navbar';
import Guest from "./Guest";
import Routes from './routes';
import { useAuth, AuthProvider } from './AuthProvider';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      { isAuth ? <Navbar/> : <Guest/> }
      <Routes/>
    </>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
