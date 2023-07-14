import React from 'react';
import '../style/components/DragBar.scss';

interface Props {
  children?: React.ReactNode;
}

const DragBar: React.FC<Props> = (props): JSX.Element => {
  /** render **/
  return <div className={'drag-bar-main'}></div>;
};

export default DragBar;
