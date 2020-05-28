import { FieldGroup } from ".";
import { Field } from ".";


export class Page {
    title: string;
    content: (FieldGroup | Field)[];

    constructor(
        title: string,
        content:  (FieldGroup | Field)[] = [],
    ) {
        this.title = title;
        this.content = content;
    }
}
