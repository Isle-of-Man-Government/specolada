import { produce, isDraft } from 'immer';

import { Page, Field, ValidationRule } from 'Model';

import { Store } from './Store';
import { State } from './State';
import { Id } from './TreeNode';


const LOG = (text: string, obj: any) => console.log(
    `~${module.id.replace("./src/", "")}~ || ${text} ::>  ${JSON.stringify(obj, null, 2)}`);

const LOG_MAP = (text: string, m: Map<any, any>) => (() => {
    const acc: any[] = [];
    m.forEach(v => acc.push(v));
    LOG(text, acc);
})();


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
        const newState = produce(this.state, state => {
            console.log(`Store - producing new state: isDraft: ${isDraft(state)}`);
            
            mutator(state);
        });

        console.log(`NEW STATE: ${JSON.stringify(newState, null, 2)}`);

        LOG_MAP("PAGE: ", newState.userData.page);
        LOG_MAP("FIELD: ", newState.userData.field);
        LOG_MAP("RULES: ", newState.userData.validationRule);
        
        this.setState(newState);
    }

    addPage(): void {
        this.produceNewState(s => s.addPage());
    }

    getPage(pageId: Id): Page {
        return this.state.getPage(pageId);
    }

    updatePage(pageId: Id, pageValue: Page): void {
        this.produceNewState(s => s.updatePage(pageId, pageValue));
    }

    addFieldTo(parentId: Id): void {
        this.produceNewState(s => s.addField(parentId));
    }

    getField(fieldId: Id): Field {
        return this.state.getField(fieldId);
    }

    updateField(fieldId: Id, fieldValue: Field): void {
        console.log(`Store - update field; field value: ${JSON.stringify(fieldValue, null, 2)}`);
        
        this.produceNewState(s => s.updateField(fieldId, fieldValue));
    }

    addValidationRuleTo(parentId: Id, rule: ValidationRule): void {
        this.produceNewState(s => s.addValidationRule(parentId, rule));
    }

    getValidationRule(ruleId: Id): Readonly<ValidationRule> {
        return this.state.getValidationRule(ruleId);
    }

    updateValidationRule(ruleId: Id, rule: ValidationRule): void {
        this.produceNewState(s => s.updateValidationRule(ruleId, rule));
    }

    lastPageUsedId(): Id {
        return this.state.lastPageUsedId();
    }

    lastPageUsed(): Page {
        throw new Error("Method not implemented.");
    }

    getFieldIdsForPage(pageId: Id): string[] {
        return this.state.getFieldIdsForPage(pageId);
    }
}
