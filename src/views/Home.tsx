import React from 'react';
import { type PropsType } from '../types/props';
import '../style/views/Home.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = (props): JSX.Element => {
  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <div className={'home-main'}>
      <div>首页</div>
    </div>
  );
};

export default Home;
