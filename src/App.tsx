import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import { SpecoladaStoreProvider } from 'Store';
import { Page } from 'Widget';

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider>
          <SpecoladaStoreProvider>
            <Page />
          </SpecoladaStoreProvider>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
