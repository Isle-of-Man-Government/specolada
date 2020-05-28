import { Field } from ".";


export class FieldGroup {
    title: string;
    fields: Field[];

    constructor(
        title: string,
        fields: Field[],
    ) {
        this.title = title;
        this.fields = fields;
    }
}
