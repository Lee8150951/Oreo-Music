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
      <div className={'recommend-list-contain'}>
        <div className={'recommend-list-title'}>For you</div>
        <div className={'recommend-list-panel'}></div>
      </div>
      <div className={'other-recommend-contain'}>
        <div className={'daily-recommend-contain'}>
          <div className={'daily-recommend-title'}>每日推荐</div>
        </div>
        <div className={'singer-list-contain'}>
          <div className={'singer-list-title'}>推荐艺人</div>
        </div>
      </div>
      <div className={'album-list-contain'}>
        <div className={'album-list-title'}>新碟上架</div>
      </div>
      <div className={'charts-list-contain'}>
        <div className={'charts-list-title'}>排行榜</div>
      </div>
    </div>
  );
};

export default Home;
