import { FieldGroup } from "./FieldGroup";
import { Field } from "./Field";
import { TreeNode } from 'Store';


export class Page {
    title: string;
    content: (TreeNode & (FieldGroup | Field))[];

    constructor(
        title: string,
        content: (TreeNode & (FieldGroup | Field))[] = [],
    ) {
        this.title = title;
        this.content = content;
    }
}
