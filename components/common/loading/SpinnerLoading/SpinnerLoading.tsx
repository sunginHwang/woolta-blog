import { HashLoader } from 'react-spinners';
import React from 'react';
import classNames from 'classnames/bind';
import cn from './SpinnerLoading.scss';

const cx = classNames.bind(cn);

interface ISpinnerLoadingProps {
  loading: boolean
}

const SpinnerLoading: React.FC<ISpinnerLoadingProps> = ({ loading }) => (
  loading ?
    <div className={cx(cn.SpinnerLoadingWrapper)}>
      <div className={cx(cn.loadingPosition)}>
        <HashLoader
          color={'#6e827f'}
          loading={loading}
        />
      </div>
    </div>
    : null
);

export default SpinnerLoading;
