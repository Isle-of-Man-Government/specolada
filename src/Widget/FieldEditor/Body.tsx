import React, { useState } from 'react';
import { Input, Text, Select } from '@chakra-ui/core';

import { Field, FieldType } from 'Model';
import { FreeTextFieldType, NumberFieldType, FieldType_kind } from 'Model/FieldType';


// TODO: handle 'required'
// TODO: handle 'validationRules'
// TODO: handle null values for 'hintText': on/off switch maybe?
// TODO: move styles to CSS file, maybe


interface BodyProps {
    field: Field;
    onFieldChange: (newField: Field) => void;
}
export const Body: React.FC<BodyProps> = ({ field, onFieldChange }) => {
    // helper, to make the rest of the code shorter and more readable
    const partialFieldUpdate = (fieldPart: Partial<Field>) => onFieldChange({...field, ...fieldPart});

    return (<>
        <TextDataEditor
            title="field title"
            value={field.title}
            onValueChange={newValue => partialFieldUpdate({ title: newValue })}
        />
        <TypeDataEditor
            title="field type"
            value={field.type}
            onValueChange={newValue => partialFieldUpdate({ type: newValue })}
        />
        <TextDataEditor
            title="hint text"
            value={field.hintText ?? ""}
            onValueChange={newValue => partialFieldUpdate({ hintText: newValue })}
        />
    </>);
}


const commonProps = {
    radius: 4,
    width: "90%",  // because otherwise it spills on the right
    size: "sm" as ("sm" | "lg" | "md"),
};


interface TextDataEditorProps {
    title: string;
    value: string;
    onValueChange: (newValue: string) => void;
}
const TextDataEditor: React.FC<TextDataEditorProps> = ({ title, value, onValueChange })  => {
    return (
        <Box margin={1}>
            <Text
                as="span"
                paddingX="0.6em"
                marginLeft="1.7em"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="black"
                backgroundColor="white"
                borderRadius={commonProps.radius}
            >
                {title}
            </Text>
            <Input
                size={commonProps.size}
                width={commonProps.width}
                borderRadius={commonProps.radius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
            />
        </Box>
    );
};


interface TypeDataEditorProps {
    title: string;
    value: FieldType | null;
    onValueChange: (ft: FieldType) => void;
}
const TypeDataEditor: React.FC<TypeDataEditorProps> = ({ title, value, onValueChange }) => {
    const [placeholder, setPlaceholder] = useState("<select field type>");
    const removePlaceholder = () => setPlaceholder("");

    const options: { value: FieldType_kind, description: string }[] = [
        { value: "free text", description: "Free Text" },
        { value: "number", description: "Number" },
    ];

    const selectValue = (stringValue: string) => {
        // unsafe cast but all values come from the <select> which is build with 'FieldType_kind' values
        const val = stringValue as (FieldType_kind | "");

        switch (val) {
            case "":
                // will not happen as long as placeholder is removed after first change
                break;
            case "free text":
                onValueChange(new FreeTextFieldType());
                break;
            case "number":
                onValueChange(new NumberFieldType());
                break;
            default:
                // should not happen if all above cases of 'FieldType_kind' are handled
                throw new Error(`Unexpected FieldType kind: '${val}'`);
        }
    };

    return (<>
        <Text
            as="span"
            paddingX="0.6em"
            marginLeft="1.7em"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            color="black"
            backgroundColor="white"
            borderRadius={commonProps.radius}
        >
            {title}
        </Text>
        <Select
            color="black"
            variant="outline"
            size="sm"
            borderRadius={commonProps.radius}
            width={commonProps.width}

            placeholder={placeholder}
            value={value?.kind || ""}
            onChange={(e) => {
                removePlaceholder();
                selectValue(e.target.value)
            }}
        >
            {options.map(x => <option key={x.value} value={x.value}>{x.description}</option>)}
        </Select>
    </>);
};
