import { ValidationRuleDefinition } from "..";


// for discriminated unions
export type FieldType_kind = "free text" | "number";

export abstract class FieldType {
    abstract kind: FieldType_kind;  // TODO: probably remove (I don't think it's meaningfully used anywhere)
    abstract allowedRules: ValidationRuleDefinition[];
}
