import React, { useEffect } from 'react';
import DragBar from '../src/components/DragBar';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

// reset css
import 'tdesign-react/dist/reset.css';

// tdesign theme
import '../src/style/theme.css';

import './style/global.scss';

function App() {
  useEffect(() => {
    const node = window.environmentChannel.node();
    const platform = window.environmentChannel.platform();
    const electron = window.environmentChannel.electron();
    window.logChannel.info(`NODE: v${String(node)}`);
    window.logChannel.info(`PLATFORM: ${String(platform)}`);
    window.logChannel.info(`Chromium: v${String(electron)}`);
    (async () => {
      const res = await window.ipcChannel.getMainColor('www.baidu.com');
      console.log(res);
    })();
  }, []);

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
