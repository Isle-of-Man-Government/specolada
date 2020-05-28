export class RuleParam {
    
    /** Text presented to user */
    title: string;

    /** Internal name, should never change */
    name: string;

    valType: "number" | "string"; // maybe enum in the future as well

    value: number | string | null;

    constructor(name: string, title: string, valType: typeof RuleParam.prototype.valType) {
        this.name = name;
        this.title = title;
        this.valType = valType;
        this.value = null;
    }
}
