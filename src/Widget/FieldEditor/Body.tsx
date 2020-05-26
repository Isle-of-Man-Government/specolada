import React, { useState } from 'react';
import { Input, Text, Select, Menu, MenuButton, MenuList, MenuItem, Button, Box, Flex, InputGroup, InputLeftAddon } from '@chakra-ui/core';

import { Field, FieldType } from 'Model';
import { FreeTextFieldType, NumberFieldType, FieldType_kind, ValidationRuleDefinition, ValidationRule } from 'Model/FieldType';
            // TODO: import from 'Model' instead of reaching into internals
            // TODO: import from 'Model' instead of reaching into internals


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
        <ValidationRulesEditor
            rules={field.validationRules}
            availableRules={field.type?.allowedRules ?? []}
            onValueChange={newValue => partialFieldUpdate({ validationRules: newValue })}
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


const Label: React.FC<{ title: string }> = ({ title }) =>
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
    </Text>;


interface TextDataEditorProps {
    title: string;
    value: string;
    onValueChange: (newValue: string) => void;
}
const TextDataEditor: React.FC<TextDataEditorProps> = ({ title, value, onValueChange })  => {
    return (
        <>
            <Label title={title} />
            <Input
                size={commonProps.size}
                width={commonProps.width}
                borderRadius={commonProps.radius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
            />
        </>
    );
};


interface TypeDataEditorProps {
    title: string;
    value: FieldType | null;
    onValueChange: (ft: FieldType) => void;
}
const TypeDataEditor: React.FC<TypeDataEditorProps> = ({ title, value, onValueChange }) => {
    const [placeholderOption, setPlaceholderOption] = useState("<select field type>");
    const removePlaceholderOption = () => setPlaceholderOption("");

    const options: { value: FieldType_kind, description: string }[] = [
        { value: "free text", description: "Free Text" },
        { value: "number", description: "Number" },
    ];

    const selectValue = (stringValue: string) => {
        // unsafe cast but all values come from the <select> which is build with 'FieldType_kind' values
        const val = stringValue

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
        <Label title={title} />
        <Select
            color="black"
            variant="outline"
            size="sm"
            borderRadius={commonProps.radius}
            width={commonProps.width}

            placeholder={placeholderOption}
            value={value?.kind || ""}
            onChange={(e) => {
                removePlaceholderOption();
                selectValue(e.target.value)
            }}
        >
            {options.map(x =>
                <option key={x.value} value={x.value}> {x.description} </option>
            )}
        </Select>
    </>);
};


interface ValidationRuleAdderProps {
    availableRules: ValidationRuleDefinition[];
    onRuleSelected: (rule: ValidationRule) => void;
}
const ValidationRuleAdder: React.FC<ValidationRuleAdderProps> = ({ availableRules, onRuleSelected }) => {
    return (
        <Menu>
            {/* due to a bug in Chakra (missing TS definition?)
                I can't use:   rightIcon="chevron-down"
                and I use:   {...{rightIcon: "chevron-down"}}
            */}
            <MenuButton
                as={Button}
                size={commonProps.size}
                borderRadius={commonProps.radius}
                {...{rightIcon: "chevron-down"}}
            >
                Add validation rule
            </MenuButton>
            <MenuList>
                {(availableRules.length === 0) &&
                    <MenuItem as="div" width="auto" color="black" fontSize="0.8em" isDisabled>
                        {"<none available>"}
                    </MenuItem>
                }
                {availableRules.map(creator =>
                    <MenuItem
                        key={creator.ruleName}
                        as="div"
                        width="auto"
                        color="black"
                        onClick={() => onRuleSelected(creator.createRule())}
                    >
                        <Text as="div">
                            {creator.ruleTitle}
                        </Text>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};


interface ValidationRulesEditorProps {
    rules: ValidationRule[];
    availableRules: ValidationRuleDefinition[];
    onValueChange: (rule: ValidationRule[]) => void;
}
const ValidationRulesEditor: React.FC<ValidationRulesEditorProps> = ({ rules, availableRules, onValueChange }) => {
    const rulesForAddMenu = availableRules.filter(x => !rules.map(y => y.name).includes(x.ruleName));
    return (
        <Flex flexDirection="column" alignItems="flex-start" marginLeft={6}>
            <Label title="validation rules" />
            <Box
                border="white solid 1px"
                borderRadius={commonProps.radius}
                paddingX={3}
                paddingTop={1}
                paddingBottom={3}
            >
                <ValidationRuleAdder
                    availableRules={rulesForAddMenu}
                    onRuleSelected={newRule => onValueChange([...rules, newRule])}
                />
                {rules.length === 0 &&
                    <Text key="<none>" as="div" fontSize="0.8em" color="grey">
                        no rules yet
                    </Text>
                }
                {rules.map(x => <ValidationRuleDisplay key={x.name} rule={x} />)}
            </Box>
        </Flex>
    );
};


interface ValidationRuleDisplayProps {
    rule: ValidationRule;
}
const ValidationRuleDisplay: React.FC<ValidationRuleDisplayProps> = ({ rule }) =>
    <Text as="div">
        <Text as="div" fontSize="0.8em">
            {rule.description}
        </Text>
        <Box ml={4}>
            {rule.params.map(param =>
                <Flex key={param.name}>
                    <InputGroup size="sm">
                        <InputLeftAddon children={param.title} backgroundColor="transparent" />
                        <Input
                            variant="outline"
                            roundedLeft={0}
                            placeholder={param.valType}
                            value={param.value ?? ""}
                            onChange={() => console.error(`rule value change not handled yet`)}
                        />
                    </InputGroup>
                </Flex>
            )}
        </Box>
    </Text>;
