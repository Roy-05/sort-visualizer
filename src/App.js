import React from 'react';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
//import Navbar from './Navbar/Navbar';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          <SortingVisualizer />
        </div>
      </>
    );
  }
}

export default App;
