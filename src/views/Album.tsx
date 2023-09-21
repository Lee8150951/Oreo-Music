import React, { useEffect } from 'react';
import { type PropsType } from '../types/props';
import '../style/views/Album.scss';
import { useParams } from 'react-router-dom';
import albumApi from '../http/apis/albumApi';
import type ResponseType from '../types/res';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Album: React.FC<Props> = (props): JSX.Element => {
  const { id } = useParams();

  /** state **/

  /** effect **/
  useEffect(() => {
    (async () => {
      const res = (await albumApi.getAlbumDetail(id as string)) as ResponseType;
      console.log(res);
    })();
  }, []);

  /** methods **/

  /** render **/
  return (
    <div>
      <div>Album</div>
    </div>
  );
};

export default Album;
