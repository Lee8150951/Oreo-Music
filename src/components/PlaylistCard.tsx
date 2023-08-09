import React, { useEffect, useState } from 'react';
import PlaylistSVG from '../assets/svg/playlist.svg';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/components/PlaylistCard.scss';
import { changeActive } from '../store/slices/navbarSlice';
import { useAppDispatch } from '../store/hooks';

interface Props {
  children?: React.ReactNode;
  name: string;
  plid: number;
}

const PlaylistCard: React.FC<Props> = (props): JSX.Element => {
  const { name, plid } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  /** state **/
  const [active, setActive] = useState<boolean>(false);

  /** effect **/
  useEffect(() => {
    setActive((id as string) === String(plid));
  }, [id]);

  /** methods **/
  const cardClick = () => {
    dispatch(changeActive(''));
    navigate(`/playlist/${plid}`);
  };

  /** render **/
  return (
    <div className={`playlist-card ${active ? 'playlist-card-active' : ''}`} onClick={cardClick}>
      <img className={`playlist-card-logo`} src={PlaylistSVG} alt="logo" />
      <div className={`playlist-card-title ${active ? 'playlist-card-title-active' : ''}`}>{name}</div>
    </div>
  );
};

export default PlaylistCard;
