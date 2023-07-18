import React from 'react';
import DragBar from '../src/components/DragBar';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

// reset css
import 'tdesign-react/dist/reset.css';

// tdesign theme
import '../src/style/theme.css';

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
