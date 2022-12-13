import React from 'react';
import { CircleNotch } from 'phosphor-react';

function LoadingPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <CircleNotch size={32} className="animate-spin text-vorboss1 " />
      <p>Loading data</p>
    </div>
  );
}

export default LoadingPage;
