import { Page, Field } from 'Model';
import { Id, TreeNode } from 'Store';


// TODO: setting state should be separate from state itself (SRP)

type FT = import('Model').FieldType;  // TODO: remove 

export abstract class State {
    
    /** Data entered or modified by the user */
    readonly userData: {
        
        /** All pages the user has */
        page: ReadonlyMap<Id, Readonly<TreeNode & Page>>,
        
        /** All fields the user has */
        field: ReadonlyMap<Id, Readonly<TreeNode & Field>>,
    };

    protected constructor() {
        this.userData = {
            page: new Map(),
            field: new Map(),
        };
    }
    
    static create(stateSetter: (s: State) => void): State {
        return new StateImpl(stateSetter);
    }

    static createWithoutStateSetter(): State {
        const throwingStateSetter = (s: State) => {
            throw new Error(`State setter was not set`);
        };

        return new StateImpl(throwingStateSetter);
    }

    static createWithoutStateSetterWithSomeTestData(): State {
        return (State.createWithoutStateSetter() as StateImpl)
            .addSomeTestData();
    }
    
    abstract setStateSetter(stateSetter: (s: State) => void): void;

    abstract addField(parentId: Id): void;

    abstract updateField(field: TreeNode & Field): void;
    
    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsedId(): Id;

    // TODO: remove after initial dev phase when more robust access is implemented
    abstract lastPageUsed(): Page;

    abstract getPage(pageId: Id): Page;

    abstract getField(fieldId: Id): Field;

    abstract getChildrenOf(parentId: Id): Id[];

    // TODO: remove when test data not needed anymore
    abstract addSomeTestData(): State;

    private tests_for_immutability() {
    //     const ft: FT = { kind: "text", multiLine: true, maxCharacters: 55 };
    //     const newField = {
    //         ...new Field(false, ft, "<tite>", null, "ANY"),
    //         id: "kkk",
    //         parentId: "ppp",
    //     };

    //     // setter should fail
    //     this.userData.field.set("Kkk", newField);

    //     // assigning new value should fail
    //     this.userData = {
    //         page: new Map(),
    //         field: new Map(),
    //     };
    //     const p = this.userData.page.get("1");
    //     if (p === undefined) return;

    //     // assigning new value should fail
    //     p.content = [];
    }
}


class StateImpl extends State {
    
    private nextId: number = 1;

    // TODO: remove when 'lastPageUsed' method not needed anymore
    private lastPageId: string | null = null;

    private externalStateSetter: (s: State) => void;
    
    constructor(stateSetter: (s: State) => void) {
        super();
        
        this.externalStateSetter = stateSetter;
    }
    
    getNextId(): Id {
        return String(this.nextId++);
    }

    setStateSetter(stateSetter: (s: State) => void) {
        this.externalStateSetter = stateSetter;
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
        
        this.externalStateSetter({
            ...this,
            userData: {
                ...this.userData,
                field: new Map(this.userData.field).set(newId, newField),
            },
        });
    }

    updateField(field: TreeNode & Field): void {
        // TODO
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
        // let x: IterableIterator = ;
        return Array.from(this.userData.field.values())
            .filter(x => x.parentId === parentId)
            .map(x => x.id);
    }
    
    // TODO: remove when test data not needed anymore
    addSomeTestData(): State {
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

        const modifiablePageState = state.userData.page as unknown as Map<Id, TreeNode & Page>;
        modifiablePageState.set(pageId, {
            ...new Page("Circus Service", [field1, field2]),
            id: pageId,
            parentId: null,
        });

        const modifiableFieldState = state.userData.field as unknown as Map<Id, TreeNode & Field>;
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

        return state;
    }

}
