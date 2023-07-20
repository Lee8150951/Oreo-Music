import React from 'react';
import { Row, Col, Slider } from 'tdesign-react';
import '../style/components/PlayBar.scss';
import play from '../assets/icon/play.png';
import previous from '../assets/icon/previous.png';
import next from '../assets/icon/next.png';
import random from '../assets/icon/random.png';
import single from '../assets/icon/single.png';
import voice from '../assets/icon/voice.png';
import like from '../assets/icon/like.png';

interface Props {
  children?: React.ReactNode;
}

const PlayBar: React.FC<Props> = (props): JSX.Element => {
  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <div className={'play-bar-main'}>
      <div className={'progress-bar-panel'}>
        <div className={'progress-bar played-bar'} style={{ width: `30%` }}></div>
        <div className={'progress-bar'} style={{ width: `70%` }}></div>
      </div>
      <Row className={'play-bar-contain'}>
        <Col className={'play-info'} span={5}>
          <img className={'album-cover'} src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="album" />
          <div className={'album-title'}>City of Star</div>
          <div className={'album-author'}>
            <span>Ryan Gosling</span>
          </div>
        </Col>
        <Col className={'control-btn'} span={2}>
          <div className={'random-icon-panel'}>
            <img className={'func-icon'} src={random} alt="previous" />
          </div>
          <div className={'previous-icon-panel'}>
            <img className={'func-icon'} src={previous} alt="previous" />
          </div>
          <div className={'play-icon-panel'}>
            <img className={'play-icon'} src={play} alt="play" />
          </div>
          <div className={'next-icon-panel'}>
            <img className={'func-icon'} src={next} alt="next" />
          </div>
          <div className={'single-icon-panel'}>
            <img className={'func-icon'} src={single} alt="next" />
          </div>
        </Col>
        <Col className={'other-btn'} span={5}>
          <div className={'like-icon-panel'}>
            <img className={'like-icon'} src={like} alt="next" />
          </div>
          <div className={'voice-icon-panel'}>
            <img className={'voice-icon'} src={voice} alt="next" />
          </div>
          <div className={'voice-slider'}>
            <Slider label={false}></Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlayBar;
