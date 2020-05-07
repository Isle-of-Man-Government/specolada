import React from 'react';
import { Box, Divider, Input, Text } from '@chakra-ui/core';

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
export const Body: React.FC<BodyProps> = ({ field, onFieldChange }) =>
    <>
        <Divider
            marginTop={1}
            marginBottom={2}
            color="rgba(155, 155, 155, 0.4)"
        />
        <TextDataEditor title="field title" value={field.title}
            onValueChange={(newValue: string) => {
                onFieldChange({...field, title: newValue});
            }}
        />
        <TextDataEditor title="field type" value={JSON.stringify(field.type)}
            onValueChange={(newValue: string) => {
                onFieldChange({...field, type: JSON.parse(newValue)});
            }}
        />
        <TextDataEditor title="hint text" value={field.hintText ?? ""}
            onValueChange={(newValue: string) => {
                onFieldChange({...field, hintText: newValue});
            }}
        />
    </>;


interface TextDataEditorProps {
    title: string;
    value: string;
    onValueChange: (newValue: string) => void;
}
const TextDataEditor: React.FC<TextDataEditorProps> = ({ title, value, onValueChange })  => {
    const borderRadius = 4;
    return (
        <Box>
            <Text
                as="span"
                paddingX="0.6em"
                marginLeft="1.7em"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="black"
                backgroundColor="white"
                borderRadius={borderRadius}
            >
                {title}
            </Text>
            <Input
                size="sm"
                width="90%"  // because otherwise it spills on the right
                borderRadius={borderRadius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
            />
        </Box>
    );
};
