import React from 'react';
import { Row, Col } from 'tdesign-react';
import '../style/components/PlayBar.scss';

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
          <img className={'album-cover'} src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="" />
        </Col>
        <Col className={'control-btn'} span={2}>
          1
        </Col>
        <Col className={'other-btn'} span={5}>
          1
        </Col>
      </Row>
    </div>
  );
};

export default PlayBar;
