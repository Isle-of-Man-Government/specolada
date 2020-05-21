

// for discriminated unions
export type FieldType_kind = "free text" | "number";

// collection of all validation rules' kinds
export type ValidationRule_kind = FreeTextFieldValidationRule_kind | NumberFieldValidationRule_kind;

export abstract class ValidationRule {
    abstract kind: ValidationRule_kind;
}

export abstract class FieldType {
    abstract kind: FieldType_kind;
    abstract validationRules: ValidationRule[];
}

////////////////////////////////////////////////////////////////////////////////////////////


export type FreeTextFieldValidationRule_kind =
    | "minCharacters"
    | "maxCharacters"
    ;

export abstract class FreeTextFieldValidationRule extends ValidationRule {
    abstract kind: FreeTextFieldValidationRule_kind;
}

export class MinCharacters extends FreeTextFieldValidationRule {
    kind: FreeTextFieldValidationRule_kind = "minCharacters";
    min: number = 0;
}

export class MaxCharacters extends FreeTextFieldValidationRule {
    kind: FreeTextFieldValidationRule_kind = "maxCharacters";
    max: number = 0;
}

export class FreeTextFieldType extends FieldType {
    kind: FieldType_kind = "free text";
    validationRules: FreeTextFieldValidationRule[] = [];
}

////////////////////////////////////////////////////////////////////////////////////////////


export type NumberFieldValidationRule_kind = "minValue" | "maxValue";

export abstract class NumberFieldValidationRule extends ValidationRule {
    abstract kind: NumberFieldValidationRule_kind;
}

export class NumberFieldType extends FieldType {
    kind: FieldType_kind = "number";
    validationRules: NumberFieldValidationRule[] = [];
}
