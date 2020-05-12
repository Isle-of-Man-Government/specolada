import { Field, Page } from 'Model';

import { Id } from './TreeNode';


/**
 * Ensures immutability of the state.
 * 
 * Doesn't contain any data itself, delegates all calls to an implementation of 'State'.
 */
export abstract class Store {
    abstract addFieldTo(parentId: Id): void;

    abstract updateField(fieldId: Id, fieldValue: Field): void;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsedId(): Id;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsed(): Readonly<Page>;

    abstract getPage(pageId: Id): Readonly<Page>;

    abstract getField(fieldId: Id): Readonly<Field>;

    abstract getChildrenIdsOf(parentId: Id): Id[];
}
