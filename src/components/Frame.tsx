import React from 'react';
import { Layout } from 'tdesign-react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import PlayBar from './PlayBar';
import '../style/components/Frame.scss';

interface Props {
  children?: React.ReactNode;
}

const Frame: React.FC<Props> = (props): JSX.Element => {
  const { children } = props;
  const { Content, Aside } = Layout;

  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <>
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
      </div>
    </>
  );
};

export default Frame;
