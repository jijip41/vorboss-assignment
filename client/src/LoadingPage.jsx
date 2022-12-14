import React from 'react';
import { CircleNotch } from 'phosphor-react';
import './index.css';

function LoadingPage() {
  return (
    <div className="flex-col-center w-h-screen">
      <CircleNotch size={32} className="spin text-color-vorboss1" />
      <p>Loading data</p>
    </div>
  );
}

export default LoadingPage;
