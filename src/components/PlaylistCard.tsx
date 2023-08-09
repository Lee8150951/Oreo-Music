import React from 'react';
import PlaylistSVG from '../assets/svg/playlist.svg';
import '../style/components/PlaylistCard.scss';

interface Props {
  children?: React.ReactNode;
  name: string;
}

const PlaylistCard: React.FC<Props> = (props): JSX.Element => {
  const { name } = props;
  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <div className={'playlist-card'}>
      <img className={`playlist-card-logo`} src={PlaylistSVG} alt="logo" />
      <div className={`playlist-card-title`}>{name}</div>
    </div>
  );
};

export default PlaylistCard;
