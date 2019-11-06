import React from 'react';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Navbar from './Navbar/Navbar';

class App extends React.Component {
    
  GNAclickHandler = () => {
    console.log("clicked!");
    /*
    this.setState((prevState) => {
      return {GNA: !prevState.GNA}
    });
    */
  }

  render() {
    return (
      <>
        <header>
          <Navbar GNAclick = {this.GNAclickHandler}/>
        </header>
        <div className="App">
          <SortingVisualizer />
        </div>
      </>
    );
  }
}

export default App;
