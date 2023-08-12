import React from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import '../style/views/Play.scss';

interface Props {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  /** state **/

  /** effect **/

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish('drawer', false);
  };

  /** render **/
  return (
    <div className={'play-main'}>
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
};

export default Play;
