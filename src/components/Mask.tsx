import React from 'react';
import '../style/components/Mask.scss';
import { Skeleton } from 'tdesign-react';

interface Props {
  children?: React.ReactNode;
}

const Mask: React.FC<Props> = (props): JSX.Element => {
  /** state **/

  /** effect **/

  /** methods **/

  /** render **/
  return (
    <div className={'skeleton-content'}>
      {new Array(5).fill(0).map((_, index) => (
        <li className={'skeleton-list-li'} key={index}>
          <Skeleton className={'skeleton-list-avatar'} theme={'avatar'} animation={'flashed'}>
            <></>
          </Skeleton>
          <Skeleton className={'skeleton-list-paragraph'} theme={'paragraph'} animation={'flashed'}>
            <></>
          </Skeleton>
        </li>
      ))}
    </div>
  );
};

export default Mask;
