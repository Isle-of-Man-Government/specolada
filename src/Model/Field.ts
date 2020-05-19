import { FieldType, FreeTextFieldType } from './FieldType';


export class Field {
    required: boolean;
    type: FieldType;
    title: string;
    hintText: string | null;
    validationRules: string | "ANY";
    // TODO: make validation rules a class with some predefined possibilities
    // TODO: validation should probably be part of type because allowed validations depend on FieldType

    constructor(
        title: string = "",
        hintText: string = "",
        required: boolean = true,
        type: FieldType = new FreeTextFieldType(),
        validationRules = "ANY",
    ) {
        this.required = required;
        this.type = type;
        this.title = title;
        this.hintText = hintText;
        this.validationRules = validationRules;
    }
}
