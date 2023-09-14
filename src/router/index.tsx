import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Frame from '../components/Frame';
import Mask from '../components/Mask';
import routes from './routes';
import { type PropsType } from '../types/props';

interface Props {
  children?: React.ReactNode;
  path: string;
  name: string;
  component: React.FC<PropsType>;
  currentTime: number;
  volume: number;
  playAudio: () => void;
  pauseAudio: () => void;
  handleVolumeChange: (volume: number) => void;
  setMusicSource: (url: string) => void;
  meta?: {
    extra: boolean;
  };
}

const Element: React.FC<Props> = (props): JSX.Element => {
  const {
    component: Component,
    currentTime,
    handleVolumeChange,
    volume,
    playAudio,
    pauseAudio,
    setMusicSource,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usp] = useSearchParams();

  /** state **/
  const [meta, setMeta] = useState({ extra: false });

  /** effect **/
  useEffect(() => {
    if (props.meta != null) {
      setMeta(props.meta);
    } else {
      setMeta({ extra: false });
    }
  }, [props, location]);

  /** methods **/

  /** render **/
  return (
    <>
      {meta.extra ? (
        <Component navigate={navigate} location={location} param={params} usp={usp} />
      ) : (
        <Frame
          currentTime={currentTime}
          volume={volume}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          handleVolumeChange={handleVolumeChange}
          setMusicSource={setMusicSource}
        >
          <Component
            currentTime={currentTime}
            volume={volume}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            handleVolumeChange={handleVolumeChange}
            setMusicSource={setMusicSource}
            navigate={navigate}
            location={location}
            param={params}
            usp={usp}
          />
        </Frame>
      )}
    </>
  );
};

interface RouterViewProps {
  children?: React.ReactNode;
  currentTime: number;
  volume: number;
  playAudio: () => void;
  pauseAudio: () => void;
  handleVolumeChange: (volume: number) => void;
  setMusicSource: (url: string) => void;
}

export default function RouterView(props: RouterViewProps) {
  /** render **/
  return (
    <Suspense fallback={<Mask />}>
      <Routes>
        {routes.map((item) => {
          const { name, path } = item;
          return <Route key={name} path={path} element={<Element {...props} {...item} />}></Route>;
        })}
      </Routes>
    </Suspense>
  );
}
