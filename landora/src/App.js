import './App.css';
import PropertyDashboard from './Components/Property Dashboard/PropertyDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerDashboard from './Components/Customer Dashboard/CustomerDashboard';
import ClientDetails from './Components/Customer Dashboard/ClientDetails';

function App() {
  return (
    <div>
      <PropertyDashboard />
    </div>
  );
}

export default App;
