import { RuleParam } from "../../ValidationRule";
import { ValidationRule } from "../../ValidationRule";
import { ValidationRuleDefinition } from "../../ValidationRule";


export class MinChars extends ValidationRule {
    private static readonly apiName = "freeText_MinChars";
    private static readonly title = "min length";

    private constructor() {
        super(
            MinChars.apiName,
            MinChars.title,
            "The minimum number of characters required",
            new RuleParam("min", "min", "number"),
        );
    }

    static definition: ValidationRuleDefinition = {
        ruleTitle: MinChars.title,
        ruleName: MinChars.apiName,
        createRule: () => new MinChars(),
    };
}
