import React, { useState } from "react";
import { Select } from "@chakra-ui/core";

import { FieldType, FreeTextFieldType, NumberFieldType } from "Model";

import { ui } from "./common";
import { Label } from "./Label";


// TODO: split into UI and data logic
// TODO: make it a generic dropdown, not coupled to type selection


interface Props {
    title: string;
    value: FieldType | null;
    onValueChange: (ft: FieldType) => void;
}

export const TypeEditor: React.FC<Props> = ({ title, value, onValueChange }) => {
    const [placeholderOption, setPlaceholderOption] = useState("<select field type>");
    const removePlaceholderOption = () => setPlaceholderOption("");

    interface FieldTypeOption {
        value: string;
        description: string;
        creator: () => FieldType;
    }
    const options: FieldTypeOption[] = [
        { value: "free text", description: "Free Text", creator: () => new FreeTextFieldType() },
        { value: "number", description: "Number", creator: () => new NumberFieldType() },
    ];

    const selectValue = (value: string) => {
        if (value === "") {
            throw new Error(`No type selected. That was supposed not to be possible to do in the UI`);
        }

        const matchingOptions = options.filter(x => x.value === value);
        const creator = matchingOptions[0]?.creator;

        if (creator === undefined) {
            throw new Error(`Unexpected Field Type option selected: '${value}'`);
        }

        onValueChange(creator());
    };

    return (<>
        <Label title={title} />
        <Select
            color="black"
            variant="outline"
            size="sm"
            borderRadius={ui.radius}
            width={ui.width}

            placeholder={placeholderOption}
            value={value?.kind || ""}
            onChange={(e) => {
                removePlaceholderOption();
                selectValue(e.target.value)
            }}
        >
            {options.map(x =>
                <option key={x.value} value={x.value}>
                    {x.description}
                </option>
            )}
        </Select>
    </>);
};
