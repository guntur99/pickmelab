import Navbar from './components/Navbar';
import Routes from './routes';

function App() {

  return (
    <>
      <main>
      <div className="stretched dark">
        <Navbar/>
        <div id="wrapper" className="noice-effect overflow-hidden"></div>
      </div>
    </main>
    <Routes/>
    </>
  );
}

export default App;
