import { Page, Field } from 'Model';

import { Id, TreeNode } from './TreeNode';
import { ValidationRule } from 'Model';


export abstract class State {
    
    /** Data entered or modified by the user */
    readonly userData: {
        
        /** All pages the user has */
        page: Map<Id, Readonly<TreeNode & Page>>,
        
        /** All fields the user has */
        field: Map<Id, Readonly<TreeNode & Field>>,
        
        /** All validation rules the user has */
        validationRule: Map<Id, Readonly<TreeNode & ValidationRule>>,
    };

    constructor() {
        this.userData = {
            page: new Map(),
            field: new Map(),
            validationRule: new Map(),
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

    abstract addValidationRule(parentId: Id, rule: ValidationRule): void;

    abstract getValidationRule(ruleId: Id): ValidationRule;

    abstract updateValidationRule(ruleId: Id, rule: ValidationRule): void;
}
