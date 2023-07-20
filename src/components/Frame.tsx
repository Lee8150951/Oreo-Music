import React from 'react';
import { Layout } from 'tdesign-react';
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
        <Aside>
          <SideNavbar></SideNavbar>
        </Aside>
        <Layout className={'layout'}>
          <Content>
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
      <PlayBar />
    </>
  );
};

export default Frame;
