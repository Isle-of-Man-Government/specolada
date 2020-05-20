import React from 'react';
import { Box, Input, Text } from '@chakra-ui/core';

import { Field } from 'Model';


// TODO: handle 'required'
// TODO: handle 'type' correctly
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
        <TextDataEditor
            title="field type"
            value={JSON.stringify(field.type)}
            onValueChange={newValue => partialFieldUpdate({ type: JSON.parse(newValue) })}
        <TextDataEditor
            title="hint text"
            value={field.hintText ?? ""}
            onValueChange={newValue => partialFieldUpdate({ hintText: newValue })}
        />
    </>);
}


const commonProps = {
    borderRadius: 4,
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
                borderRadius={commonProps.borderRadius}
            >
                {title}
            </Text>
            <Input
                size="sm"
                borderRadius={commonProps.borderRadius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
            />
        </Box>
    );
};
