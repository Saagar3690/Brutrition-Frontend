import React from 'react';
import Brutrition from './src/Brutrition';
import { StateProvider } from './src/StateProvider';

export default function App() {
  return (
    <StateProvider>
      <Brutrition />
    </StateProvider>
  );
}
