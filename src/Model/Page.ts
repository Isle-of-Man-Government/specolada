import { FieldGroup } from "./FieldGroup";
import { Field } from "./Field";


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
