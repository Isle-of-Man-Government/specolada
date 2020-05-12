import { immerable } from "immer";

import { StateImpl } from "./StateImpl";
import { State } from "./State";
import { StoreImpl } from "./StoreImpl";
import { Store } from "./Store";


export function upgradeModelsForImmer() {
    // for classes to work with Immer, they need to have the 'immerable' field
    (State.prototype as any)[immerable] = true;
}

export function createState(): State {
    // TODO: create store without test data
    
    // return new StateImpl();

    const s = new StateImpl();
    s.addSomeTestData();
    return s;
}

export function createStore(state: State, setState: (s: State) => void): Store {
    return new StoreImpl(state, setState);
}

export function createDummyStore(): Store {
    const state = new StateImpl();
    const setState = () => { throw new Error(`Can't set values, this is a dummy`) };

    return createStore(state, setState);
}
