import { Field, Page } from 'Model';

import { State } from './State';
import { Id } from './TreeNode';


type FT = import('Model').FieldType;  // TODO: remove


export class StateImpl extends State {
    
    private nextId: number = 1;

    // TODO: remove when 'lastPageUsed' method not needed anymore
    private lastPageId: string | null = null;

    getNextId(): Id {
        return String(this.nextId++);
    }

    addField(parentId: Id): void {
        const newId = this.getNextId();
        // TODO: should not need to set any values beside IDs; it means constructors should need less params
        const ft: FT = { kind: "text", multiLine: true, maxCharacters: 55 };
        const newField = {
            ...new Field(false, ft, "<tite>", null, "ANY"),
            id: newId,
            parentId,
        };
        
        this.userData.field.set(newId, newField);
    }

    updateField(fieldId: Id, newValue: Field): void {
        const currentValue = this.userData.field.get(fieldId);
        if (currentValue === undefined) {
            throw new Error(`Can't update field with id '${JSON.stringify(fieldId)}', it doesn't exist`);
        }

        this.userData.field.set(fieldId, {
            ...newValue,
            id: currentValue.id,
            parentId: currentValue.parentId,
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

    getPage(pageId: Id): Page {
        const maybePage = this.userData.page.get(pageId);
        if (maybePage === undefined) {
            throw new Error(`Page with id '${JSON.stringify(pageId)}' was not found`);
        }

        // TODO?: hydrate fields if needed (they are expected to be null when stored)
        // but maybe we want to return empty pages because a Page Widget doesn't need to know about page's children?

        return maybePage;
    }

    getField(fieldId: Id): Field {
        const field = this.userData.field.get(fieldId);

        if (field === undefined) {
            throw new Error(`No field with id '${JSON.stringify(fieldId)}'`);
        }

        return field;
    }

    getChildrenOf(parentId: Id): Id[] {
        return Array.from(this.userData.field.values())
            .filter(x => x.parentId === parentId)
            .map(x => x.id);
    }
    
    // TODO: remove when test data not needed anymore
    addSomeTestData(): void {
        const ft1: FT = { kind: "text", multiLine: true, maxCharacters: 55 };
        const ft2: FT = { kind: "number", minValue: 0, maxValue: null };
        const field1 = {
            id: "-14",
            parentId: null, 
            ...new Field(true, ft1, "home", "describe your home")
        };
        const field2 = {
            id: "-15",
            parentId: null,
            ...new Field(false, ft2, "age")
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
