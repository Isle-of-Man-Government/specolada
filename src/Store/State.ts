import { Page, Field } from 'Model';

import { Id, TreeNode } from './TreeNode';


export abstract class State {
    
    /** Data entered or modified by the user */
    readonly userData: {
        
        /** All pages the user has */
        page: Map<Id, Readonly<TreeNode & Page>>,
        
        /** All fields the user has */
        field: Map<Id, Readonly<TreeNode & Field>>,
    };

    constructor() {
        this.userData = {
            page: new Map(),
            field: new Map(),
        };
    }

    abstract addField(parentId: Id): void;

    abstract updateField(fieldId: Id, fieldValue: Field): void;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsedId(): Id;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsed(): Page;

    abstract getPage(pageId: Id): Page;

    abstract getField(fieldId: Id): Field;

    abstract getChildrenOf(parentId: Id): Id[];
}
