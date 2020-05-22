

// for discriminated unions
export type FieldType_kind = "free text" | "number";


class RuleParam {

    /** Text presented to user */
    title: string;

    /** Internal name, should never change */
    name: string | null;

    valType: "number" | "string";  // maybe enum in the future as well

    value: number | string | null;

    constructor(
        title: string,
        valType: typeof RuleParam.prototype.valType,
        name: string | null = null,
    ) {
        this.title = title;
        this.name = name;
        this.valType = valType;
        this.value = null;
    }
}

export abstract class ValidationRule {

    /** Internal name, should never change */
    name: string;

    /** Text presented to user */
    title: string;

    /** Longer text for user */
    description: string;

    params: RuleParam[] = [];

    constructor(
        name: string,
        title: string,
        description: string,
        ...params: RuleParam[]
    ) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.params = params;
    }
}


export abstract class ValidationRuleDefinition {
    abstract ruleTitle: string;
    abstract createRule: () => ValidationRule;
}


export abstract class FieldType {
    abstract kind: FieldType_kind;
    abstract allowedRules: ValidationRuleDefinition[];
}

////////////////////////////////////////////////////////////////////////////////////////////


export class MinChars extends ValidationRule {
    private static readonly apiName = "MinChars";
    private static readonly title = "minimum required";

    private constructor() {
        super(
            MinChars.apiName,
            MinChars.title,
            "The minimum number of characters required",
            new RuleParam("min", "number"),
        );
    }
    
    static definition: ValidationRuleDefinition = {
        ruleTitle: MinChars.title,
        createRule: () => new MinChars(),
    };
}


export class MaxChars extends ValidationRule {
    private static readonly apiName = "MaxChars";
    private static readonly title = "maximum allowed";

    private constructor() {
        super(
            MaxChars.apiName,
            MaxChars.title,
            "The maximum number of characters allowed",
            new RuleParam("max", "number"),
        );
    }
    
    static definition: ValidationRuleDefinition = {
        ruleTitle: MaxChars.title,
        createRule: () => new MaxChars(),
    };
}


export class FreeTextFieldType extends FieldType {
    kind: FieldType_kind = "free text";
    allowedRules = [
        MinChars.definition,
        MaxChars.definition,
    ];
}


////////////////////////////////////////////////////////////////////////////////////////////

// TODO: validation rules for Number Field Type

export class NumberFieldType extends FieldType {
    kind: FieldType_kind = "number";
    allowedRules = [
        // TODO
    ];
}
