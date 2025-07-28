import React from 'react';
import './App.css'
import ProofOfMoodDApp from './components/ProofOfMoodDApp';
import { WalletProvider } from './context/WalletContext';

const App = () => (
  <WalletProvider>
    <ProofOfMoodDApp />
  </WalletProvider>
);

export default App;
