import React, { useContext, useState } from 'react';

import { State } from './State';
import { Store } from './Store';
import { createState, createStore, createDummyStore } from './helpers';


const SpecoladaContext: React.Context<Store> = React.createContext(createDummyStore());
SpecoladaContext.displayName = "Specolada context";

export const SpecoladaStoreProvider: React.FC<{}> = ({ children }) => {
    const initialStateCreator: () => State = createState;

    const [state, setState]: [State, (s: State) => void] = useState(initialStateCreator);
    const store: Store = createStore(state, setState);

    return (
        <SpecoladaContext.Provider value={store}>
            {children}
        </SpecoladaContext.Provider>
    );
};

export const useSpecoladaStore: () => Store = () => {
    return useContext(SpecoladaContext);
};
