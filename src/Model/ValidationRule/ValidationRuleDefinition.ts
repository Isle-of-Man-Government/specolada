import { ValidationRule } from ".";


export abstract class ValidationRuleDefinition {

    /** Something that can be shown to users */
    abstract ruleTitle: string;

    /** Internal name, should never change */
    abstract ruleName: string;

    /** Creates a new instance of the rule defined by this object */
    abstract createRule: () => ValidationRule;
}
