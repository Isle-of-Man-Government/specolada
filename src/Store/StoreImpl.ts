import { produce } from 'immer';

import { Page, Field } from 'Model';

import { Store } from './Store';
import { State } from './State';
import { Id } from './TreeNode';

/**
 * Ensures immutability of the state.
 * 
 * Doesn't contain any data itself, delegates all calls to an implementation of 'State'.
 */
export class StoreImpl extends Store {
    state: State;
    setState: (s: State) => void;

    constructor(state: State, setState: (s: State) => void) {
        super();
        this.state = state;
        this.setState = setState;
    }

    private produceNewState(mutator: (s: State) => void) {
        // use Immer to modify state easily while preserving immutability
        const newState = produce(this.state, mutator);

        this.setState(newState);
    }

    addFieldTo(parentId: Id): void {
        this.produceNewState(s => s.addField(parentId));
    }

    updateField(fieldId: Id, fieldValue: Field): void {
        this.produceNewState(s => s.updateField(fieldId, fieldValue));
    }

    lastPageUsedId(): Id {
        return this.state.lastPageUsedId();
    }

    lastPageUsed(): Page {
        throw new Error("Method not implemented.");
    }

    getPage(pageId: Id): Page {
        return this.state.getPage(pageId);
    }

    getField(fieldId: Id): Field {
        return this.state.getField(fieldId);
    }

    getChildrenIdsOf(parentId: Id): string[] {
        return this.state.getChildrenOf(parentId);
    }
}
