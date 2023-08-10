import React, { useState } from 'react';
import { type SongType } from '../views/types/playlist';
import { Row, Col, Image, MessagePlugin } from 'tdesign-react';
import utils from '../util/utils';
import UnfavorSVG from '../assets/svg/unfavor.svg';
import FavorSVG from '../assets/svg/favor.svg';
import playlistApi from '../http/apis/playlistApi';
import '../style/components/MusicCard.scss';

interface Props {
  children?: React.ReactNode;
  music: SongType;
  favor: boolean;
}

const MusicCard: React.FC<Props> = (props): JSX.Element => {
  const { music, favor } = props;

  /** state **/
  const [isFavor, setIsFavor] = useState<boolean>(favor);

  /** effect **/

  /** methods **/
  const clickHandle = () => {
    // TODO: play music
  };

  const favorClick = () => {
    try {
      (async () => {
        setIsFavor(!isFavor);
        await playlistApi.addFavorMusic(music.id, !isFavor);
      })();
    } catch (_) {
      MessagePlugin.warning('喜欢失败', 3 * 1000);
    }
  };

  /** render **/
  return (
    <div onDoubleClick={clickHandle}>
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
          <div className={'favor-contain'} onClick={favorClick}>
            {isFavor ? (
              <Image src={FavorSVG} className={'favor-icon'} />
            ) : (
              <Image src={UnfavorSVG} className={'favor-icon'} />
            )}
          </div>
          <div className={'music-dt'}>{utils.formatMillisecondsToMinutesSeconds(music.dt)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default MusicCard;
