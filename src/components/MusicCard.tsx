import React from 'react';
import { type SongType } from '../views/types/playlist';
import { Row, Col, Image } from 'tdesign-react';
import utils from '../util/utils';
import UnfavorSVG from '../assets/svg/unfavor.svg';
import '../style/components/MusicCard.scss';

interface Props {
  children?: React.ReactNode;
  music: SongType;
}

const MusicCard: React.FC<Props> = (props): JSX.Element => {
  const { music } = props;

  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <Row className={'music-card-main'}>
      <Col span={3} className={'music-card-header'}>
        <div className={'album-cover'}>
          <Image className={'album-cover-img'} src={music.al.picUrl} fit="cover" shape="round" />
        </div>
        <div className={'music-info-panel'}>
          <span className={'music-name'}>{music.name}</span>
          <br />
          <span className={'music-album'}>{music.al.name}</span>
        </div>
      </Col>
      <Col span={6} className={'music-card-middle'}>
        {music.ar.slice(0, 2).map((item, index) => {
          if (music.ar.length !== 1 && index !== 1) {
            return (
              <span key={index} className={'music-artist'}>
                {item.name},&nbsp;
              </span>
            );
          } else {
            return (
              <span key={index} className={'music-artist'}>
                {item.name}
              </span>
            );
          }
        })}
      </Col>
      <Col span={3} className={'music-card-tail'}>
        <div className={'favor-contain'}>
          <Image src={UnfavorSVG} className={'favor-icon'} />
        </div>
        <div className={'music-dt'}>{utils.formatMillisecondsToMinutesSeconds(music.dt)}</div>
      </Col>
    </Row>
  );
};

export default MusicCard;
