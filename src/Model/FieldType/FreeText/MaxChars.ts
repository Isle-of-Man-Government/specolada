import { RuleParam } from "../../ValidationRule";
import { ValidationRule } from "../../ValidationRule";
import { ValidationRuleDefinition } from "../../ValidationRule";


export class MaxChars extends ValidationRule {
    private static readonly apiName = "freeText_maxChars";
    private static readonly title = "max length";

    private constructor() {
        super(
            MaxChars.apiName,
            MaxChars.title,
            "The maximum number of characters allowed",
            new RuleParam("max", "max", "number"),
        );
    }

    static definition: ValidationRuleDefinition = {
        ruleTitle: MaxChars.title,
        ruleName: MaxChars.apiName,
        createRule: () => new MaxChars(),
    };
}
