import React from 'react';
import Rpc from './pages/rpc';
import Landing from './pages/landing';
import TheEnd from './pages/TheEnd';
import { BrowserRouter as Router,  Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Routes >
        <Route path='/'  element={<Landing/>} />
        <Route path='/rpc'  element={<Rpc/>} />
        <Route path='/TheEnd' element={<TheEnd/>}/>        
      </Routes >
    </Router>
  </>
  
    
    
    
  );
}

export default App;

{/* <button type="button">Click Me</button>
<Rpc totalObjects = {30} /> */}