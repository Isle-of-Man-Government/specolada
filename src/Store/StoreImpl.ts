import { produce } from 'immer';

import { Page, Field } from 'Model';

import { Store } from './Store';
import { State } from './State';

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

    addFieldTo(parentId: string): void {
        this.produceNewState(s => s.addField(parentId));
    }

    updateField(fieldId: string, fieldValue: Field): void {
        this.produceNewState(s => s.updateField(fieldId, fieldValue));
    }

    lastPageUsedId(): string {
        return this.state.lastPageUsedId();
    }

    lastPageUsed(): Page {
        throw new Error("Method not implemented.");
    }

    getPage(pageId: string): Page {
        return this.state.getPage(pageId);
    }

    getField(fieldId: string): Field {
        
        // TODO: remove
        const LOG = (text: string, obj: any) => console.log(
            `~${module.id.replace("./src/", "")}~ || ${text} ::>  ${JSON.stringify(obj, null, 2)}`);

        const x = this.state.getField(fieldId);
        LOG(`get Field | field value`, x);
        return x;
    }

    getChildrenIdsOf(parentId: string): string[] {
        return this.state.getChildrenOf(parentId);
    }
}
