//import { Component } from 'react';
import './App.css';
import LineChart from './components/LineChart'; 
import DualChart from './components/DualChart';
import AttackChart from './components/attackChart';

function App() {
  return (
    <div className="App">
      <LineChart />
      <DualChart />
      <AttackChart />
    </div>
  );
}

export default App;
