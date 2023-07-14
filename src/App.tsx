import React from 'react';
import DragBar from '../src/components/DragBar';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

// reset css
import 'tdesign-react/dist/reset.css';

// tdesign
import 'tdesign-react/es/style/index.css';

function App() {
  return (
    <>
      <DragBar />
      <HashRouter>
        <RouterView />
      </HashRouter>
    </>
  );
}

export default App;
