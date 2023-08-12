import React, { useEffect, useState } from 'react';
import { Layout } from 'tdesign-react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import PlayBar from './PlayBar';
import PubSub from 'pubsub-js';
import Play from '../views/Play';
import '../style/components/Frame.scss';

interface Props {
  children?: React.ReactNode;
}

const Frame: React.FC<Props> = (props): JSX.Element => {
  const { children } = props;
  const { Content, Aside } = Layout;

  /** state **/
  const [isSpread, setIsSpread] = useState<boolean>(false);

  /** effect **/

  // Subscribe to the global drawer event
  useEffect(() => {
    const drawer = PubSub.subscribe('drawer', (_, data) => {
      setIsSpread(data);
    });
    return () => {
      PubSub.unsubscribe(drawer);
    };
  }, []);

  /** methods **/

  /** render **/
  return (
    <div className={'frame'}>
      <Layout>
        <Aside className={'aside'}>
          <SideNavbar></SideNavbar>
        </Aside>
        <Layout className={'layout'}>
          <Content>
            <div className={'header'}>
              <TopNavbar />
            </div>
            <div className={'content'}>{children}</div>
          </Content>
        </Layout>
      </Layout>
      <div className={'footer'}>
        <PlayBar />
        <div className={`drawer ${isSpread ? 'drawer-active' : ''}`}>
          <Play />
        </div>
      </div>
    </div>
  );
};

export default Frame;
