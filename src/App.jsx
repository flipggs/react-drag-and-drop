import React from 'react';
import './App.css';

import DragNDrop from './DragNDrop';

const data = [
  { id: 1, title: 'group 1', items: [] },
  { id: 2, title: 'group 2', items: [] },
];

function App() {
  return (
    <div className="App">
     <header className="App-header">
       
      <DragNDrop data={data} />

     </header>
    </div>
  );
}

export default App;
