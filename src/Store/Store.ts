import { Field, Page, ValidationRule } from 'Model';

import { Id } from './TreeNode';


/**
 * Ensures immutability of the state.
 * 
 * Doesn't contain any data itself, delegates all calls to an implementation of 'State'.
 */
export abstract class Store {
    abstract addPage(): void;
    abstract getPage(pageId: Id): Readonly<Page>;
    abstract updatePage(pageId: Id, pageValue: Page): void;

    abstract addFieldTo(parentId: Id): void;
    abstract getField(fieldId: Id): Readonly<Field>;
    abstract updateField(fieldId: Id, fieldValue: Field): void;

    abstract addValidationRuleTo(parentId: Id, rule: ValidationRule): void;
    abstract getValidationRule(ruleId: Id): Readonly<ValidationRule>;
    abstract updateValidationRule(ruleId: Id, rule: ValidationRule): void;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsedId(): Id;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsed(): Readonly<Page>;

    abstract getFieldIdsForPage(pageId: Id): Id[];
}
