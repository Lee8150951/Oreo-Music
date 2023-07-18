import React from 'react';
import { Layout } from 'tdesign-react';
import SideNavbar from './SideNavbar';
import PlayBar from './PlayBar';

interface Props {
  children?: React.ReactNode;
}

const Frame: React.FC<Props> = (props): JSX.Element => {
  const { children } = props;
  const { Content, Footer, Aside } = Layout;

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
        <Layout>
          <Content>
            <div>{children}</div>
          </Content>
          <Footer>Copyright @ 2019-2020 Tencent. All Rights Reserved</Footer>
        </Layout>
      </Layout>
      <PlayBar />
    </>
  );
};

export default Frame;
