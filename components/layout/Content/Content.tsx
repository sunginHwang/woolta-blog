import React from 'react';
import classNames from 'classnames';
import cn from './content.scss';

const cx = classNames.bind(cn);

interface ContentProps {
  editMode: boolean;
  children: React.ReactNode;
}

const Content = ({
                   editMode,
                   children,
                 }: ContentProps) => {
  return (
    <div className={cx(cn.content, editMode && cn.editMode)}>
      {children}
    </div>
  );
};

export default Content;