import { Field, Page, ValidationRule } from 'Model';

import { State } from './State';
import { Id } from './TreeNode';


export class StateImpl extends State {
    
    private nextId: number = 1;

    // TODO: remove when 'lastPageUsed' method not needed anymore
    private lastPageId: string | null = null;

    getNextId(): Id {
        return String(this.nextId++);
    }

    addPage(): void {
        const newId = this.getNextId();
        const newPage = {
            ...new Page("<page title>"),
            id: newId,
            parentId: null,
        };

        this.userData.page.set(newId, newPage);
    }

    getPage(pageId: Id): Page {
        const maybePage = this.userData.page.get(pageId);
        if (maybePage === undefined) {
            throw new Error(`Page with id '${JSON.stringify(pageId)}' was not found`);
        }

        // TODO?: hydrate fields if needed (they are expected to be null when stored)
        // but maybe we want to return empty pages because a Page Widget doesn't need to know about page's children?

        return maybePage;
    }

    updatePage(pageId: Id, newPageValue: Page): void {
        const currentValue = this.userData.page.get(pageId);
        if (currentValue === undefined) {
            throw new Error(`Can't update page with id '${JSON.stringify(pageId)}', it doesn't exist`);
        }
        
        this.userData.page.set(pageId, {
            ...newPageValue,
            id: currentValue.id,
            parentId: currentValue.parentId,
        });
    }

    addField(parentId: Id): void {
        const newId = this.getNextId();
        const newField = {
            ...new Field(),
            id: newId,
            parentId,
        };
        
        this.userData.field.set(newId, newField);
    }

    getField(fieldId: Id): Field {
        const field = this.userData.field.get(fieldId);
        if (field === undefined) {
            throw new Error(`No field with id '${JSON.stringify(fieldId)}'`);
        }

        return field;
    }

    updateField(fieldId: Id, newFieldValue: Field): void {
        const currentValue = this.userData.field.get(fieldId);
        if (currentValue === undefined) {
            throw new Error(`Can't update field with id '${JSON.stringify(fieldId)}', it doesn't exist`);
        }

        this.userData.field.set(fieldId, {
            ...newFieldValue,
            id: currentValue.id,
            parentId: currentValue.parentId,
        });
    }

    addValidationRule(parentId: Id, rule: ValidationRule): void {
        const newId = this.getNextId();
        const newRule = {
            ...rule,
            id: newId,
            parentId,
        };

        this.userData.validationRule.set(newId, newRule);
    }

    getValidationRule(ruleId: Id): ValidationRule {
        const rule = this.userData.validationRule.get(ruleId);
        if (rule === undefined) {
            throw new Error(`No rule with id '${JSON.stringify(ruleId)}'`);
        }

        return rule;
    }

    updateValidationRule(ruleId: Id, newRuleValue: ValidationRule): void {
        const currentValue = this.userData.validationRule.get(ruleId);
        if (currentValue === undefined) {
            throw new Error(`Can't update rule with id '${JSON.stringify(ruleId)}', it doesn't exist`);
        }

        if (currentValue.name !== newRuleValue.name) {
            throw new Error(`The new value for the validation rule is of a different kind`);
            // but should we care about that?
            // I guess not so:
            // TODO: remove this check once it's confirmed it's not needed
        }

        this.userData.validationRule.set(ruleId, {
            ...newRuleValue,
            id: currentValue.id,
            parentId: currentValue.id,
        });
    }

    lastPageUsedId(): Id {
        if (this.lastPageId === null) {
            throw new Error(`There is no last page`);
        }

        return this.lastPageId;
    }
    
    lastPageUsed(): Page {
        const lastPage = this.userData.page.get(this.lastPageUsedId())

        if (lastPage === undefined) {
            throw new Error(`Last page was not found`);
        }

        return lastPage;
    }

    getFieldIdsForPage(pageId: Id): Id[] {
        return Array.from(this.userData.field.values())
            .filter(x => x.parentId === pageId)
            .map(x => x.id);
    }
    
    // TODO: remove when test data not needed anymore
    addSomeTestData(): void {
        const field1 = {
            id: "-14",
            parentId: null, 
            ...new Field("home", "describe your home")
        };
        const field2 = {
            id: "-15",
            parentId: null,
            ...new Field("age")
        };
        
        const state = this;
        const pageId = state.getNextId();
        state.lastPageId = pageId;

        // const modifiablePageState = state.userData.page as unknown as Map<Id, TreeNode & Page>;
        const modifiablePageState = state.userData.page;
        modifiablePageState.set(pageId, {
            ...new Page("Circus Service", [field1, field2]),
            id: pageId,
            parentId: null,
        });
        // TODO: re-use 'addPage' method (when implemented) instead of changing internals manually

        // const modifiableFieldState = state.userData.field as unknown as Map<Id, TreeNode & Field>;
        const modifiableFieldState = state.userData.field;
        modifiableFieldState.set(field1.id, {
            ...field1,
            id: field1.id,
            parentId: pageId,
        });
        modifiableFieldState.set(field2.id, {
            ...field2,
            id: field2.id,
            parentId: pageId,
        });
        // TODO: re-use 'addField' method (when implemented) instead of changing internals manually
    }

}
