import { FieldType, FieldType_kind } from "..";
import { MinChars } from "./MinChars";
import { MaxChars } from "./MaxChars";


export class FreeTextFieldType extends FieldType {

    kind: FieldType_kind = "free text";
    
    allowedRules = [
        MinChars.definition,
        MaxChars.definition,
    ];
}
