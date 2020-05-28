import { RuleParam } from ".";


/** Rules for a field. They can be used to generate validation attributes in the back-end */
export abstract class ValidationRule {

    /** Internal name, should never change */
    name: string;

    /** Text presented to user */
    title: string;

    /** Longer text for user */
    description: string;

    /** Parameters for the rule */
    params: RuleParam[] = [];

    constructor(
        name: string,
        title: string,
        description: string,
        ...params: RuleParam[]
    ) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.params = params;
    }
}
