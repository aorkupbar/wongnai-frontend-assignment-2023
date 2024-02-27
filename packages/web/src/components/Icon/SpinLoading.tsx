import React from 'react';
import './SpinLoading.scss';

const SpinLoading: React.FC = () => {
  return (
    <div className="spin-loading mr-2">
      <div className="spinner"></div>
    </div>
  );
};

export default SpinLoading;
