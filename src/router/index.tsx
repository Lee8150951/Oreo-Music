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
  meta?: {
    extra: boolean;
  };
}

const Element: React.FC<Props> = (props): JSX.Element => {
  const { component: Component } = props;
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
    }
  }, []);

  /** methods **/

  /** render **/
  return (
    <>
      {meta.extra ? (
        <Component navigate={navigate} location={location} param={params} usp={usp}></Component>
      ) : (
        <Frame>
          <Component navigate={navigate} location={location} param={params} usp={usp}></Component>
        </Frame>
      )}
    </>
  );
};

export default function RouterView() {
  return (
    <Suspense fallback={<Mask />}>
      <Routes>
        {routes.map((item) => {
          const { name, path } = item;
          return <Route key={name} path={path} element={<Element {...item} />}></Route>;
        })}
      </Routes>
    </Suspense>
  );
}
