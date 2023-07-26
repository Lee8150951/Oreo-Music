import React, { useEffect, useState } from 'react';
import { Image } from 'tdesign-react';
import { PlayCircleIcon } from 'tdesign-icons-react';
import '../style/components/RecommendCard.scss';

interface Props {
  children?: React.ReactNode;
  title: string;
  picture: string;
}

const RecommendCard: React.FC<Props> = (props): JSX.Element => {
  const { title, picture } = props;
  const mask = (
    <div className={'card-mask'}>
      <PlayCircleIcon size={'2.5em'} />
    </div>
  );
  /** state **/
  const [cardSize, setCardSize] = useState((window.innerWidth - 232 - 50 - 20 * 4) / 5);

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
    setCardSize((windowWidth - 232 - 50 - 20 * 4) / 5);
  };

  /** render **/
  return (
    <div className={'recommend-card'} style={{ width: cardSize }}>
      <div className={'recommend-image-panel'}>
        <Image
          src={picture}
          fit="cover"
          className={'recommend-image'}
          style={{ width: cardSize, height: cardSize }}
          overlayContent={mask}
          overlayTrigger="hover"
        ></Image>
      </div>
      <div className={'recommend-title-panel'}>{title}</div>
    </div>
  );
};

export default RecommendCard;
