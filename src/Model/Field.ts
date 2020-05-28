import { FieldType } from ".";
import { ValidationRule } from ".";


export class Field {
    required: boolean;
    type: FieldType | null;
    title: string;
    hintText: string;
    validationRules: ValidationRule[];

    constructor(
        title: string = "",
        hintText: string = "",
        required: boolean = true,
        type: FieldType | null = null,
        validationRules: ValidationRule[] = [],
    ) {
        this.required = required;
        this.type = type;
        this.title = title;
        this.hintText = hintText;
        this.validationRules = validationRules;
    }
}
