import Home from './components/Home';
import Navbar from './components/Navbar';
import Greeting from './components/Greeting';

function App() {

  return (
    <main>

      <div class="stretched dark">

        <div id="wrapper" class="noice-effect overflow-hidden">
          <Navbar/>
          <Home/>
        </div>
      </div>
          {/* <Greeting/> */}
    </main>
  );
}

export default App;
