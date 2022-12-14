import React from 'react';
import { CircleWavyWarning } from 'phosphor-react';
import './index.css';

export default function ErrorPage(props) {
  return (
    <div className="flex-col-center w-h-screen">
      <CircleWavyWarning size={32} className="text-color-vorboss1" />
      <p>Sorry, something went wrong</p>
    </div>
  );
}
