import { FieldType, FieldType_kind } from "../FieldType";


// TODO: validation rules for Number Field Type

export class NumberFieldType extends FieldType {
    
    kind: FieldType_kind = "number";

    allowedRules = [
        // TODO
    ];
}
