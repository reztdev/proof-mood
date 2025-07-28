import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // atau tailwind css kamu
import ProofOfMoodDApp from './ProofOfMoodDApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProofOfMoodDApp />
  </React.StrictMode>
);
