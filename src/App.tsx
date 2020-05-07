import React, { useState } from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import { State, StateContext } from 'Store';
import { Page } from 'Widget';

import './App.css';


function App() {
  const [state, setState] = useState<State>(State.createWithoutStateSetter().addSomeTestData());
  state.setStateSetter(setState);

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider>
          <StateContext.Provider value={state}>
            <Page />
          </StateContext.Provider>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
