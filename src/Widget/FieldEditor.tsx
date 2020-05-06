import React, { useState, useContext } from 'react';
import { Box, Collapse, Divider, Flex, Input, Text } from '@chakra-ui/core';

import { Field } from 'Model';
import { Id, StateContext } from 'Store';


// TODO: handle saving data: add on change callback
// TODO: handle 'required'
// TODO: handle 'type' correctly
// TODO: handle 'validationRules'
// TODO: handle null values for 'hintText': on/off switch maybe?
// TODO: move styles to CSS file
// TODO: make 'onSave' non-nullable once caller implements it


interface PureFieldEditorProps {
    field: Field;
    onSave?: (newField: Field) => void;
}
export const PureFieldEditor: React.FC<PureFieldEditorProps> = ({ field: fieldProp, onSave }) => {
    const [isCollpsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(!isCollpsed);
    const [field, setField] = useState(fieldProp);

    if (onSave === null) {
        console.warn(`in FieldEditor: the 'onSave' callback is not set`);
    }

    return (
        <Box
            borderRadius={4}
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={2}
            margin={1}
            backgroundColor="rgba(155, 155, 155, 0.05)"
            border="solid 1px rgba(155, 155, 155, 0.15)"
        >
            <Header
                field={field}
                showOnlyTitle={isCollpsed}
                onHeaderClick={toggle}
            />
            <Body
                field={field}
                show={!isCollpsed}
                onNewFieldValue={setField}
            />
        </Box>
    );
};


interface ConnectedFieldEditorProps {
    fieldId: Id;
}
export const ConnectedFieldEditor: React.FC<ConnectedFieldEditorProps> = ({ fieldId }) => {
    const stateContext = useContext(StateContext);
    return (
        <PureFieldEditor
            field={stateContext.getField(fieldId)}
            onSave={() => {throw new Error(`saving not implemented yet`);}}
        />
    );
};


interface HeaderProps {
    field: Field;
    showOnlyTitle: boolean;
    onHeaderClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ field, showOnlyTitle, onHeaderClick }) => 
    <Flex onClick={onHeaderClick}>
        <Text as="span">
            {field?.title}
            &nbsp; {/* prevents collapsing */}
        </Text>
        <Collapse isOpen={showOnlyTitle}
            marginLeft={4}
        >
            <Text
                as="span"
                fontSize={2}
                color="rgba(150, 150, 150, 0.3)"
            >
                other props will show here
            </Text>
        </Collapse>
    </Flex>;


interface BodyProps {
    field: Field;
    show: boolean;
    onNewFieldValue: (newField: Field) => void;
}
const Body: React.FC<BodyProps> = ({ field, show, onNewFieldValue }) =>
    <Collapse isOpen={show}>
        <Divider
            marginTop={1}
            marginBottom={2}
            color="rgba(155, 155, 155, 0.4)"
        />
        <TextDataEditor title="field title" value={field.title}
            onChange={(newValue: string) => {
                onNewFieldValue({...field, title: newValue});
            }}
        />
        <TextDataEditor title="field type" value={JSON.stringify(field.type)}
            onChange={(newValue: string) => {
                onNewFieldValue({...field, type: JSON.parse(newValue)});
            }}
        />
        <TextDataEditor title="hint text" value={field.hintText ?? ""}
            onChange={(newValue: string) => {
                onNewFieldValue({...field, hintText: newValue});
            }}
        />
    </Collapse>;


interface TextDataEditorProps {
    title: string;
    value: string;
    onChange: (newValue: string) => void;
}
const TextDataEditor: React.FC<TextDataEditorProps> = ({ title, value, onChange })  => {
    const titleVerticalShift = 15;
    const borderRadius = 4;
    return (
        <Box
            position="relative"
            paddingTop={titleVerticalShift}
            marginY={3}
        >
            <Input
                size="sm"
                padding="1.0em"
                width="90%"
                borderRadius={borderRadius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
            />
            <Text
                as="div"
                position="absolute"
                top={0}
                left={0}
                zIndex={14}
                padding="0 0.5em"
                marginLeft="1.7em"
                fontSize={1}
                fontWeight="bold"
                textTransform="uppercase"
                color="black"
                backgroundColor="white"
                borderRadius={borderRadius}
            >
                {title}
            </Text>
        </Box>
    );
};
