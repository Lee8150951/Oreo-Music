import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import routes from './routes';
import { type PropsType } from '../types/props';

interface Props {
  children?: React.ReactNode;
  path: string;
  name: string;
  component: React.FC<PropsType>;
  meta?: any;
}

const Element: React.FC<Props> = (props): JSX.Element => {
  const { component: Component, meta } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usp] = useSearchParams();

  /** state **/

  /** effect **/
  useEffect(() => {
    console.log(meta);
  }, []);

  /** methods **/

  /** render **/
  return (
    <>
      <Component navigate={navigate} location={location} param={params} usp={usp}></Component>
    </>
  );
};

export default function RouterView() {
  return (
    <div>
      <Routes>
        {routes.map((item) => {
          const { name, path } = item;
          return <Route key={name} path={path} element={<Element {...item} />}></Route>;
        })}
      </Routes>
    </div>
  );
}
