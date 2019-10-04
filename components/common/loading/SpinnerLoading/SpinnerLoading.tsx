import { HashLoader } from 'react-spinners';
import React from 'react';
import classNames from 'classnames/bind';
import cn from './SpinnerLoading.scss';

const cx = classNames.bind(cn);

interface SpinnerLoadingProps {
  loading: boolean
}

const SpinnerLoading = ({ loading }: SpinnerLoadingProps) => (
  loading ?
    <div className={cx(cn.spinnerLoading)}>
      <div className={cx(cn.spinnerLoading__position)}>
        <HashLoader
          color={'#6e827f'}
          loading={loading}/>
      </div>
    </div>
    : null
);

export default SpinnerLoading;
