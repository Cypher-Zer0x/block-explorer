
import './App.css';
import HomePage from './pages/HomePage'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import logo from './assets/cypher_zero_logo.png'
function App() {
  return (
    <div className="App">
      <Navbar logo={logo}/>
      <div className="App-content">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
