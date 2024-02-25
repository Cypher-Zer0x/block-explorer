import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import logo from './assets/cypher_zero_logo.png';
import TransactionDetailsPage from './pages/TransactionDetailsPage'; // Assurez-vous que ce composant existe
import BlockDetailsPage from './pages/BlockDetailsPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar logo={logo}/>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transaction/:hash" element={<TransactionDetailsPage />} />
            <Route path="/block/:hash" element={<BlockDetailsPage />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
