import React, { useEffect, useState } from 'react';
import { Image } from 'tdesign-react';
import '../style/components/ArtistCard.scss';

interface Props {
  children?: React.ReactNode;
  url: string;
  name: string;
}

const ArtistCard: React.FC<Props> = (props): JSX.Element => {
  const { url, name } = props;
  const mask = <div className={'card-mask'}></div>;
  /** state **/
  const [cardSize, setCardSize] = useState(((window.innerWidth - 232 - 60) / 2 - 10 - 10 * 3) / 4);

  /** effect **/
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /** methods **/
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    setCardSize(((windowWidth - 232 - 60) / 2 - 10 - 10 * 3) / 4);
  };

  /** render **/
  return (
    <div className={'artist-panel'}>
      <Image
        src={url}
        shape="circle"
        style={{ width: cardSize, height: cardSize }}
        overlayContent={mask}
        overlayTrigger="hover"
      />
      <div className={'artist-name'}>{name}</div>
    </div>
  );
};

export default ArtistCard;
