import React, { useEffect } from 'react';
import { type PropsType } from '../types/props';
import '../style/views/Singer.scss';
import { useParams } from 'react-router-dom';
import singerApi from '../http/apis/singerApi';
import type ResponseType from '../types/res';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Singer: React.FC<Props> = (props): JSX.Element => {
  const { id } = useParams();

  /** state **/

  /** effect **/
  useEffect(() => {
    (async () => {
      const res = (await singerApi.getSingerDetail(id as string)) as ResponseType;
      console.log(res);
    })();
  }, []);

  /** methods **/

  /** render **/
  return (
    <div>
      <div>Singer</div>
    </div>
  );
};

export default Singer;
