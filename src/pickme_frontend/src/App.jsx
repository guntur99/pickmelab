import Home from './components/Home';
import Navbar from './components/Navbar';
import Greeting from './components/Greeting';

function App() {

  return (
    <main>

      <div className="stretched dark">

        <div id="wrapper" className="noice-effect overflow-hidden">
          <Navbar/>
          <Home/>
        </div>
      </div>
          {/* <Greeting/> */}
    </main>
  );
}

export default App;
