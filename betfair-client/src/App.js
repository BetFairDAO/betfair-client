import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import RouletteTable from './components/roulette_table';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RouletteTable />
    </div>
  );
}

export default App;
